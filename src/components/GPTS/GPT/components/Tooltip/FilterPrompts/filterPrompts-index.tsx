
import React, { useState, useRef } from 'react';


import styles from './filterPrompts.module.scss';
import SelectedTemplates from '@src/components/Selected/selectedBubbles-index';
import TopBar from '../components/TopBar/topBar-index';


export default function FilterPrompts({ close }) {

  return (
    <>
      <div className={styles['filterPrompts']}>
        <TopBar close={close}></TopBar>
        <SelectedTemplates />

      </div>
    </>

  )

}



