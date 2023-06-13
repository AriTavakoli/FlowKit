import styles from '../../assetManager.module.scss'
import React from 'react'
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index'
import Icon from '@src/components/IconWrapper/Icon'
import { useGlobalContext } from '@Context/Global/GlobalProvider'


export function AssetLayout({ children }) {

  const { theme } = useGlobalContext();

  return (
    <div className={styles[`theme--${theme}`]}>
      <div className={styles['Asset__container']}>
        {children}
      </div>
    </div>

  )
}


export function ControlBar({ handleDownloadAll, handleSelectedDownloads, handleViewTypeChange, handleFilterTypeChange }) {
  return (
    <>


        <div className={styles['Asset__controlBar']}>
          <button onClick={() => handleViewTypeChange('row')}>Row View</button>
          <button onClick={() => handleViewTypeChange('column')}>Column View</button>

          <select onChange={(e) => handleFilterTypeChange(e.target.value)}>
            <option value="all">All</option>
            <option value="image">Images</option>
            <option value="svg">SVGs</option>
            {/* Add more options as needed */}
          </select>
          <span > Download All </span>
          <RippleButton callBack={() => handleDownloadAll()} shape="square" outlineColor='grey' padding='4px'>
            <Icon id="download" size={16} color="white"></Icon>
          </RippleButton>

          <span > Download Selected </span>
          <RippleButton callBack={() => handleSelectedDownloads()} shape="square" outlineColor='grey' padding='4px'>
            <Icon id="download" size={16} color="white"></Icon>
          </RippleButton>
        </div>

      </>
      )
}