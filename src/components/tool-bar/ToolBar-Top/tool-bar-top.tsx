import React from 'react';
import styles from './toolbar-top.module.scss';
import Icon from '../../Icon';

export interface ToolBarTop {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;

}

export const ToolBarTop: React.FC<ToolBarTop> = ({ onMouseDown }) => (
    <div className={styles['panel__header']} onMouseDown = {onMouseDown}>
        {/* <Icon id="XXL" size={24} color="grey"></Icon>
        <Icon id="XL" size={24} color="grey"></Icon>
        <Icon id="L" size={24} color="grey"></Icon>
        <Icon id="tablet" size={24} color="grey"></Icon>
        <Icon id="side" size={24} color="grey"></Icon>
        <Icon id="phone" size={24} color="grey"></Icon> */}
        {/* <Icon id="L" size={24} color="grey"></Icon> */}




<div style={{position: "relative"}}><svg data-icon="DeviceLaptopCutCorner24" aria-hidden="true" focusable="false" width="24" height="24" viewBox="0 0 24 24" className="bem-Svg bem-TopBar_Body_BreakpointButton_Icon bem-TopBar_Body_Button_Icon" style={{display: 'block'}}><path fill-rule="evenodd" clip-rule="evenodd" d="M14.037 3H4a1 1 0 00-1 1v13H0v2a1 1 0 001 1h22a1 1 0 001-1v-2h-3V8.82l-.997-.725-.003.002V17H4V4h10.418a1.445 1.445 0 01-.381-1z" fill="currentColor"></path><path opacity=".6" fill-rule="evenodd" clip-rule="evenodd" d="M15.74 5H5v11h14V8.825l-.874.636c-1.175.855-2.758-.293-2.31-1.676l.717-2.21L15.742 5z" fill="currentColor"></path></svg><svg data-icon="DeviceBase" aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16" className="bem-Svg bem-TopBar_Body_BreakpointButton_Icon bem-TopBar_Body_Button_Icon" style={{display: 'block', position: 'absolute', right: '-4px', top: '-4px', stroke: 'rgb(64, 64, 64)'}}><path d="M9.78 6l-.829-2.553c-.3-.921-1.603-.921-1.902 0L6.219 6H3.54c-.968 0-1.371 1.24-.587 1.81l2.17 1.574-.83 2.556c-.299.921.756 1.687 1.54 1.117l2.171-1.58 2.169 1.576c.783.57 1.838-.196 1.539-1.118l-.828-2.552 2.166-1.574c.784-.57.381-1.809-.588-1.809h-2.68z" fill="currentColor"></path></svg></div>


        <Icon id="toolbar-left" size={24} color="grey"></Icon>
        <Icon id="toolbar-bottom" size={24} color="grey"></Icon>
        <Icon id="toolbar-top" size={24} color="grey"></Icon>
        <Icon id="close" size={20} color="grey"></Icon>
    </div>
);
