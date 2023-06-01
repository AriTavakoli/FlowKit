import { useEffect, useRef, useState } from "react";
import TitleRipple from "@src/components/Buttons/RippleButton/TitleRipple";
import RichTextEditor from "../../../TextEditor/components/EditableTextArea/RichTextArea";
import useOnClickOutside from "../../../TextEditor/hooks/useClickOutside";
import { useBlob } from "../../context/BlobContext";
import { useTemplate } from "../../context/TemplateContext";
import BlobGenerator from "../../context/utils/BlobGenerator";
import InputPicker from "./components/inputPicker";
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import Icon from "@src/components/IconWrapper/Icon";
import styles from "./fieldsManager.module.scss";
import React from "react";
import VoiceInput from "../../../TextEditor/components/EditableTextArea/components/VoiceInput/VoiceInput-index";

type Field = {
  id: number;
  inputType: InputType;
  name: string;
  value: string;
};

type FieldProps = {
  fields: Field[];
  onAddField: () => void;
  onDeleteField: (id: number) => void;
  onFieldChange: (id: number, fieldUpdate: Partial<Field>) => void;
  block: {
    id: string;
    name: string;
  };
  handleFieldData: (data: any) => void;
};

const FieldsManager = ({
  fields,
  onFieldChange,
  block,
  handleFieldData,
}: FieldProps) => {


  const uniqueFields = filterUniqueFields(fields);

  const editableRowRef = useRef();
  const [clickedFieldId, setClickedFieldId] = useState<number | null>(null);


  const {
    createBlobChunk,
    parentBlobInstance
  } = useBlob();

  const blobInstance = useRef<BlobGenerator>();

  const {
    handleFieldChange
  } = useTemplate();

  const [showFieldsManager, setShowFieldsManager] = useState(false);

  const fieldsManagerRef = useRef<HTMLDivElement>(null);


  const [expandedFields, setExpandedFields] = useState(() => {
    return fields.reduce((acc, field) => {
      acc[field.id] = field.id === clickedFieldId;
      return acc;
    }, {});
  });


  useEffect(() => {
    if (clickedFieldId !== null) {
      setExpandedFields((prevState) => {
        const newState = { ...prevState };
        Object.keys(newState).forEach((key) => {
          newState[key] = false;
        });
        newState[clickedFieldId] = true;
        return newState;
      });
    }
  }, [clickedFieldId]);


  useOnClickOutside(fieldsManagerRef, () => {
    handleShowFieldsManager(false);
  });


  if (!blobInstance.current) {
    blobInstance.current = parentBlobInstance.current;
  }

  const toggleExpandField = (fieldId: number) => {
    setExpandedFields((prevState) => {
      const newState = { ...prevState };
      const isExpanded = prevState[fieldId];

      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });

      newState[fieldId] = !isExpanded;
      return newState;
    });
  };


  const handleChildButtonClick = () => {
    if (editableRowRef.current) {
      editableRowRef.current.runItSon();
    }
  };

  const handleAddField = () => {
    handleChildButtonClick();
  };

  const handleShowFieldsManager = (show: true | false, clickedFieldId: number | null) => {
    setShowFieldsManager(show);
    setClickedFieldId(clickedFieldId);
  };

  function filterUniqueFields(fields) {
    const seenIds = new Set();
    const uniqueFields = fields.filter((field) => {
      if (seenIds.has(field.id)) {
        return false;
      } else {
        seenIds.add(field.id);
        return true;
      }
    });

    return uniqueFields;
  }

  const handleTranscribe = (transcript: string) => {
    if (!editableRowRef.current) return;

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    if (range) {
      range.deleteContents();
      range.insertNode(document.createTextNode(transcript));
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };


  // useEffect(() => {
  //   blobInstance.current?.replaceChildContent(block.id, markDown);
  // }, [markDown]);

  // useEffect(() => {
  //   const inspectContent = async () => {
  //     const content = await blobInstance.current?.inspectChildBlob(block.id);
  //   };
  //   inspectContent();
  // }, [markDown]);

  useEffect(() => {
    if (blobInstance.current) {
      const parentReference = blobInstance.current;
      createBlobChunk(block.id);
    }
  }, []);

  useEffect(() => {
    handleSaveToParent();
  }, [fields]);

  const handleSaveToParent = () => {
    const data = {
      [block.id]: {
        blockName: block.name,
        fields: fields,
        blockBlob: blobInstance.current,
      },
    };
    handleFieldData(data);
  };

  const fieldsMapped = uniqueFields.map((field) => {
    const isFieldExpanded = expandedFields[field.id];

    console.log('%cfield', 'color: orange; font-size: 24px', field);

    return (
      <div key={field.id}>
        <div>
          <div className={styles["Variable__variableBox"]}>
            <div className={styles["Variable__row"]}>
              <div className={styles["Variable__topBar"]} onClick={() => toggleExpandField(field.id)}>
                <div
                  className={styles["Variable__topBar__left"]}
                  onClick={() => toggleExpandField(field.id)}
                >
                  <TitleRipple field={field}></TitleRipple>
                </div>
                <Icon id="downChevron" size={16} color="grey" onClick={() => toggleExpandField(field.id)}></Icon>
              </div>
              {isFieldExpanded && (
                <div className={styles["Variable__body"]}>
                  <input
                    type="text"
                    className={styles["Variable__input"]}
                    value={field.name}
                    placeholder="Name"
                    onChange={(e) => {
                      handleFieldChange(block.id, field.id, {
                        name: e.target.value,
                      });
                    }}
                  />
                  <InputPicker
                    name={`Input Option ${field.id}`}
                    value={field.value}
                    field={field}
                    inputType={field.inputType}
                    onFieldChange={(value) => onFieldChange(field.id, { value })}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    );
  });

  return (
    <div className={styles["block__container"]}>
      <div className={styles['block__buttonContainer']}>
        <VoiceInput onTranscribe={handleTranscribe} padding='4px'>
          <Icon id="microPhoneOn" size={16} color="grey" />
        </VoiceInput>
        <RippleButton padding='4px'>
          <Icon id="source" size={16} color="grey" />
        </RippleButton>
        <RippleButton callBack={() => { handleAddField(block.id) }} padding='4px'>
          <Icon id="plus" size={16} color="grey" />
        </RippleButton>

      </div>

      <div className={styles["block"]}>

        {/* <MarkDownRenderer htmlString={markDown}></MarkDownRenderer> */}

        {/* <button
          style={{ position: "absolute", right: "0px", pointerEvents: "auto" }}
          onClick={handleAddField}
        >
          Add Field
        </button> */}

        {/* <TextEditor textAreaRef={textAreaRef} handleMarkDownChange={handleMarkDownChange} /> */}
        {/* <textarea
          ref={textAreaRef}
          value={markDown}
        onChange={(e) => setMarkDown(e.target.value)}
        /> */}

        {showFieldsManager ? (
          <div ref={fieldsManagerRef} className={styles["Variable__container"]}>
            {fieldsMapped}
          </div>
        ) : null}

        <RichTextEditor
          fields={fields}
          handleShowFieldsManager={handleShowFieldsManager}
          editableRowRef={editableRowRef}
          block={block}
        ></RichTextEditor>
      </div>
    </div>
  );
};

export default FieldsManager;
