
import React, { useState,useEffect, useRef } from 'react';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import styles from './filterPrompts.module.scss';
import SelectedTemplates from '@src/components/Selected/selectedBubbles-index';
import TopBar from '../components/TopBar/topBar-index';
import SelectedNodeTemplates from '@src/components/Selected/SelectedNodeBubbles-index';


export default function FilterPrompts({ close, accessType, sequenceRef, handleSwitchTab }) {



  return (
    <>
      <div className={styles['filterPrompts']}>
        <TopBar close={close}></TopBar>
        <SelectedNodeTemplates accessType={accessType} sequenceRef={sequenceRef} handleSwitchTab = {handleSwitchTab}/>
      </div>
    </>
  )

}



