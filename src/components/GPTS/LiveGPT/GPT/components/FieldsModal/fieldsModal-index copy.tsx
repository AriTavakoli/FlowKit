import { useWebflowGptContext } from "@Context/Ai/WebflowGPTProvider";
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import Icon from "@src/components/IconWrapper/Icon";
import useOnClickOutside from "@src/components/hooks/useOnClickOutside";
import React, { useEffect, useRef, useState } from "react";
import styles from './fieldModal.module.scss';
import { NodeAnalysis } from "@src/components/LiveGPT/classes/NodeAnalysis";

const FieldsModal = ({ data, handleQuery, templateData, setIsVisible, isVisible }) => {
  const [inputValues, setInputValues] = useState({});
  const [previewContent, setPreviewContent] = useState('');
  const [copyIcon, setCopyIcon] = useState('clipboard');

  const {
    currentNodeAnalysisRef
  } = useWebflowGptContext()

  const [useDefaults, setUseDefaults] = useState(true);

  const queryModalRef = useRef(null);
  const [fileContent, setFileContent] = useState(''); //

  const goButtonRef = useRef(null);

  useOnClickOutside(queryModalRef, () => setIsVisible(false));

  useEffect(() => {
    const outputString = generateOutputString(data, inputValues, useDefaults);
    setPreviewContent(outputString);
  }, [data, inputValues, styles, useDefaults]);


  useEffect(() => {
    if (isVisible) {
      const input = document.querySelector('input');
      input.focus();
    }

  }, [isVisible]);



  const generateOutputString = (data, inputValues, useDefaults) => {
    return data.map((element) => generateElementOutput(element, inputValues, useDefaults)).join('');
  };

  const generateElementOutput = (element, inputValues, useDefaults) => {
    if (!element || !element.type) {
      return '';
    }

    switch (element.type) {
      case 'P':
        return handlePTypeOutput(element);

      case 'DIV':
        return handleDivTypeOutput(element, inputValues, useDefaults);

      default:
        return '';
    }
  };

  // handlers

  const handlePTypeOutput = (element) => {
    return element.textContent || '';
  };



  // const handleDivTypeOutput = (element, inputValues, useDefaults) => {
  //   const fieldId = element.attributes?.fieldId;


  //   if (element.fieldInfo[0].inputType === 'file') {
  //     const base64String = getBase64StringForFile(fieldId);
  //     const src = base64String || (useDefaults ? element.fieldInfo[0].value : inputValues[fieldId] || '');

  //     console.log('%celement.fieldInfo[0].fileType', 'color: lightblue; font-size: 14px', element.fieldInfo[0].inputType);

  //     //if its csv file
  //     if (element.fieldInfo[0].inputType === 'text/csv') {
  //       console.log('FUCKKKKKKKKKKKKK');
  //       return handleCsvPreview(src);
  //     }

  //     if (element.fieldInfo[0].inputType === 'image/jpeg' || element.fieldInfo[0].fileType === 'image/png') {
  //       return `<div style="display: flex; flex-direction: column; align-items: center; padding: 8px;"><img src="${src}" alt="${element.fieldInfo[0].label}" class="${styles['Field__fileData']}"/></div>`;
  //     }

  //     if (element.fieldInfo[0].inputType === 'application/pdf') {
  //       return `<div style="display: flex; flex-direction: column; align-items: center; padding: 8px;"><img src="${src}" alt="${element.fieldInfo[0].label}" class="${styles['Field__fileData']}"/></div>`;
  //     }


  //     if (element.fieldInfo[0].inputType === 'text/plain') {
  //       return `<div style="display: flex; flex-direction: column; align-items: center; padding: 8px;"><img src="${src}" alt="${element.fieldInfo[0].label}" class="${styles['Field__fileData']}"/></div>`;
  //     }


  //     return `<div style="display: flex; flex-direction: column; align-items: center; padding: 8px;"><img src="${src}" alt="${element.fieldInfo[0].label}" class="${styles['Field__fileData']}"/></div>`;
  //   }

  //   const webflowField = element.fieldInfo.find((field) => field.inputType === 'webflow');
  //   if (webflowField) {
  //     return inputValues[fieldId] || '';
  //   }

  //   return useDefaults ? element.textContent : inputValues[fieldId] || '';
  // };



  const handleDivTypeOutput = (element, inputValues, useDefaults) => {
    const fieldId = element.attributes?.fieldId;

    console.log('%celement.fieldInfo[0].inputType', 'color: lightblue; font-size: 14px',);

    console.log('%celement.fieldInfo[0].inputType', 'color: lightblue; font-size: 14px',);

    const webflowField = element.fieldInfo[0].inputType;
    if (webflowField === 'webflow') {
      // Set the default value for inputType 'webflow'
      const defaultValue = 'WebflowData';
      if (!inputValues[fieldId]) {
        setInputValues((prev) => ({ ...prev, [fieldId]: defaultValue }));
      }
      return `<span class="${styles['Field__highlightedInput']}">${inputValues[fieldId] || defaultValue}</span>`;
    }

    if (element.fieldInfo[0].inputType === 'file') {
      const base64String = getBase64StringForFile(fieldId);
      const src = base64String || (useDefaults ? element.fieldInfo[0].value : inputValues[fieldId] || '');

      let fileType = '';
      console.log('%celement.fieldInfo[0].inputType', 'color: lightblue; font-size: 14px',);



      switch (true) {
        case src.startsWith('data:image/jpeg'):
          fileType = 'image/jpeg';
          break;
        case src.startsWith('data:image/png'):
          fileType = 'image/png';
          break;
        case src.startsWith('data:application/pdf'):
          fileType = 'application/pdf';
          break;
        case src.startsWith('data:text/plain'):
          fileType = 'text/plain';
          break;
        case src.startsWith('data:text/csv'):
          fileType = 'text/csv';
          break;
        default:
          fileType = '';
      }

      // Render the file preview based on its type
      switch (fileType) {
        case 'webflow':
        case 'image/jpeg':
          return `<div style="display: flex; flex-direction: column; align-items: center; padding: 8px;"><img src="${src}" alt="${element.fieldInfo[0].label}" class="${styles['Field__fileData']}"/></div>`;
        case 'image/png':
          return `<div style="display: flex; flex-direction: column; align-items: center; padding: 8px;"><img src="${src}" alt="${element.fieldInfo[0].label}" class="${styles['Field__fileData']}"/></div>`;
        case 'application/pdf':
        case 'text/plain':
        case 'text/csv':
          return handleCsvPreview(src);
        default:
          return '';
      }
    }


    return useDefaults ? element.textContent : inputValues[fieldId] || '';
  };


  function handleWebflowPt2() {
    const defaultValue = 'WebflowData';
    if (!inputValues[fieldId]) {
      setInputValues((prev) => ({ ...prev, [fieldId]: defaultValue }));
    }
    return `<span class="${styles['Field__highlightedInput']}">${inputValues[fieldId] || defaultValue}</span>`;

  }



  const handleFileInputType = (element, inputValues, useDefaults) => {
    if (!element || typeof inputValues !== 'object' || typeof useDefaults !== 'boolean') {
      return null;
    }

    const fieldId = element.attributes?.fieldId;

    if (element.fieldInfo[0].inputType === 'file') {
      const fileInput = document.querySelector(`input[data-field-id="${fieldId}"]`);
      if (fileInput && fileInput.files[0]) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const fileContent = reader.result;
          const previewContent = handlePreview(fileContent, element.fieldInfo[0].fileType);
          setPreviewContent(previewContent);
        };
        reader.readAsDataURL(file);
        return inputValues[fieldId] || '';
      } else {
        return (
          `
          <div style="display: flex; flex-direction: column; align-items: center; padding: 8px;">
            <img src="${useDefaults ? element.fieldInfo[0].value : inputValues[fieldId]}" class="${styles['Field__fileData']}"></img>
          </div>
          `
        );
      }
    }
    return null;
  };

  const getBase64StringForFile = (fieldId) => {
    const fileInput = document.querySelector(`input[data-field-id="${fieldId}"]`);
    if (fileInput && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      let base64String = '';
      reader.onloadend = () => {
        base64String = reader.result;
      };
      reader.readAsDataURL(file);
      return base64String;
    }
    return '';
  };

  const handlePreview = (fileContent, fileType) => {
    switch (fileType) {
      case 'image/jpeg':

      case 'image/png':
        return `<img src="${fileContent}" class="${styles['Field__fileData']}" />`;
      case 'text/csv':
        return handleCsvPreview(fileContent);
      default:
        return '';
    }
  };


  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      goButtonRef.current.click(); // Simulate clicking the go button
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(previewContent)
      .then(() => {
        console.log('Preview content copied to clipboard.');
        setCopyIcon('check');
        setTimeout(() => {
          setCopyIcon('clipboard');
        }, 1500);
      })
      .catch((err) => {
        console.error('Failed to copy preview content: ', err);
      });
  };



  const handleWebflowInputType = () => {
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

  const handleCsvPreview = (file, numRows = 5) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const lines = reader.result.split('\n');
      const tableRows = lines.slice(0, numRows + 1).map((line, index) => {
        const rowValues = line.split(',').map((value) => `<td>${value}</td>`).join('');
        if (index === 0) {
          return `<tr>${rowValues.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')}</tr>`;
        }
        return `<tr>${rowValues}</tr>`;
      }).join('');

      const previewContent = `<div style="display: block;"><table class="${styles['Field__table']}">${tableRows}</table></div>`;
      setPreviewContent(previewContent);
    };
    reader.readAsText(file);
  };



  const handleOtherInputTypes = (element, inputValues, useDefaults) => {
    const fieldId = element.attributes?.fieldId;
    return `<span class="${styles['Field__highlightedInput']}">${inputValues[fieldId] ? inputValues[fieldId] : element.textContent
      }</span>`;
  };


  const handleInputChange = (fieldId, originalValue, event) => {
    setInputValues({ ...inputValues, [fieldId]: event.target.value });
    setUseDefaults(false); // Uncheck the checkbox when typing in an input field
  };

  const handleCheckboxChange = (event) => {
    setUseDefaults(event.target.checked);
  };

  const handleClick = () => {
    try {
      const outputString = generateOutputString(data, inputValues, useDefaults);
      console.log(outputString, 'outputString');
      handleQuery(outputString);
      setIsVisible(false);
    } catch (error) {
      console.error('Error in handleClick function:', error);
    }
  };

  const handleFileInputChange = (fieldId, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setInputValues({ ...inputValues, [fieldId]: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
      setUseDefaults(false); // Uncheck the checkbox when a file is selected
    } else {
      setInputValues({ ...inputValues, [fieldId]: fieldInfo[0].value }); // Set the default value when the input is cleared
    }
  };


  //  Render Section


  const renderFileInputField = (element, fieldId, fieldInfo) => {
    return (
      <>
        <div className={styles["Field__row"]}>
          <div className={styles["Field__title"]}>{element.textContent || ''}</div>
          <input
            className={styles["Field__input"]}
            key={fieldId}
            type={fieldInfo.inputType}
            data-field-id={fieldId} // Add this attribute
            onChange={(event) => handleFileInputChange(fieldId, event)}
          />
        </div>
      </>
    );
  };

  const renderOtherInputField = (element, fieldId, fieldInfo) => {
    return (
      <>
        <div className={styles["Field__row"]}>
          <div className={styles["Field__title"]}>{element.textContent || ''}</div>
          <input
            className={styles["Field__input"]}
            key={fieldId}
            type={fieldInfo.inputType}
            placeholder={element.textContent || ''}
            value={inputValues[fieldId] || ''}
            onChange={(event) => handleInputChange(fieldId, element.textContent, event)}
          />
          {fieldInfo.inputType === 'range' && <span>{inputValues[fieldId]?.value || ''}</span>}
        </div>
      </>
    );
  };


  const renderElement = (element) => {
    if (!element || !element.type) {
      return null;
    }

    const fieldInfo = element.fieldInfo && element.fieldInfo[0];
    const fieldId = element.attributes?.fieldId;

    if (!fieldId || !fieldInfo || !fieldInfo.inputType) {
      return null;
    }

    switch (element.type) {
      case 'DIV':

        switch (fieldInfo.inputType) {
          case 'file':
            return renderFileInputField(element, fieldId, fieldInfo);
          default:
            return renderOtherInputField(element, fieldId, fieldInfo);
        }
      default:
        return null;
    }
  };


  if (!Array.isArray(data)) {
    return null;
  }


  const {
    Field__checkBox,
    Field__checkBox_container,
    Field__columnContainer,
    Field__container,
    Field__fieldManager,
    Field__buttonParent,
  } = styles;

  return (
    <div className={Field__container} ref={queryModalRef} onKeyDown={handleEnterKey}>
      <div className={Field__columnContainer}>
        <div className={Field__fieldManager}>
          <div className={Field__checkBox_container}>
            <label htmlFor="myCheckbox">Use Default Values</label>
            <input
              type="checkbox"
              id="myCheckbox"
              className={Field__checkBox}
              checked={useDefaults}
              onChange={handleCheckboxChange}
            />
          </div>
          {data.map(renderElement)}
        </div>
        <QueryPreview onClick={handleCopy} copyIcon={copyIcon} previewContent={previewContent} />
      </div>
      <div className={Field__buttonParent}>
        <LaunchButton onClick={handleClick} goButtonRef={goButtonRef} />
      </div>
    </div>
  );

};

export default FieldsModal;



function QueryPreview({ onClick, copyIcon, previewContent }) {
  const { Field__copyButton, Field__preview } = styles;
  return (
    <div className={Field__preview}>
      <span>Query Preview: </span>
      <button className={Field__copyButton} onClick={onClick}>
        <Icon id={copyIcon} size={16} color="grey"></Icon>
      </button>
      <div dangerouslySetInnerHTML={{ __html: previewContent }}></div>
    </div>
  );
};

function LaunchButton({ onClick, goButtonRef }) {
  const { Launch, Launch__text } = styles;
  return (
    <div className={Launch} onClick={onClick} ref={goButtonRef}>
      <span className={Launch__text}>Go</span>
      <RippleButton shape="square" color="grey">
        <Icon id="launch" size={20} color="white"></Icon>
      </RippleButton>
    </div>
  );
};








