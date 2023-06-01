import React, { useCallback, useState } from 'react';
import ButtonV2 from './indexv2';
import styles from './bubble.module.scss';
import Icon from '../IconWrapper/Icon';

const NavGroup = ({ }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);

  const handleClick = useCallback((index: number) => {
    setSelectedButtonIndex(index);
  }, []);


  return (
    <div className={styles['container']}>
      <div onClick={() => handleClick(0)}>
        <ButtonV2 color="grey" shape="square" outlineColor={"none"} text="Button 1" selected={selectedButtonIndex === 0} >
          <Icon id="search" size={20} color="white" />
        </ButtonV2>
      </div>

      <div onClick={() => handleClick(1)}>
        <ButtonV2 color="grey" shape="square" outlineColor={"grey"} text="Button 1" selected={selectedButtonIndex === 1} >
          <Icon id="search" size={20} color="white" />
        </ButtonV2>
      </div>


      <div onClick={() => handleClick(2)}>
        <ButtonV2 color="grey" shape="square" outlineColor={"grey"} text="Button 1" selected={selectedButtonIndex === 2} >
          <Icon id="search" size={20} color="white" />
        </ButtonV2>
      </div>


    </div>
  );
};

export default NavGroup;
