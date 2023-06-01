import styles from "./DropDown.module.scss";
import React from 'react'
export interface DropDownProps {
  children: React.ReactNode;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export const DropDown = ({ children }: DropDownProps) => {
  return <div className={styles['dropdown']} >{children}</div>;

};
