// src/Dropdown.js
import React, { useEffect, useState } from 'react';
import styles from './dropdown.module.scss'
import Icon from '@src/components/IconWrapper/Icon';


interface DropdownProps {
  options: any[]
  label: string
  onChange: (option: any) => void
  customStyles?: any
  icon?: boolean
}

const Dropdown = ({ options, label, onChange, customStyles, icon }: DropdownProps) => {
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);



  return (
    <div className={styles["dropdown"]}>
      <div className={styles["dropdown-button"]} onClick={handleToggle}>
        {selectedOption ? selectedOption.label : label}

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

                <div title="experimental custom renderer" className={styles["icon__container"]}>
                  <Icon id={option.icon} size={16} color="grey" ></Icon>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
