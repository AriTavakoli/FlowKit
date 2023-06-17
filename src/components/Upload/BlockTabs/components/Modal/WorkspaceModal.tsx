import React, { useState, useRef, useEffect } from 'react';
import styles from './WorkspaceModal.module.scss'
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';
import useOnClickOutside from '@src/components/hooks/useOnClickOutside';


const WorkspaceModal = ({ isOpen, closeModal, createWorkspace }) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const modalRef = useRef()

  const handleSubmit = () => {
    createWorkspace(workspaceName);
    closeModal();
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [closeModal]);


  useOnClickOutside(modalRef, () => closeModal(), [handleKeyPress]);

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }} ref={modalRef}>
      <div className={styles['Modal__wrapper']}>
        <div>
          <div className={styles['Modal__formWrapper']}>
            <div className={styles['Modal__form--block']}>
              <label htmlFor="workspaceName">Workspace Name</label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        </div>
        <div className={styles['Modal__button--create']}>
          <RippleButton outlineColor="grey" shape="square" padding="12px" callBack={handleSubmit}>
            <Icon id="builder" size={16} color="grey" />
          </RippleButton>
        </div>
      </div>
    </div>
  );
};


export default WorkspaceModal;