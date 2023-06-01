import React from 'react';
import styles from '../fieldModal.module.scss';

const FileInput = ({ fieldId, title, onChange }) => (
  <div className={styles["Field__row"]}>
    <div className={styles["Field__title"]}>{title}</div>
    <input
      className={styles["Field__input"]}
      key={fieldId}
      type="file"
      onChange={onChange}
    />
  </div>
);

export default FileInput;
