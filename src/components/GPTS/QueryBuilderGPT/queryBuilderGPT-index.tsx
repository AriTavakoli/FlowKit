// Tava.jsx
import React, { useState } from "react";
import Live from "../Features/Live/live-index";
import GPT from "../GPT/GPT-index";
import { QueryBuilderGptProvider } from "./GPT/Context/QueryBuilderGptContext";
import LiveGPT from "./GPT/gptLive-index";
import styles from "./QueryGpt.module.scss";
import PanelResizer from "./PanelResizer/panelResizer-index";
import { useGlobalContext } from "@Context/Global/GlobalProvider";
import { WebflowGptProvider } from "@Context/Ai/WebflowGPTProvider";

function QueryBuilder({ open, sequenceRef, executeCurrentSequence, UploadButton }) {
  const [size, setSize] = useState(50); // Set the initial size in percentage




  const handleResize = (clientX) => {
    const newSize = (clientX / window.innerWidth) * 100;
    setSize(newSize);
  };

  return (
    open && (
      <QueryBuilderGptProvider>
        <WebflowGptProvider>
          <div className={styles["LiveGPT__container"]}>
            <LiveGPT
              sequenceRef={sequenceRef ? sequenceRef : null}
              executeCurrentSequence={executeCurrentSequence ? executeCurrentSequence : null}
            ></LiveGPT>
          </div>
        </WebflowGptProvider>
      </QueryBuilderGptProvider>
    )
  );
}

export default QueryBuilder;
