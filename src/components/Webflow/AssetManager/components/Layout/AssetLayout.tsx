import styles from '../../assetManager.module.scss'
import React from 'react'
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index'
import Icon from '@src/components/IconWrapper/Icon'
import { useGlobalContext } from '@Context/Global/GlobalProvider'
import SearchBar from '../SearchBar/SearchBar-index'
import Dropdown from '@src/components/Util/DropDown/DropDown'
import { useState } from 'react'
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


export function ControlBar({ handleDownloadAll, handleSelectedDownloads, handleViewTypeChange, handleFilterTypeChange, searchTerm, setSearchTerm, handleSearchChange }) {

  // Dropdown options
  const downloadOptions = [
    { label: "Download All", icon: "download", action: handleDownloadAll },
    { label: "Download Selected", icon: "download", action: handleSelectedDownloads },
  ];

  const filterOptions = [
    { label: "All", icon: "all" },
    { label: "Images", icon: "image" },
    { label: "SVGs", icon: "svg" },
    { label: "PNGs", icon: "png" },
    { label: "MP4s", icon: "mp4" },
    { label: "Text Documents", icon: "text" },
  ];

  // State to store selected action
  const [selectedDownloadAction, setSelectedDownloadAction] = useState(null);

  // Handle dropdown option selection
  const handleDownloadOptionChange = (option) => {
    setSelectedDownloadAction(() => option.action);  // store action as state
  };

  const handleFilterOptionChange = (option) => {
    handleFilterTypeChange(option.icon);  // pass icon as filter type
  };

  return (
    <>
      <div className={styles['Asset__controlBar']}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchChange={handleSearchChange} />
        <RippleButton callBack={() => handleViewTypeChange('row')} shape="square" outlineColor='grey' padding='4px'>
          <Icon id="rowView" size={16} color="grey"></Icon>
        </RippleButton>
        <RippleButton callBack={() => handleViewTypeChange('column')} shape="square" outlineColor='grey' padding='4px'>
          <Icon id="columnView" size={16} color="grey"></Icon>
        </RippleButton>

        <Dropdown
          options={filterOptions}
          label="Filter"
          onChange={handleFilterOptionChange}
          icon={true}
        />

        <Dropdown
          options={downloadOptions}
          label="Download"
          onChange={handleDownloadOptionChange}
          icon={true}
        />

        <RippleButton
          callBack={selectedDownloadAction}  // use the selected action
          shape="square"
          outlineColor='grey'
          padding='4px'
          disabled={!selectedDownloadAction}  // disable the button if no action is selected
        >
          <Icon id="download" size={16} color="grey"></Icon>
        </RippleButton>
      </div>
    </>
  )
}
