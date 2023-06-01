import React, { useState } from "react";
import Live from "../Features/Live/live-index";
import GPT from "../GPT/GPT-index";
import { SequenceGptProvider } from "./GPT/Context/SequenceGptContext";
import SequenceIndex from "./GPT/SequenceGpt-index";
import LangChain from "@src/Lang/pages";
import styles from "./Sequence.module.scss";
import PanelResizer from "./PanelResizer/panelResizer-index";
import { useGlobalContext } from "@Context/Global/GlobalProvider";
import { WebflowGptProvider } from "@Context/Ai/WebflowGPTProvider";

function SequenceExplorer({ open, sequenceRef, executeCurrentSequence }) {
  const [size, setSize] = useState(50); // Set the initial size in percentage
  const [selectedComponent, setSelectedComponent] = useState("Sequence");

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  const handleResize = (clientX) => {
    const newSize = (clientX / window.innerWidth) * 100;
    setSize(newSize);
  };

  return (
    open && (
      <SequenceGptProvider>
        <WebflowGptProvider>
          <div className={styles["LiveGPT__container"]}>
            <select value={selectedComponent} onChange={handleComponentChange}>
              <option value="LangChain">LangChain</option>
              <option value="SequenceIndex">SequenceIndex</option>
            </select>
            {selectedComponent === "LangChain" ? (
              <LangChain
                sequenceRef={sequenceRef ? sequenceRef : null}
              />
            ) : (
              <SequenceIndex
                sequenceRef={sequenceRef ? sequenceRef : null}
                executeCurrentSequence={
                  executeCurrentSequence ? executeCurrentSequence : null
                }
              />
            )}

          </div>
        </WebflowGptProvider>
      </SequenceGptProvider>
    )
  );
}

export default SequenceExplorer;
