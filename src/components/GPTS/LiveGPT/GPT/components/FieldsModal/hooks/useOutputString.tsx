import { useState, useEffect } from "react";
import styles from '../fieldModal.module.scss';
const useOutputString = (data, inputValues, useDefaults) => {
  const [outputString, setOutputString] = useState("");

  const handleFileInputType = (element, inputValues, useDefaults) => {
    const fieldId = element.attributes?.fieldId;
    if (element.fieldInfo[0].inputType === 'file') {
      return `<img src="${useDefaults ? element.fieldInfo[0].value : inputValues[fieldId]}" class="${styles['Field__fileData']}">FileData</img>`;
    }
    return null;
  };

  const handleWebflowInputType = (element, inputValues, useDefaults) => {
    const fieldId = element.attributes?.fieldId;
    const webflowField = element.fieldInfo.find((field) => field.inputType === 'webflow');

    if (webflowField) {
      const defaultValue = 'WebflowData';
      if (!inputValues[fieldId]) {
        setInputValues((prev) => ({ ...prev, [fieldId]: defaultValue }));
      }
      return `<span class="${styles['Field__highlightedInput']}">${inputValues[fieldId] || defaultValue}</span>`;
    }
    return null;
  };

  const handleOtherInputTypes = (element, inputValues, useDefaults) => {
    const fieldId = element.attributes?.fieldId;
    return `<span class="${styles['Field__highlightedInput']}">${useDefaults ? element.textContent : inputValues[fieldId] || ''
      }</span>`;
  };

  const generateElementOutput = (element, inputValues, useDefaults) => {
    if (!element || !element.type) {
      return '';
    }

    switch (element.type) {
      case 'P':
        return element.textContent || '';

      case 'DIV':
        const fileOutput = handleFileInputType(element, inputValues, useDefaults);
        if (fileOutput) {
          return fileOutput;
        }

        const webflowOutput = handleWebflowInputType(element, inputValues, useDefaults);
        if (webflowOutput) {
          return webflowOutput;
        }

        return handleOtherInputTypes(element, inputValues, useDefaults);

      default:
        return '';
    }
  };

  const generateOutputString = (data, inputValues, useDefaults) => {
    return data.map((element) => generateElementOutput(element, inputValues, useDefaults)).join('');
  };

  useEffect(() => {
    setOutputString(generateOutputString(data, inputValues, useDefaults));
  }, [data, inputValues, useDefaults]);

  return outputString;
};

export default useOutputString;