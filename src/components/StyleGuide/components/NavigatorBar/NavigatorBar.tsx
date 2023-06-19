import Icon from '@src/components/IconWrapper/Icon';
import styles from '../../StyleGuide.module.scss';
import { useStyleguideContext } from '../../context/StyleguideReferenceContext';
import React, { useEffect, useRef, useState } from 'react';


export default function NavigatorBar({ handleAllNodesInactive, handleAddNode }) {

  const {
    position,
    setPosition,
    currentPageIndex,
    setCurrentPageIndex,
    mode,
    setMode,
  } = useStyleguideContext();


  function handleSideBar() {
    if (position === 'fixed') {
      setPosition('relative');
    } else {
      setPosition('fixed');
    }
  }


  return (
    <div className={styles['NavigationBar-wrapper']}>

      <span className={styles['NavigationBar-text']}>Navigator </span>

      <div className={styles['NavigationBar-icon-wrapper']}>
      <Icon id="code" size={14} color="grey" onClick={() => { setMode('code') }} ></Icon>

        <Icon id="tree" size={14} color="grey" onClick={() => { setMode('flow') }} ></Icon>
        <Icon id="collapseTree" size={14} color="grey" onClick={handleAllNodesInactive} ></Icon>
        <Icon id="treeLeft" size={14} color="grey" onClick={handleSideBar} ></Icon>
        <Icon id="add" size={14} color="grey" onClick={handleAddNode}></Icon>

      </div>
    </div>

  )

}