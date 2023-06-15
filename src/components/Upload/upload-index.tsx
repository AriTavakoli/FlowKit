import { useGlobalContext } from '@Context/Global/GlobalProvider';
import Icon from '@src/components/IconWrapper/Icon';
import React, { useEffect, useRef, useState } from 'react';
import { BlockTabsParent } from './BlockTabs/BlockTabs-index';
import { useWorkspaceContext } from './Context/WorkspaceContext';
import styles2 from './upload.module.css';
import { handleWorkspaceFileChange } from './utils/FileUpload';
import VoiceInputModal from './VoiceTranscription/voice-index';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';

function WorkSpace({ onUpload}) {


  const {
    retrieveSetting,
  } = useGlobalContext();

  const {
    workspaceData
  } = useWorkspaceContext()

  const [currentCodeAccent, setCurrentCodeAccent] = useState('');

  useEffect(() => {
    const fetchColorValue = async () => {
      const userSettings = await retrieveSetting('accentColor');
      if (userSettings) {
        setCurrentCodeAccent(userSettings.accentColor);
      }
    };

    fetchColorValue();
  }, [retrieveSetting]);


  return (
    <>

        <BlockTabsParent
          initialState={workspaceData}
          onUpload={onUpload}

        />
        {/* <div>
        <h1>Web Speech API Example</h1>
        <button onClick={() => setIsModalOpen(true)}>Transcribe Voice</button>
        <VoiceInputModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      </div> */}

    </>
  );
};



export default WorkSpace;

