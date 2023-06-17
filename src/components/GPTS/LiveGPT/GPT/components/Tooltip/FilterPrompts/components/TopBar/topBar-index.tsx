import React from 'react';
import styles from './topBar.module.scss';
import RippleButton from '../../../Buttons/RippleButton/rippleButton-index';
import Icon from '../../../IconWrapper/Icon';

export default function TopBar() {

  return (
    <div className={styles['topBar__container']} >
      <RippleButton >
        <Icon id="no" size={10} color="grey" />
      </RippleButton>
      <RippleButton shape='square'   >
        <Icon id="close" size={12} color="grey" />
      </RippleButton>


    </div>
  )


}