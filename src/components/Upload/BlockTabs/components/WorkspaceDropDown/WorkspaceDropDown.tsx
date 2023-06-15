// src/Dropdown.js
import React, { useEffect, useState } from 'react';
import styles from './WorkspaceDropDown.module.scss'
import Icon from '@src/components/IconWrapper/Icon';


interface DropdownProps {
  options: any[]
  label: string
  onChange: (option: any) => void
  customStyles?: any
  icon?: boolean
}

const WorkspaceDropDown = ({ options, label, onChange, customStyles, icon, workspaceData, handleWorkspaceNameChange, initialState, downloadButton, deleteButton }: DropdownProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };


  useEffect(() => {
    console.log('%cselectedOption', 'color: lightblue; font-size: 54px', initialState);
  }, [selectedOption]);


  return (
    <div className={styles["dropdown"]}>
      <div className={styles["dropdown-button"]} onClick={handleToggle}>
        <input
          type="text"
          placeholder={selectedOption?.label ? selectedOption.label : initialState?.tabId}
          name="workSpaceName"
          className={`${styles['WorkspaceName']} ${styles['transparent-input']}`}
          value={workspaceData?.name}
          onChange={handleWorkspaceNameChange}
        />
        {/* {selectedOption ? selectedOption.label : label} */}

        {icon && <Icon id={'downChevron'} size={20} color="grey" ></Icon>}
      </div>

      {isOpen && (
        <div className={`${styles["dropdown-menu"]}  `}  >
          {options.map((option, index) => (
            <>
              <div className={styles['dropdown-row']}>
                <div
                  key={index}
                  className={styles["dropdown-item"]}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>

                <div className={styles["icon__container"]}>
                  <Icon id={option.icon} size={24} color="grey" ></Icon>
                </div>


              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropDown;
