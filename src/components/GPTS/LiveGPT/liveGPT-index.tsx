// Tava.jsx
import React, { useState } from "react";
import Live from "@src/components/Webflow/Features/Live/live-index";
import GPT from "../GPT/GPT-index";
import { LiveGptProvider } from "./GPT/Context/LiveGptContext";
import LiveGPT from "./GPT/gptLive-index";
import LiveTree from "./TreeView/Treeview";
import styles from "./liveGPT.module.scss";
import PanelResizer from "./PanelResizer/panelResizer-index";
import { useGlobalContext } from "@Context/Global/GlobalProvider";
import { WebflowGptProvider } from "@Context/Ai/WebflowGPTProvider";
import { SequenceControllerProvider } from "@src/components/Sequence/Context/SequenceContext";
import SequenceBuilder from "@src/components/Sequence/Sequence-index";
function Tava() {
const [size, setSize] = useState(50); // Set the initial size in percentage


  const handleResize = (clientX) => {
    const newSize = (clientX / window.innerWidth) * 100;
    setSize(newSize);
  };

  return (
    <LiveGptProvider>
      <WebflowGptProvider>
        <SequenceControllerProvider>
          <div className={styles["LiveGPT__container"]}>
            <div
              className={styles["LiveGPT__live"]}
              style={{ flexBasis: `${size}%`, maxWidth: `${size}%` }}
            >
              <LiveTree controlPosition={`${100 - size}%`} />
            </div>

            {/* Add the Resizer component */}
            <PanelResizer onResize={handleResize} />
            <div
              className={styles["LiveGPT__GPT"]}
              style={{ flexBasis: `${100 - size}%`, maxWidth: `${100 - size}%` }}
            >
              {/* <SequenceBuilder></SequenceBuilder> */}
              <LiveGPT></LiveGPT>
            </div>
          </div>
        </SequenceControllerProvider>
      </WebflowGptProvider>
    </LiveGptProvider>
  );
}

export default Tava;
