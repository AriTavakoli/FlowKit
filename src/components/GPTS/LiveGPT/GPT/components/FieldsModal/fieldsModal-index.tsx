import useOnClickOutside from "@src/components/hooks/useOnClickOutside";
import { useBlob } from "@src/components/MarkDownEditor/components/CustomBlock/context/BlobContext";
import { useTemplate } from "@src/components/MarkDownEditor/components/CustomBlock/context/TemplateContext";
import React, { useEffect, useRef, useState } from "react";
import QueryBubble from "@src/components/Buttons/RippleButton/QueryBubble";
import styles from './fieldModal.module.scss'
import RippleButton from "@src/components/Buttons/RippleButton/rippleButton-index";
import Icon from "@src/components/IconWrapper/Icon";
import PanelResizer from "@src/components/LiveGPT/PanelResizer/panelResizer-index";
import { useWebflowGptContext } from "@Context/Ai/WebflowGPTProvider";
import { NodeAnalysis } from "../../../classes/NodeAnalysis";

const FieldsModal = ({ data, handleQuery, templateData, setIsVisible, isVisible }) => {
  const [inputValues, setInputValues] = useState({});
  const [previewContent, setPreviewContent] = useState('');
  const [copyIcon, setCopyIcon] = useState('clipboard');

  const {
    currentNodeAnalysisRef
  } = useWebflowGptContext()


  console.log('%cdata', 'color: lightblue; font-size: 14px', data);


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

  useEffect(() => {
    const outputString = data
      .map((element) => {
        if (!element || !element.type) {
          return '';
        }

        switch (element.type) {
          case 'P':
            return element.textContent || '';

          case 'DIV':
            const fieldId = element.attributes?.fieldId;

            // Check for inputType 'webflow' and set value to the corresponding value
            const webflowField = element.fieldInfo.find(
              (field) => field.inputType === 'webflow'
            );

            if (webflowField) {
              // Set the default value for inputType 'webflow'
              const defaultValue = 'WebflowData';
              if (!inputValues[fieldId]) {
                setInputValues((prev) => ({ ...prev, [fieldId]: defaultValue }));
              }
              return `<span class="${styles['Field__highlightedInput']}">${inputValues[fieldId] || defaultValue}</span>`;
            }

            return `<span class="${styles['Field__highlightedInput']}">${inputValues[fieldId] || ''}</span>`;

          default:
            return '';
        }
      })
      .join('');

    setPreviewContent(outputString);
  }, [data, inputValues, styles]);




  const handleResize = (clientX) => {
    const newSize = (clientX / window.innerWidth) * 100;
    setSize(newSize);
  };

  const { bubbleColor, templateName } = templateData;

  const [useDefaults, setUseDefaults] = useState(true);


  const queryModalRef = useRef(null);

  const goButtonRef = useRef(null);

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      goButtonRef.current.click(); // Simulate clicking the go button
    }
  };
  useOnClickOutside(queryModalRef, () => setIsVisible(false));


  const handleInputChange = (fieldId, event) => {
    setInputValues({ ...inputValues, [fieldId]: event.target.value });
    setUseDefaults(false); // Uncheck the checkbox when typing in an input field
  };

  const handleCheckboxChange = (event) => {
    setUseDefaults(event.target.checked);
  };


  useEffect(() => {
    if (isVisible) {
      const input = document.querySelector('input');
      input.focus();
    }


  }, [isVisible]);

  const handleClick = () => {
    const outputString = data
      .map((element) => {
        if (!element || !element.type) {
          return '';
        }

        switch (element.type) {
          case 'P':
            return element.textContent || '';

          case 'DIV':
            const fieldId = element.attributes?.fieldId;

            // Check for inputType 'webflow' and set value to '10'

            const webflowField = element.fieldInfo[0].inputType === 'webflow'
            console.log(webflowField, 'webflowField');

            console.log('%celement.fieldInfo[0].inputTyp', 'color: lightblue; font-size: 14px', element.fieldInfo[0].inputType);


            if (webflowField) {
              // Set the default value for inputType 'webflow'

              console.log('%ccurrentNodeAnalysisRef.current', 'color: lightblue; font-size: 24px', currentNodeAnalysisRef.current);

              const defaultValue = new NodeAnalysis(currentNodeAnalysisRef.current, true).minify()


              if (!inputValues[fieldId]) {
                setInputValues((prev) => ({ ...prev, [fieldId]: defaultValue }));
              }
              return defaultValue;
            }


            return inputValues[fieldId] || '';

          default:
            return '';
        }
      })
      .join('');



    console.log(outputString, 'outputString');
    handleQuery(outputString);
    setIsVisible(false);
  };

  const renderElement = (element) => {

    if (!element || !element.type) {
      return null;
    }

    switch (element.type) {
      // case 'P':
      //   return element.textContent || '';

      case 'DIV':
        const fieldInfo = element.fieldInfo && element.fieldInfo[0];
        const fieldId = element.attributes?.fieldId;

        if (!fieldId || !fieldInfo || !fieldInfo.inputType) {
          return null;
        }

        return (
          <>
            <div className={styles["Field__row"]} >
              <div className={styles["Field__title"]}>
                {element.textContent || ''}
              </div>
              {/* <QueryBubble shape="rounded"
                dot={true}
                dotColor={bubbleColor}
                custom={true}
                customColor={bubbleColor}
                outlineColor={bubbleColor}
                text={element.textContent || ''}
              ></QueryBubble> */}
              <input
                className={styles["Field__input"]}
                key={fieldId}
                type={fieldInfo.inputType}
                placeholder={element.textContent || ''}
                value={inputValues[fieldId] || ''}
                onChange={(event) => handleInputChange(fieldId, event)}
              />
              {fieldInfo.inputType === 'range' && <span>{inputValues[fieldId] || ''}</span>}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  if (!Array.isArray(data)) {
    return null;
  }

  return (
    <div className={styles["Field__container"]} ref={queryModalRef} onKeyDown={handleEnterKey}>


      <div className={styles["Field__columnContainer"]}>


        <div className={styles["Field__fieldManager"]} >
            <div className={styles["Field__checkBox--container"]} >
              <label htmlFor="myCheckbox">Use Default Values</label>
              <input
                type="checkbox"
                id="myCheckbox"
                className={styles["Field__checkBox"]}
                checked={useDefaults} // Set the checkbox state
                onChange={handleCheckboxChange} //event handler for checkbox changes
              />
            </div>

            {data.map(renderElement)}
        </div>


        <div className={styles["Field__preview"]} >
          <span>Query Preview: </span>
          <button className={styles["Field__copyButton"]} onClick={handleCopy}>
            <Icon id={copyIcon} size={16} color="grey"></Icon>
          </button>
          <div dangerouslySetInnerHTML={{ __html: previewContent }}></div>
        </div>





      </div>






      <div className={styles["Field__buttonParent"]}>
        <div className={styles["Launch"]} onClick={handleClick} ref={goButtonRef}>

          <span className={styles["Launch__text"]}>Go</span>

          <RippleButton shape="square " color="grey">
            <Icon id="launch" size={20} color="white"></Icon>
          </RippleButton>
        </div>
      </div>
    </div>

  );
};

export default FieldsModal;










