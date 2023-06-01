import React from 'react';
import styles from './topBar.module.scss';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';

export default function TopBar({ close }) {

  return (
    <div className={styles['topBar__container']}  >
      <RippleButton  padding = "4px">
      </RippleButton>
      <div onClick={close}>
        <RippleButton shape='square'  padding = "12px" >
          <Icon id="close" size={12} color="white" />
        </RippleButton>
      </div>



    </div>
  )


}