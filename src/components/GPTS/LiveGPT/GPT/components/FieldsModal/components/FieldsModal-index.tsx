import React, { useEffect, useRef } from 'react';
import { useFieldsModalContext, FieldsModalProvider } from '../Context/FieldsModalContext';
import TextInput from './TextInput';
import FileInput from './FileInput';
import styles from '../fieldModal.module.scss';

const FieldsModal = (/*...props*/) => {
  const {
    inputValues,
    setInputValues,
    useDefaults,
    setUseDefaults,
  } = useFieldsModalContext();

  // Other existing constants and functions

  const renderElement = (element) => {
    if (!element || !element.type) {
      return null;
    }

    const fieldInfo = element.fieldInfo && element.fieldInfo[0];
    const fieldId = element.attributes?.fieldId;

    if (!fieldId || !fieldInfo || !fieldInfo.inputType) {
      return null;
    } const commonProps = {
      fieldId,
      title: element.textContent || '',
    };

    switch (fieldInfo.inputType) {
      case 'text':
        return (
          <TextInput
            {...commonProps}
            value={inputValues[fieldId] || ''}
            onChange={(event) => handleInputChange(fieldId, element.textContent, event)}
          />
        );

      case 'file':
        return (
          <FileInput
            {...commonProps}
            onChange={(event) => handleFileInputChange(fieldId, event)}
          />
        );

      // Add more input types here if needed

      default:
        return null;
    }
  };

  // if (!Array.isArray(data)) {
  //   return null;
  // }

  return (
    <div className={styles["Field__container"]} ref={queryModalRef} onKeyDown={handleEnterKey}>
      {/* Rest of the JSX structure */}
    </div>
  );
};

const WrappedFieldsModal = (props) => (
  <FieldsModalProvider>
    <FieldsModal {...props} />
  </FieldsModalProvider>
);

export default WrappedFieldsModal;


