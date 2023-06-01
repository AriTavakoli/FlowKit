import React from 'react';
import styles from './topBar.module.scss';
import RippleButton from '@src/components/Buttons/RippleButton/rippleButton-index';
import Icon from '@src/components/IconWrapper/Icon';

export default function TopBar({ close }) {

  return (
    <div className={styles['topBar__container']}  >
      <RippleButton padding = "4px">
        <Icon id="no" size={10} color="white" />
      </RippleButton>
      <div onClick={close}>
        <RippleButton shape='square'   >
          <Icon id="close" size={12} color="white" />
        </RippleButton>
      </div>



    </div>
  )


}