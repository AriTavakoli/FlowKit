import styles from './settings.module.scss';
import React,{ useState, useRef } from 'react';
import { FC } from 'react';
import classNames from 'classnames';
import { ToggleButton } from '@Utils/toggle-button/toggle-button';


export interface SettingsProps {
    ref?: any;
    className?: string;
}

export const Settings = ({ ref, className }: SettingsProps) => {

    return (
        <div ref={ref} className={styles['settings-container']}>
            <div className={styles['settings-label']}>Show only available</div>

            <SettingsRow label="Filter" />
            <SettingsRow label="Filter" />

            <SettingsRow label="filter" />


        </div >
    );
};


interface SettingsRowProps {
    label: string;
}

const SettingsRow: FC<SettingsRowProps> = ({ label }) => {
    return (
        <div className={styles['settings-row']}>
            <div className={styles['settings-icon']}>
                <span>
                    {label}
                </span>
            </div>
            <div className={styles['settings-toggle']}>
                <ToggleButton />
            </div>
        </div >
    );
}

