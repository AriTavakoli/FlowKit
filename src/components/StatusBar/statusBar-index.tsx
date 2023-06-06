import React, { useCallback, useState, useEffect, useRef } from 'react';
import '@Global/index.scss';
import RippleButton from '../Buttons/RippleButton/rippleButton-index';
import Icon from '../IconWrapper/Icon';
import Browser from "webextension-polyfill";
import MessageFactory from '@src/Utils/MessageFactory';
import useStatusBarActions from './hooks/useStatusBarActions';
import useOnClickOutside from '../hooks/useOnClickOutside';
import StorageOps from '../../Utils/LocalStorage/StorageOps';

interface StatusBarProps {
  options: {
    activation: 'click' | 'hover';
    deactivation: 'click' | 'timeout';
  }
}

const StatusBar: React.FC<StatusBarProps> = ({ options }) => {
  const [visible, setVisible] = useState(false);

  const { activateLiveColorPicker, resizePopupWindow, openOptionsPage } = useStatusBarActions();

  const barRef = useRef(null)

  let timer: ReturnType<typeof setTimeout>;

  const iconSize = 14;

  const handleMouseMove = (e: MouseEvent) => {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const bottomBoundary = windowHeight * 0.95;
    const rightBoundary = windowWidth * 0.95;

    if (e.clientY >= bottomBoundary && e.clientX >= rightBoundary) {
      setVisible(true);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 500);
    }
  };


  async function handlePrintLocalStorage() {


    let allItems = await StorageOps.getAllStorageItems();

    console.log('%cStorageOps.printAllStorageItems()', 'color: orange; font-size: 24px', allItems);

  }



  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useOnClickOutside(barRef, () => setVisible(false));



  return (
    <div className={`status-bar ${visible ? 'visible' : 'hidden'}`}>
      <div className="statusBar__container" ref={barRef}>
        <RippleButton callBack={() => { resizePopupWindow(400, 600) }} padding='4px' >
          <Icon id="expand" size={iconSize} color="grey"></Icon>
        </RippleButton>
        <RippleButton callBack={() => { handlePrintLocalStorage() }} padding='4px'>
          <Icon id="drop" size={iconSize} color="grey"></Icon>
        </RippleButton>
        <RippleButton callBack={() => { resizePopupWindow(1260, 750) }} padding='4px'>
          <Icon id="expandHorizontal" size={iconSize} color="grey"></Icon>
        </RippleButton>
        <RippleButton callBack={() => { resizePopupWindow(400, 600) }} >
          <Icon id="toolbar-left" size={iconSize} color="grey"></Icon>
        </RippleButton>

        <RippleButton callBack={() => { resizePopupWindow(400, 600) }} padding='4px'>
          <Icon id="calculator" size={iconSize} color="grey"></Icon>
        </RippleButton>

        <RippleButton callBack={() => { openOptionsPage() }} padding='4px'>
          <Icon id="settings" size={iconSize} color="grey"></Icon>
        </RippleButton>

      </div>
      {/* <div onClick={() => { resizePopupWindow(400, 600) }}>resize</div> */}
    </div>
  );
};

export default StatusBar;
