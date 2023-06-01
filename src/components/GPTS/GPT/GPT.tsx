import { TriggerMode } from "@src/config/config";
import React, { useEffect, useState } from "react";
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import Icon from "@src/components/IconWrapper/Icon";
import { useGPT } from "./Context/ChatGptContext";
import Controls from "./components/Controls/controls-index";
import BubbleGroup from "./components/GptButtons/FilterPromptsBubbles/BubbleGroup";
import ChatGPTCard from "./components/Prompt/ChatGPTCard";
import { QueryStatus } from "./components/Prompt/ChatGPTQuery";
import Storage from "./components/Storage/storage-index";
import FilterPrompts from "./components/Tooltip/FilterPrompts/filterPrompts-index";
import Frag from "./components/frag";
import "@Global/styles/kitStyles.scss";

import StorageOps from "@src/Utils/LocalStorage/StorageOps";
import { useGlobalContext } from "@Context/Global/GlobalProvider";

export default function StyleGpt({ refs }) {

  const [showGpt, setShowGpt] = useState(true);
  const [queryStatus, setQueryStatus] = useState<QueryStatus>(undefined);

  const { handleChangeRenderer } = useGlobalContext();

  const {
    triggered,
    handleTriggered,
    currentQuery,
    handleQuery,
    handleStorageItem,
  } = useGPT();

  const [showStorage, setShowStorage] = useState(false);
  const [showTemplateGenerator, setShowTemplateGenerator] = useState(false);
  const [showActiveTemplates, setShowActiveTemplates] = useState(false);

  const [selectedRenderer, setSelectedRenderer] = useState("Default ( GPT-3.5 )");
  const [selectedModel, setSelectedModel] = useState("davinci");

  const [currentModel, setCurrentModel] = useState();


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

  const handleModelChange = (event) => {
    setSelectedRenderer(event.target.value);
  };

  useEffect(() => {
    console.log(selectedModel, selectedRenderer);
  }, [selectedModel, selectedRenderer]);


  const [greeting, setGreeting] = useState("Hello");
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

  const handleAddTemplate = () => {
    for (let i = 0; i < refs.length; i++) {
      if (refs[i]['dTabRef']) {
        refs[i]['dTabRef'].current.click();
      }
    };

  }


  return (
    <>
      <div className="chat-container">
        <div className="chat">
          {showStorage && <Storage setShowStorage={setShowStorage} />}

          {/* TOP BAR */}
          <div className="toolbar-top">
            <div className="toolbar--left">
              <RippleButton
               padding = '12px'
                shape="square"
                callBack={() => {
                  setShowStorage(!showStorage);
                }}
              >
                <Icon id="settings" color="white" size={16} />
              </RippleButton>
            </div>

            <span className="toolbar--center">Current Model: {currentModel}  </span>

            <select
              className="custom-select toolbar--right"
              value={selectedRenderer}
              onChange={handleRenderChange}
            >
               <option value="Markdown">Markdown</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div className="suggestion-container">
            <div className="chat-gpt-container">
              <div className="chat-gpt-card dark">
                <ChatGPTCard
                  question={currentQuery ? currentQuery : Frag}
                  triggerMode={TriggerMode.Always}
                  onStatusChange={setQueryStatus}
                  triggered={triggered}
                />
              </div>
            </div>
          </div>

          {/*  Bottom bar */}

          {showActiveTemplates && (
            <FilterPrompts
              close={() => {
                setShowActiveTemplates((prev) => !prev);
              }}
            ></FilterPrompts>
          )}
          <div className="bottom--toolbar">
            <div className="divider"></div>

            <div className="bubble__container">
              <BubbleGroup handleQuery={handleQuery} />
              <div className={'editAdd'}>
                <div
                  onClick={() => {
                    setShowTemplateGenerator((prev) => !prev);
                  }}
                >
                  <RippleButton shape="square" outlineColor="grey" callBack={handleAddTemplate}>
                    <Icon id="add" size={16} color="white"></Icon>
                  </RippleButton>
                </div>

                <div
                  onClick={() => {
                    setShowActiveTemplates((prev) => !prev);
                  }}
                >
                  <RippleButton shape="square" outlineColor="grey">
                    <Icon id="edit" size={16} color="white"></Icon>
                  </RippleButton>
                </div>
              </div>
            </div>



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
