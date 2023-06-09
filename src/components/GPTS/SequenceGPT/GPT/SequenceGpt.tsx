import { useWebflowGptContext } from "@Context/Ai/WebflowGPTProvider";
import { useGlobalContext } from "@Context/Global/GlobalProvider";
import "@Global/styles/kitStyles.scss";
import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import Icon from "@src/components/IconWrapper/Icon";
import Dropdown from "@src/components/Util/DropDown/DropDown";
import { TriggerMode } from "@src/config/config";
import React, { useEffect, useState } from "react";
import { useSequenceGpt } from "./Context/SequenceGptContext";
import BubbleSet from "./components/BubbleSets/BubbleSet-index";
import { BubbleTabParent } from "./components/BubbleTabs/BubbleTabs-index";
import Controls from "./components/Controls/controls-index";
import SequenceGPTCard from "./components/Prompt/SequenceGPTCard";
import { QueryStatus } from "./components/Prompt/SequenceGPTQuery";
import Storage from "./components/Storage/storage-index";
import FilterPrompts from "./components/Tooltip/FilterPrompts/filterPrompts-index";
import Frag from "./components/frag";

export default function SequenceGpt({ sequenceRef }) {

  const [showGpt, setShowGpt] = useState(true);
  const [queryStatus, setQueryStatus] = useState<QueryStatus>(undefined);

  const {
    switchTab,
    handleChangeRenderer,
  } = useGlobalContext();

  const {
    triggered,
    handleQuery,
    currentQuery,
    handleTriggered,
  } = useSequenceGpt();


  const {
    currentNodeAnalysisRef,
  } = useWebflowGptContext()

  const [showStorage, setShowStorage] = useState(false);
  const [showTemplateGenerator, setShowTemplateGenerator] = useState(false);
  const [showActiveTemplates, setShowActiveTemplates] = useState(false);

  const [selectedRenderer, setSelectedRenderer] = useState("Default");
  const [selectedModel, setSelectedModel] = useState("Default");

  const [currentModel, setCurrentModel] = useState('Default');


  useEffect(() => {
    (async () => {
      const currentModel = await StorageOps.getSelectedModel();
      setCurrentModel(currentModel);
    }
    )();
  });


  const handleRenderChange = (event) => {
    setSelectedRenderer(event.target.value);
    handleChangeRenderer(event.target.value);
  };

  const handleDropdownChange = (selectedOption) => {
    console.log('setting selected renderer', selectedOption.value);
    setSelectedRenderer(selectedOption.value);
    handleChangeRenderer(selectedOption.value);
  };
  const options = [
    { value: 'Default', label: 'Default', icon: 'none' },
    { value: 'Custom', label: 'Custom', icon: 'info' },
  ];



  useEffect(() => {
    console.log(selectedModel, selectedRenderer);
  }, [selectedModel, selectedRenderer]);

  const [greetingCount, setGreetingCount] = useState(0);

  useEffect(() => {
    setQueryStatus("success");
  }, [triggered, currentQuery]);

  const toggleGPTVisibility = () => {
    setShowGpt(!showGpt);
    handleTriggered();
    setQueryStatus(undefined);
  };

  useEffect(() => {
    if (showGpt && greetingCount === 0) {
      handleQuery('Give a nice greeting');
      setGreetingCount(greetingCount + 1);
    }
  }, []);

  let sequenceId = sequenceRef ? sequenceRef.getId() : null;

  return (
    <>
      <div className="chat-container">
        <div className="chat" >
          {showStorage && <Storage setShowStorage={setShowStorage} />}

          {/* TOP BAR */}
          <div className="toolbar-top">
            <div className="toolbar--left">
              <RippleButton
                padding='12px'
                shape="square"
                callBack={() => {
                  setShowStorage(!showStorage);
                }}
              >
                <Icon id="settings" color="white" size={16} />
              </RippleButton>
            </div>

            <span className="toolbar--center">Current Model: {currentModel}  </span>

            {/* Markdown Dropdown select */}
            <Dropdown
              options={options}
              label="Default"
              onChange={handleDropdownChange}
            />



            {/* <div onClick={() => {
              handleQuery(new NodeAnalysis(currentNodeAnalysisRef.curr  ent).createContext());
              copyCssToClipboard(currentNodeAnalysisRef.current.cssData)
            }
            } >
              yo
            </div> */}

            {/* <select
              className="custom-select toolbar--right"
              value={selectedRenderer}
              onChange={handleRenderChange}
            >
              <option value="Markdown">Markdown</option>
              <option value="Custom">Custom</option>
            </select> */}
          </div>

          {/* ----top-bar------ */}


          {/* Suggestion Container */}

          <div className="suggestion-container">
            <div className="chat-gpt-container gpt-dark">
              <div className="chat-gpt-card gpt-dark">
                <SequenceGPTCard
                  question={currentQuery ? currentQuery : Frag}
                  triggerMode={TriggerMode.Always}
                  onStatusChange={setQueryStatus}
                  triggered={triggered}
                  sequenceRef={sequenceRef}
                />
              </div>
            </div>
          </div>

          {/*  Bottom bar */}

          {showActiveTemplates && (
            <FilterPrompts
              sequenceRef={sequenceRef}
              accessType={sequenceId}
              close={() => {
                setShowActiveTemplates((prev) => !prev);
              }}
            ></FilterPrompts>
          )}
          <div className="bottom--toolbar">
            <div className="divider"></div>

            <BubbleTabParent>
              <BubbleSet
                sequenceRef={sequenceRef}
                accessType={'currentNode'}
                setShowActiveTemplates={setShowActiveTemplates}
                setShowTemplateGenerator={setShowTemplateGenerator}
                handleQuery={handleQuery}
                sequenceId={sequenceId}
                switchTab={switchTab} />
              <BubbleSet
                sequenceRef={sequenceRef}
                accessType={'default'}
                setShowActiveTemplates={setShowActiveTemplates}
                setShowTemplateGenerator={setShowTemplateGenerator}
                handleQuery={handleQuery}
                sequenceId={sequenceId}
                switchTab={switchTab} />
              <BubbleSet
                accessType={'cssTemplate'}
                setShowActiveTemplates={setShowActiveTemplates}
                setShowTemplateGenerator={setShowTemplateGenerator}
                sequenceRef={sequenceRef}
                handleQuery={handleQuery}
                sequenceId={sequenceId}
                switchTab={switchTab} />
            </BubbleTabParent>

            {/* <div className="bubble__container">
              <NodeBubbleGroup   accessType={sequenceId} handleQuery={handleQuery} sequenceRef={sequenceRef} />
              <div className={'editAdd'}>
                <div
                  onClick={() => {
                    setShowTemplateGenerator((prev) => !prev);
                  }}
                >
                  <RippleButton
                    shape="square"
                    outlineColor="grey"
                    callBack={() => {
                      StorageOps.setCurrentSelectedNodeId(sequenceRef.getId());
                      switchTab('dTab')
                    }}
                    padding='12px'>

                    <Icon id="add" size={16} color="white"></Icon>
                  </RippleButton>
                </div>

                <div
                  onClick={() => {
                    setShowActiveTemplates((prev) => !prev);
                  }}
                >
                  <RippleButton shape="square" outlineColor="grey" padding='12px'>
                    <Icon id="edit" size={16} color="white"></Icon>
                  </RippleButton>
                </div>
              </div>
            </div>
 */}

            <div className="divider"></div>
            <div className="toolbar--bottom">
              <Controls />
            </div>
          </div>
        </div>
      </div >

    </>
  );
}
function copyCssToClipboard(cssObj) {
  const cssString = Object.values(cssObj).join("\n");
  const tempElem = document.createElement("textarea");

  tempElem.value = cssString;
  document.body.appendChild(tempElem);
  tempElem.select();
  document.execCommand("copy");
  document.body.removeChild(tempElem);

  console.log("CSS data has been copied to your clipboard!");
}

function findCssForClass(passDownCss, classname) {
  console.log('%cfindCssForClass', 'color: lightblue; font-size: 14px', passDownCss, classname);
  const cssData = {};
  if (!passDownCss || !classname) {
    return cssData;
  }
  // Check if passDownCss[0] exists and has a property 'all'
  if (passDownCss[0] && passDownCss[0].hasOwnProperty('all')) {
    const allData = passDownCss[0].all;
    return allData[classname] ? allData[classname] : {};
  }
  return cssData;
}