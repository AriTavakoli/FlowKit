import React from 'react'
import styles from './SearchBar.module.scss'
import Icon from '@src/components/IconWrapper/Icon'



export default function SearchBar({ searchTerm, handleSearchChange, FilterDropDown }) {
  return (
    <div className={styles['search-bar-container']}>
      <div className={styles['search-bar']}>

        <div className={styles['search-icon-container']}>
          <Icon id="search" size={14} color={"grey"} />
        </div>

        <div className={styles['filter-holder']}>
          <div className={styles['overflow']}>
          </div>
          <input
            className={styles['search-bar-input']}
            onChange={handleSearchChange}
            value={searchTerm}
            placeholder="Find anything..."
          ></input>
          <div className= {styles['Filter__wrapper']}>

            {FilterDropDown}
          </div>


        </div>

      </div>
    </div>
  )
}