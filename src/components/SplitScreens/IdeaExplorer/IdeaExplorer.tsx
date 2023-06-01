// Tava.jsx
import SequenceBuilder from "@src/components/Sequence/Sequence-index";
import React, { useState } from "react";
import EditorMain from '../../MarkDownEditor/markdown-index';
import PanelResizer from "@src/components/GPTS/LiveGPT/PanelResizer/panelResizer-index";
import styles from "./liveGPT.module.scss";
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import Icon from "@src/components/IconWrapper/Icon";


function IdeaExplorer() {
  const defaultSize = 40;
  const [size, setSize] = useState(defaultSize); // Set the initial size in percentage
  const [isCollapsed, setIsCollapsed] = useState(false); // New state for tracking collapse/expand
  const handleResize = (clientX) => {
    const newSize = (clientX / window.innerWidth) * 100;
    setSize(newSize);
  };

  // New function to handle click on the button
  const handleToggleCollapse = () => {
    if (isCollapsed) {
      setSize(60);
    } else {
      setSize(0);
    }
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={styles["LiveGPT__container"]}>
        <div
          className={styles["LiveGPT__live"]}
          style={{ flexBasis: `${size}%`, maxWidth: `${size}%` }}
        >
          <EditorMain />
        </div>

        <div className={styles['SizeControl__wrapper']}>
          <RippleButton callBack={handleToggleCollapse} padding="12px" >
            <Icon id={isCollapsed ? 'expandRight' : 'collapseLeft'} size={16} color="white"></Icon>
          </RippleButton>
        </div>

        {/* Add the Resizer component */}
        <PanelResizer onResize={handleResize} />

        {/* Add the new button */}


        <div
          className={styles["LiveGPT__GPT"]}
          style={{ flexBasis: `${100 - size}%`, maxWidth: `${100 - size}%` }}
        >
          <SequenceBuilder  />
        </div>
      </div>
    </>
  );
}

export default IdeaExplorer;
