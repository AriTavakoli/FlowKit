import React, { FC } from 'react';
import styles from './toggle-button.module.scss'
import useToggle from '@Hooks/useToggle';

interface ToggleButtonProps {

}

export const ToggleButton: FC<ToggleButtonProps> = () => {
    const [state, toggle, handleClick] = useToggle();

    return (
        <div className={styles["toggleContainer"]} onClick={toggle}>
            {state ? <div className={styles["toggleCircle active"]}></div> : <div className="toggleCircle"></div>}
        </div>
    );
}
