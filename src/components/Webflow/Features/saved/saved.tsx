import React from 'react';
import styles from './saved.module.scss';
import Classnames from 'classnames';

export interface SavedProps {
    className?: string;
}

export const Saved: React.FC<SavedProps> = ({ className = '' }) => (
    <div className={Classnames(className, styles.root)}><div className={styles['saved-container']}>
        <div />
    </div>
    </div>
);