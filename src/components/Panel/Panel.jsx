import React, { useRef, useEffect } from 'react';
import Search from '../SearchV2';

import PanelHeader from './components/PanelHeader';
import Resizer from './components/Resizer';

import { Direction } from './components/Resizer/constants';

import './styles.css';

const Panel = ({ children }) => {
  const panelRef = useRef(null);



  const searchRef = useRef();

  const handleConsoleRef = () => {
    console.log(searchRef.current);
  };


  const handleDrag = (movementX, movementY) => {
    const panel = panelRef.current;
    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  const handleResize = (direction, movementX, movementY) => {

    // searchRef.current.style.pointerEvents = 'none';


    const panel = panelRef.current;
    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();

    const resizeTop = () => {

      searchRef.current.style.height = `${height - movementY}px`;
      // searchRef.current.style.top = `${y + movementY}px`;

      panel.style.height = `${height - movementY}px`;
      panel.style.top = `${y + movementY}px`;
    };

    const resizeRight = () => {
      searchRef.current.style.width = `${width + movementX}px`;
      panel.style.width = `${width + movementX}px`;
    };

    const resizeBottom = () => {
      searchRef.current.style.height = `${height + movementY - 50}px`;
      panel.style.height = `${height + movementY}px`;
    };

    const resizeLeft = () => {
      searchRef.current.style.width = `${width - movementX}px`;
      // searchRef.current.style.left = `${x + movementX}px`;
      panel.style.width = `${width - movementX}px`;
      panel.style.left = `${x + movementX}px`;
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;

      case Direction.Top:
        resizeTop();
        break;

      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;

      case Direction.Right:
        resizeRight();
        break;

      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;

      case Direction.Bottom:
        resizeBottom();
        break;

      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;

      case Direction.Left:
        resizeLeft();
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    if (searchRef.current) {
      let { offsetWidth, offsetHeight } = searchRef.current;
      panelRef.current.style.width = `${offsetWidth}px`;
      panelRef.current.style.height = `${offsetHeight + 50}px`;
    }


  }, [searchRef]);

  return (
    <div className="panel"
      style={{
        position: 'absolute',
        width: `${searchRef.current ? searchRef.current.offsetWidth : 0}px}`,
        height: `${searchRef.current ? searchRef.current.offsetHeight : 0}px}`,
        zIndex: '1000',
        backgroundColor: 'white',
      }}



      ref={panelRef}>
      <div className="panel__container">
        <Resizer onResize={handleResize} ref={searchRef} />
        {/* // get the children size and set the panel size to that */}
        <PanelHeader onDrag={handleDrag} side={'top'} />
        <Search ref={searchRef} />


        <PanelHeader onDrag={handleDrag} side={'bottom'} />
        {/* <button onClick={handleConsoleRef}>console ref</button> */}



        <div className="panel__content">

        </div>
      </div>
    </div>
  );
};

export default Panel;



