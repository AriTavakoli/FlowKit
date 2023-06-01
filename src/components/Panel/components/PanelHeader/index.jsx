import React, { useState, useEffect } from 'react';
import Icon from '@IconWrapper/Icon.tsx';
import { ToolBarTop } from '../../../tool-bar/ToolBar-Top/tool-bar-top.tsx'
import { ToolBarBottom } from '../../../tool-bar/ToolBar-Bottom/tool-bar-bottom.tsx'
import '../../styles.css'

const PanelHeader = ({ onDrag, side }) => {
  const [mouseDown, setMouseDown] = useState(false);


  function ToolBarVariation() {
    if (side === 'top') {
      return (
        <ToolBarTop onMouseDown={handleMouseDown}></ToolBarTop>
      )
    }
    if (side === 'bottom') {
      return (
        <ToolBarBottom onMouseDown={handleMouseDown}></ToolBarBottom>
      )
    }
  }

  useEffect(() => {
    const handleMouseUp = () => setMouseDown(false);

    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.addEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => onDrag(e.movementX, e.movementY);

    if (mouseDown) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = () => setMouseDown(true);

  return (
    <ToolBarVariation></ToolBarVariation>
  );
}

export default PanelHeader;


