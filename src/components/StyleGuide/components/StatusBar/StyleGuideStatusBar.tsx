import '@Global/index.scss';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';
import useStatusBarActions from '@src/components/StatusBar/hooks/useStatusBarActions';
import useOnClickOutside from '@src/components/hooks/useOnClickOutside';

import React, { useEffect, useRef, useState } from 'react';

interface StatusBarProps {
  options: {
    activation: 'click' | 'hover';
    deactivation: 'click' | 'timeout';
  }
}

const StyleGuideStatusBar: React.FC<StatusBarProps> = ({ options, setActiveModal, setShowModal, showModal, showStatusBar }) => {
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

    <div className={`status-bar ${visible ? 'visible' : 'visible'}`} style={{ zIndex: '100000000000000001' }}>
      <div className="statusBar__container" ref={barRef}>
        <RippleButton callBack={() => { resizePopupWindow(400, 600); }} padding='4px' >
          <Icon id="expand" size={iconSize} color="grey"></Icon>
        </RippleButton>
        <RippleButton callBack={() => { handlePrintLocalStorage() }} padding='4px'>
          <Icon id="drop" size={iconSize} color="grey"></Icon>
        </RippleButton>
        <RippleButton callBack={() => { resizePopupWindow(1260, 750) }} padding='4px'>
          <Icon id="expandHorizontal" size={iconSize} color="grey"></Icon>
        </RippleButton>

        <RippleButton callBack={() => { setActiveModal('timer'); setShowModal(!showModal) }} padding='4px'>
          <Icon id="clock" size={iconSize} color="grey"></Icon>
        </RippleButton>

        <RippleButton callBack={() => { setActiveModal('calculator'); setShowModal(!showModal) }} padding='4px'>
          <Icon id="calculator" size={iconSize} color="grey"></Icon>
        </RippleButton>


        <RippleButton callBack={() => { openOptionsPage() }} padding='4px'>
          <Icon id="settings" size={iconSize} color="grey" ></Icon>
        </RippleButton>


      </div>
      {/* <div onClick={() => { resizePopupWindow(400, 600) }}>resize</div> */}
    </div>

  );
};

export default StyleGuideStatusBar;
