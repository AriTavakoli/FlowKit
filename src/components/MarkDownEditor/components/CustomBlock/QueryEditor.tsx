import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import FieldsManager from "./components/CustomVariable/fieldsManager";
import { useBlob } from "./context/BlobContext";
import { useTemplate } from "./context/TemplateContext";
import validateForm from "./context/classes/FormValidation";
import TemplateSerializer from "./context/classes/TemplateSerializer";
import styles from "./customBlock.module.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Icon from "@src/components/IconWrapper/Icon";
import DraggableBlock from "./components/Dnd/dnd-index";
import useBlockControls from "./hooks/useBlockControls";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import useTemplateControls from "./hooks/useTemplateControls";
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import React from "react";
import { useGlobalContext } from "@Context/Global/GlobalProvider";
import { Block } from "./context/reducers/customBlockReducer";
import { Field } from "@src/types/Template/template.types";
import { useQueryBuilderContext } from "../../context/QueryBuilderContext";
import SaveLocation from "./components/SaveLocation/SaveLocation";

export default function QueryEditor({ onFileChange, fileInput }) {

  const {
    blocks,
    resetTemplate,
    initTemplateInfo,
    currentTemplateData,
    setCurrentTemplateData,
  } = useTemplate();

  const {
    parentBlobInstance
  } = useBlob();

  const {
    setNewBlockJsonData,
  } = useQueryBuilderContext();

  const [currentTemplateName, setCurrentTemplateName] = useState(initTemplateInfo.name);

  const [currentTemplateColor, setCurrentTemplateColor] = useState(initTemplateInfo.color)
  const [saveLocation, setSaveLocation] = useState('template');

  const handleSaveLocationChange = (location) => {
    setSaveLocation(location);
  }


  useEffect(() => {
    setCurrentTemplateName(initTemplateInfo.name);
    setCurrentTemplateColor(initTemplateInfo.color)
  }, [initTemplateInfo]);

  const {
    retrieveSetting
  } = useGlobalContext();


  const parentBlobReference = useRef<any>();

  const {
    addBlock,
    moveBlock,
    moveBlockUp,
    deleteBlock,
    moveBlockDown,
    handleAddField,
    handleDeleteField,
    handleFieldChange,
    handleBlockNameChange,
  } = useBlockControls(parentBlobInstance);

  const {
    handleInputEvent,
    handleBlockMoveEvent
  } = useTemplateControls();

  const [activeBlocks, setActiveBlocks] = useState([]);
  const [allExpanded, setAllExpanded] = useState(false);


  const [fieldData, setFieldData] = useState();
  const [markDown, setMarkDown] = useState("");

  const [currentCodeAccent, setCurrentCodeAccent] = useState<string>('');


  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');
      if (userSettings) {
        setCurrentCodeAccent(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);


  useEffect(() => {
    setCurrentTemplateData({
      currentTemplateName, fieldData, parentBlobReference, markDown, parentBlobInstance,
    });
  }, [currentTemplateName, fieldData, parentBlobReference, markDown, parentBlobInstance,]);



  useEffect(() => {
    (async () => {
      if (parentBlobInstance.current) {
        const combined =
          await parentBlobInstance.current.readCombinedChildBlobs();
        setMarkDown(combined);
      }
    })();
  });

  const handleFieldData = (data: any) => {
    setFieldData((prev: any) => {
      return {
        ...prev,
        ...data,
      };
    });
  };


  useEffect(() => { //
    blocks.forEach((block: Block) => { // Iterate through the blocks
      block.fields.forEach((field: Field) => {
        handleFieldChange(block.id, field.id, field); // Call the handleFieldChange function
      });
    });
  }, []);


  const toggleBlock = (blockId: Block['id']) => {
    if (activeBlocks.includes(blockId)) {
      setActiveBlocks(activeBlocks.filter((id) => id !== blockId));
    } else {
      setActiveBlocks([...activeBlocks, blockId]);
    }
  };

  const toggleAllBlocks = () => {
    if (!allExpanded) {
      const allBlockIds = blocks.map((block: Block) => block.id);
      setActiveBlocks(allBlockIds);
    } else {
      setActiveBlocks([]);
    }
    setAllExpanded(!allExpanded);
  };


  async function saveEverything() {
    return new Promise((resolve, reject) => {
      blocks.forEach((block: Block) => {
        block.fields.forEach((field) => {
          handleFieldChange(block.id, field.id, field);
        });
      });
      resolve(true);
    }) as Promise<boolean>;
  }

  const seedInitialFieldData = () => {
    blocks.forEach((block) => {
      handleFieldData({
        [block.id]: {
          blockName: block.name,
          fields: block.fields,
          blockBlob: parentBlobInstance.current,
        },
      });
    });
  };

  useEffect(() => {
    console.log("");
    seedInitialFieldData();
  }, []);

  const handleSave = async () => {
    await saveEverything();
    if (validateForm() === false) {
      return;
    }
    const templateEditor = parentBlobInstance.current.templateEditor;
    const templateEditorSerialized = { ...templateEditor };

    const data: any = {
      [currentTemplateName]: [],

    };

    for (const block of blocks) {
      const blockData: { [key: string]: any } = {};
      blockData.blockName = block.name;
      blockData.id = block.id;
      blockData.fields = {};
      block.fields.forEach((field: Field) => {
        blockData.fields[field.id] = {
          name: field.name,
          value: field.value,
          fieldId: field.id,
        };
      });
      blockData.blob = fieldData[block.id].blockBlob;
      blockData.templateLayout = templateEditorSerialized;
      data[currentTemplateName].push(blockData);
      data["templateColor"] = currentTemplateColor;
    }


    const serializedData = await new TemplateSerializer(data).serialize();

    const storagePayload = { template: serializedData, active: true, bubbleColor: currentTemplateColor, templateName: currentTemplateName }

    if (saveLocation === 'default') {
      await new StorageOps(currentTemplateName, saveLocation, storagePayload).addStorageItem();
    }

    if (saveLocation === 'webflow') {
      await new StorageOps(currentTemplateName, saveLocation, storagePayload).addStorageItem();
    }


    if (saveLocation === 'nodeTemplates') {
      const currentNodeSelectedId = await StorageOps.getSelectedNodeId();
      await new StorageOps(currentNodeSelectedId.toString(), saveLocation, storagePayload).addTemplateToNode(currentNodeSelectedId.toString(), currentTemplateName, storagePayload);
    }

    if (saveLocation === 'cssTemplate') {
      await new StorageOps(currentTemplateName, saveLocation, storagePayload).addStorageItem();
    }


    const transferJsonData = JSON.parse(serializedData);

    if (saveLocation === "workspaceTemplates") {
      // StorageOps.addTemplateToWorkSpace('Tab1', currentTemplateName, transferJsonData);
      setNewBlockJsonData(transferJsonData);
    }

    const blob = new Blob([serializedData], { type: "application/json" });
    const blobUrl = URL.createObjectURL(blob);
    const response = await fetch(blobUrl);
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = `${currentTemplateName}.json`;
    document.body.appendChild(downloadLink);
    if (saveLocation === 'localFiles') {
      downloadLink.click();
    }
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    console.log('%csaveLocation', 'color: lightblue; font-size: 14px', saveLocation);
  }, [saveLocation]);


  return (
    <>
      {/* <MarkdownRenderer htmlString={markDown}></MarkdownRenderer> */}
      <DndProvider backend={HTML5Backend}>
        <div className={styles["template"]}>
          <div className={styles["template__topBar"]}>
            <input
              className={styles["block__input"]}
              data-templateName={uuid()}
              type="text"
              placeholder="Enter block name"
              value={currentTemplateName}
              required
              onChange={(e) => setCurrentTemplateName(e.target.value)}
            />
            <SaveLocation handleSaveLocationChange={handleSaveLocationChange}></SaveLocation>

            {/* <div onClick={() => { console.log(currentTemplateData) }}>Log</div> */}
            <div className={styles["control__bar"]}>

              <UploadButton onFileChange={onFileChange} fileInput={fileInput} ></UploadButton>
              {/* <button onClick={() => { StorageOps.printAllStorageItems() }}>print</button> */}

              <div onClick={resetTemplate}>
                <RippleButton shape="square" size={10} padding='8px'>
                  <Icon id="trash" color="grey" size={16} />
                </RippleButton>
              </div>
              <div onClick={toggleAllBlocks}>
                <RippleButton shape="square" size={10} padding='8px'>
                  <Icon id={allExpanded ? "collapse" : "expand"} size={16} color="grey" />
                </RippleButton>
              </div>
              <div onClick={handleSave}>
                <RippleButton shape="square" size={10} padding='8px'>
                  <Icon id="save" size={16} color="grey" />
                </RippleButton>
              </div>
              <div>
                <input type="color" value={currentTemplateColor} onChange={(e) => { setCurrentTemplateColor(e.target.value) }}></input>
              </div>
              <div
                onClick={() => {
                  addBlock();
                }}
              >
                <RippleButton shape="square" size={10} padding='8px'>
                  <Icon id="plus" size={16} color="grey" />
                </RippleButton>
              </div>
            </div>
          </div>

          <br />
          <div className={styles.app}>
            {/* <div className={styles["block__container"]} style={{ borderImage: `linear-gradient(to bottom, ${currentCodeAccent}, rgba(136, 167, 184, 0.219)) 1` }}> */}
            <div className={styles["block__container"]} >
              {blocks.map((block: Block, index: number) => {
                const isActive = activeBlocks.includes(block.id);
                return (
                  <DraggableBlock
                    key={block.id}
                    block={block}
                    index={index}
                    moveBlock={moveBlock}
                    dragHandleSelector=".dragHandle"

                  >
                    {/* <div className={styles['line']} style={{ background: `linear-gradient(to right , ${currentCodeAccent},  #8d8c8e65)` }} /> */}
                    <div key={block.id}>
                      <>
                        <div
                          className={styles['block__topBar']}
                          onClick={() => {
                            toggleBlock(block.id)
                          }}
                        >
                          <input type="text" className={styles['block__input']} data-blockName={uuid()} placeholder="Enter block name" value={block.name}
                            onChange={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleBlockNameChange(block.id, e.target.value);
                            }} />
                          <div onClick={(e) => {
                            handleBlockMoveEvent(e);
                            moveBlockUp(block.id)
                          }}>
                            <Icon size={22} color="grey" id="upChevron"></Icon>
                          </div>

                          <div onClick={(e) => {
                            handleBlockMoveEvent(e);
                            moveBlockDown(block.id)
                          }}> <Icon size={22} color="grey" id="downChevron"></Icon></div>

                          <div onClick={(e) => { deleteBlock(block.id); }}>
                            <Icon id="trash" size={16} color="grey"></Icon>
                          </div>

                          <div className="dragHandle" onClick={(e) => { }}>
                            <Icon id="handle" size={20} color="grey" />
                          </div>
                        </div>

                      </>
                      <div className={`${styles['block__body']} ${isActive ? styles['block__body--active'] : ''}`}>

                        <FieldsManager
                          fields={block.fields}
                          onFieldChange={(fieldId, fieldUpdate) =>
                            handleFieldChange(block.id, fieldId, fieldUpdate)
                          }
                          onAddField={() => handleAddField(block.id)}
                          onDeleteField={(fieldId) => handleDeleteField(block.id, fieldId)}
                          blockId={block.id}
                          block={block}
                          handleFieldData={handleFieldData}
                        />
                      </div>
                    </div>
                  </DraggableBlock>
                );
              })}
            </div>
          </div>
          <br />
        </div>
      </DndProvider >
      <div style={{ position: 'relative', width: '320px', }} className={styles['add']} onClick={() => { addBlock() }}>
        <svg
          data-icon="FlowConnectorEnd"
          aria-hidden="true"
          focusable="false"
          width="2"
          height="56"
          viewBox="0 0 2 56"
          className="bem-Svg"

          color="grey"
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <path d="M1 0v56" stroke="currentColor" strokeWidth="2" />
        </svg>
        <div className="--styled-gxQqJL wf-bjnwqu">
          <div
            data-automation-id="drop_end-of-flow"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '320px',
              height: '36px',
              left: '0px',
              position: 'absolute',
              color: 'grey',
              paddingBottom: '300px',

            }}
          ></div>
          <div
            onClick={() => { }}
            role="button"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            data-automation-id="flow-editor-add-block-button"
            className="--styled-dypvDZ wf-8aaqee"
          >
            <div
              data-automation-id="flow-editor-primary-add-block-button"
              aria-label="Add a block"
              style={{
                height: '24px',
                width: '24px',
                color: 'grey',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgb(26,26,26,0.365 )',
                border: '2px solid rgb(235, 235, 235)',
                borderRadius: '100%',
                transition: 'all 100ms ease 0s',
                // color: 'rgb(255, 255, 255)',
              }}
            >
              <svg
                data-icon="Add16"
                aria-hidden="true"
                color="grey"
                focusable="false"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="bem-Svg"
                style={{ display: 'block' }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 2H7v5H2v2h5v5h2V9h5V7H9V2z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const UploadButton = ({ onFileChange, fileInput }) => (
  <>
    <RippleButton
      padding='4px'
      callBack={() => fileInput.current.click()}
    >
      <input
        ref={fileInput}
        type="file"
        accept=".json"
        onChange={onFileChange}
        style={{ display: 'none' }}
      />

      <Icon id="upload" size={18} color="darkgrey"></Icon>
    </RippleButton>
  </>
);
