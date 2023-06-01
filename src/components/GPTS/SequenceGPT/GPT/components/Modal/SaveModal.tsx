import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal/Modal';
import { useSequenceGpt } from '../../Context/SequenceGptContext';


function SaveModal({ message, status, setSaveStatus }) {

  const editInputRef = useRef<HTMLInputElement | null>(null);

  const [saveLogName, setSaveLogName] = useState('')

  const [visible, setVisible] = useState(false)

  const { index, savedRetries, handleSave, answer, handleRefreshStorage, handleSaveResponse} = useSequenceGpt();



  useEffect(() => {
    if (status === 'save') { setVisible(true) }
    if (status === 'close') { setVisible(false) }
  }, [status]);


  // const sendMessage = () => {
  //   console.log(index, 'index');


  //   let payload;
  //   if (index === 0) {
  //     payload = answer;
  //   } else {
  //     payload = savedRetries[index - 1];
  //   }


  //   (async () => {
  //     const response = await chrome.runtime.sendMessage({ type: 'saveChat', payload: payload, logName: saveLogName });
  //     // do something with response here, not outside the function
  //     console.log(response);
  //   })();

  //   console.log(payload, 'payload');




  //   // console.log(savedRetries[index - 1], 'savedRetries[index]');
  // }

  return (
    <Modal
      visible={visible}
      title="SaveQuery"
      onClose={() => {
        setSaveStatus('close')
      }}
      actions={[
        { label: 'save', primary: true, onClick: () => handleSaveResponse(saveLogName, 'chat') },
        { label: 'Cancel', primary: false, onClick: () => setSaveStatus('close') },
      ]}
    >
      {/* Rename item <strong>"{todoItem?.todo}"</strong> */}

      <div className="todo-rename-modal-input">
        <input
          ref={editInputRef}
          type="text"
          className="styled-input"
          placeholder="New name"
          // value={e.currentTarget.value }
          onChange={(e) => setSaveLogName(e.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSaveResponse(saveLogName, 'chat')
              setSaveStatus('close')
              setSaveLogName('')
            }
          }}
        />
      </div>
    </Modal>
  )

}

export default SaveModal;