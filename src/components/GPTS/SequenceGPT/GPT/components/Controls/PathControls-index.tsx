import React, { useCallback, useEffect, useState } from 'react';
import Icon from '@src/components/IconWrapper/Icon';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import "@Global/index.scss"
import { useSequenceGpt } from '../../Context/SequenceGptContext';
import SaveModal from '../Modal/SaveModal';
import { getStorageItem } from '@src/Utils/utils';



const PathControls = ({handleAddChildSequence, setTriggered}) => {
  const iconColor = 'grey';

  const {
    save,
    index,
    setIndex,
    savedRetries,
    handleNewResponse,
    handleStorageItem,
    currentResponseMode,
    handleRefreshStorage,
    handleCurrentResponse,
  } = useSequenceGpt();

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

        <div className="button__container">

          <div className={'verticalDivider'}></div>

          <RippleButton shape="square" dot={false} outlineColor="none" text="BEM" callBack={handleNewResponse} padding='12px'>
            <Icon id="refresh" size={16} color={iconColor} />
          </RippleButton>

          <div className={'verticalDivider'}></div>



          <div onClick={setTriggered}>
            <RippleButton shape="square" dot={false} outlineColor="none" text="BEM" padding='12px'>
              <Icon id="play" color={iconColor} size={16} />
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


export default PathControls
