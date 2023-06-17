import styles from './BubbleSet.module.scss'
import React, { useState, useEffect } from 'react';
import NodeBubbleGroup from '../GptButtons/FilterPromptsBubbles/NodeBubbleGroup';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import FilterPrompts from '../Tooltip/FilterPrompts/filterPrompts-index';
import { useGlobalContext } from '@Context/Global/GlobalProvider';

export default function BubbleSet({ setShowTemplateGenerator, sequenceRef, sequenceId, handleSwitchTab, handleQuery, accessType }) {


  const [showActiveTemplates, setShowActiveTemplates] = useState(false);


  const {
    setActiveTab,
  } = useGlobalContext();


  return (
    <>
      {showActiveTemplates && (
        <FilterPrompts
          sequenceRef={sequenceRef}
          handleSwitchTab={handleSwitchTab}
          accessType={accessType}
          close={() => {
            setShowActiveTemplates((prev) => !prev);
          }}
        ></FilterPrompts>
      )}


      <div className={styles["bubble__container"]}>

        <NodeBubbleGroup accessType={accessType} handleQuery={handleQuery} sequenceRef={sequenceRef} />
        <div className={'editAdd'}>
          <div
            onClick={() => {
              setShowTemplateGenerator((prev) => !prev);
            }}
          >
            <RippleButton
              shape="square"
              outlineColor="grey"
              callBack={() => {
                StorageOps.setCurrentSelectedNodeId(sequenceRef ? sequenceRef.getId() : sequenceId);
                handleSwitchTab('dTab')
              }}
              padding='12px'>

              <Icon id="add" size={16} color="grey"></Icon>
            </RippleButton>
          </div>

          <div
            onClick={() => {
              setShowActiveTemplates((prev) => !prev);
            }}
          >
            <RippleButton shape="square" outlineColor="grey" padding='12px'>
              <Icon id="edit" size={16} color="grey"></Icon>
            </RippleButton>
          </div>
        </div>
      </div>
    </>
  )


}