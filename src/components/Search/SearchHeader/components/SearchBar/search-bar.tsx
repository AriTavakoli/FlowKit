import styles from './search-bar.module.scss';
import { useState, useRef } from 'react';
import { FadeWrapper } from '@Utils/FadeWrapper/fade-wrapper';
import Icon from '@IconWrapper/Icon';
import { Settings } from '../settings/settings';
import useOnClickOutside from '@src/components/hooks/useOnClickOutside';
import { useSearchContext } from '@Context/SearchProvider';
import React from 'react';

export interface SearchBarProps {
    children?: React.ReactNode;
}

export const SearchBar = ({ children }: SearchBarProps) => {

    const { searchTerm, handleSearch } = useSearchContext();
    const { selectedCategories, toggleCategory } = useSearchContext();
    const [show, setShow] = useState(false);
    const settingsRef = useRef(null);
    useOnClickOutside(settingsRef, () => setShow(false));
    const toggleSettings = () => { setShow(!show); }


    return (
        <>
            <div className={styles['search-bar-container']}>
                <div className={styles['search-bar']}>

                    <div className={styles['search-icon-container']}>
                        <Icon id="search" size={18} color={"grey"} />
                    </div>

                    <div className={styles['filter-holder']}>
                        <div className={styles['overflow']}>
                            {selectedCategories.map((category) => {
                                return (
                                    <div key={category.id} className="filter-button" onClick={() => toggleCategory(category)}>
                                        {/* <span>{category.name}</span> */}
                                        <Icon id={category.icon} size={20} color={'grey'}></Icon>

                                    </div>
                                )
                            })}
                        </div>
                        <input className={styles['search-bar-input']} onChange={(e) => { handleSearch(e.target.value) }} value={searchTerm} placeholder="Find anything..."   ></input>
                    </div>
                    <div ref={settingsRef} className={styles['ex-icon']}>
                        <Icon onClick={() => { toggleSettings() }} id="settings" size={20} color={show ? "grey" : "grey"} />
                        <FadeWrapper show={show}>
                            <Settings></Settings>
                        </FadeWrapper>
                    </div>
                </div>
            </div>
            {children}
        </>
    );
};
