import React from 'react';
import styles from '../fieldModal.module.scss';

const TextInput = ({ fieldId, title, value, onChange }) => (
  <div className={styles["Field__row"]}>
    <div className={styles["Field__title"]}>{title}</div>
    <input
      className={styles["Field__input"]}
      key={fieldId}
      type="text"
      placeholder={title}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextInput;
