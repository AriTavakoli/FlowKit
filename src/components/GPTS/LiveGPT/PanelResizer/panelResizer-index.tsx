import React, { useState, useEffect } from "react";
import styles from './resizer.module.scss'
import Icon from "@src/components/IconWrapper/Icon";


interface PanelResizerProps {
  onResize: (x: number) => void;
  mod?: any;
}



const PanelResizer = ({ onResize, mod }: PanelResizerProps) => {
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
    }
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    onResize(e.clientX);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className={styles["resizer"]} onMouseDown={handleMouseDown} style={mod ? mod : null}   >
      <Icon id="dots" size={16} color="grey"></Icon>
    </div>
  )
};

export default PanelResizer;
