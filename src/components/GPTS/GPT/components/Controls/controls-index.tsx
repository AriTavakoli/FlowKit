import React, { useCallback, useEffect, useState } from 'react';
import Icon from '@src/components/IconWrapper/Icon';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import "@Global/index.scss"
import { useGPT } from '../../Context/ChatGptContext';
import SaveModal from '../Modal/SaveModal';
import { getStorageItem } from '../../../../Utils/utils';



const Controls = () => {
  const iconColor = 'grey';

  const { handleNewResponse, handleStorageItem, handleRefreshStorage, save, savedRetries, handleCurrentResponse, currentResponseMode, index, setIndex, } = useGPT();

  const handleLeftArrowClick = useCallback(() => {
    const newIndex = index - 1;
    if (newIndex >= 0) {
      setIndex(newIndex);
      handleCurrentResponse(newIndex);
    }
  }, [index, handleCurrentResponse]);

  const handleRightArrowClick = useCallback(() => {
    const maxIndex = savedRetries.length;
    const newIndex = index + 1;
    if (newIndex <= maxIndex) {
      setIndex(newIndex);
      handleCurrentResponse(newIndex);
    }
  }, [savedRetries, index, handleCurrentResponse]);

  useEffect(() => {
    if (savedRetries.length === 0) {
      setIndex(0);
    } else {
      setIndex(savedRetries.length);
    }
  }, [savedRetries]);



  const saveLog = () => {
    setSaveStatus('save')
    handleRefreshStorage();
  }

  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    console.log(saveStatus);
  }, [saveStatus]);


  return (
    <>
      <div className={'control__container'}>

        <div className = "button__container">

          <RippleButton shape="square" dot={false} outlineColor="none" text="BEM" callBack={handleLeftArrowClick}>
            <Icon id="leftArrow" color={iconColor} size={16} />
          </RippleButton>

          {currentResponseMode ? <div>{index + "/" + savedRetries.length}</div> : <div>{index} / {savedRetries ? savedRetries.length : 1}</div>}

          {/* <div>{savedRetries ? `${index} /` + savedRetries.length : 1}</div> */}

          <RippleButton shape="square" dot={false} outlineColor="none" text="BEM" callBack={handleRightArrowClick}>
            <Icon id="rightArrow" color={iconColor} size={16} />
          </RippleButton>

          <div className={'verticalDivider'}></div>

          <RippleButton shape="square" dot={false} outlineColor="none" text="BEM" callBack={handleNewResponse}>
            <Icon id="refresh" size={16} color={iconColor} />
          </RippleButton>

          <div className={'verticalDivider'}></div>

          <div>
            <RippleButton shape="square" dot={false} outlineColor="none" text="BEM">
              <Icon id="clipboard" color={iconColor} size={16} />
            </RippleButton>
          </div>


          <div className={'verticalDivider'}></div>
          <div onClick={saveLog}>
            <RippleButton shape="square" dot={false} outlineColor="none" text="BEM" >
              <Icon id="mark" color={iconColor} size={16} />
            </RippleButton>

          </div>

          <SaveModal status={saveStatus} setSaveStatus={setSaveStatus} message={savedRetries[index]}></SaveModal>
          {/* <div className={styles['verticalDivider']}></div> */}

          {/* <ButtonV2 shape="square" dot={false} outlineColor="none" text="BEM" callBack={() => handleCurrentResponse(index)}>
          Go
        </ButtonV2> */}
        </div>

      </div>
    </>
  );
};


export default Controls
