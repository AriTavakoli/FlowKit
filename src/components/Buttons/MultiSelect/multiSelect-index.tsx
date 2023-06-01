import React, { useState } from 'react';
import Icon from '@src/components/IconWrapper/Icon';
import RippleButton from '../RippleButton/rippleButton-index';
import styles from './multiSelect.module.scss';

export default function MultiSelect({ handleModeChange }) {
  const [mode, setMode] = useState('normal'); // initialized to 'normal'

  const handleChangeMode = () => {
    const newMode = mode === 'normal' ? 'add' : 'normal'; // switched between 'add' and 'normal' modes
    setMode(newMode);
    handleModeChange(newMode);
  };

  const iconSize = 12;

  return (
    <div>
      <div className={styles['multiSelect__container']} onClick={handleChangeMode}>
        <RippleButton shape="rounded" color="grey" outlineColor="grey" padding = '8px'>
          <Icon id="edit" size={iconSize} color="white" />
        </RippleButton>
      </div>
    </div>
  );
}
