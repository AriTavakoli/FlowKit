import '@Global/index.scss';
import QueryBubble from '@src/components/Buttons/RippleButton/QueryBubble';
import QueryGenerator from '@src/Utils/Queries/QueryGenerator';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './filterBubble.module.scss';
import { useRef } from 'react';
import useOnClickOutside from '@src/components/hooks/useOnClickOutside';

// import MDEditor, { selectWord } from "@uiw/react-md-editor";


const BubbleGroup = ({ handleQuery }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);

  const [storageUpdate, setStorageUpdate] = useState(0);
  const [currentTemplateButtons, setCurrentTemplateButtons] = useState([]);

  const [selectedBubbleData, setSelectedBubbleData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = useCallback((index, data) => {
    console.log("index", index);

    // Toggle the visibility state of the bubble
    if (selectedButtonIndex === index) {
      setIsVisible(!isVisible);
    } else {
      setIsVisible(true);
    }

    setSelectedButtonIndex(index);
    setSelectedBubbleData(data);
  }, [selectedButtonIndex, isVisible]);

  useEffect(() => {
    (async () => {
      let allTemplates = await StorageOps.getAllStorageItemsByAccessType('template')
      // console.log(allTemplates, 'allTemplates');
      let activeTemplates = filterActiveTemplates(allTemplates);
      setCurrentTemplateButtons(activeTemplates);

    })();

  }, [storageUpdate]);


  useEffect(() => {
    (async () => {
      let watchDog = await StorageOps.watchForStorageUpdate();
      if (watchDog === 'updated') {
        setStorageUpdate((s) => s + 1);
      }
    })();
  });


  // useEffect(() => {
  //   console.log(currentTemplateButtons, 'currentTemplateButtons');
  // }, [currentTemplateButtons]);


  const dataMapped = currentTemplateButtons.map((data, index) => {

    const { bubbleColor, templateName, } = data;


    const finalQuery = new QueryGenerator(data).generateQuery();

    return (
      <>
        {/* Pass selectedBubbleData to CustomComponent */}
        {selectedButtonIndex === index && isVisible && (
          <CustomComponent
            data={selectedBubbleData}
            templateData={data}
            handleQuery={handleQuery}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />
        )}
        <div
          onClick={() => {
            handleClick(index, finalQuery);
            // handleQuery(finalQuery);
          }}
        >
          <QueryBubble
            shape="rounded"
            dot={true}
            dotColor={bubbleColor}
            customColor={bubbleColor}
            outlineColor={bubbleColor}
            text={templateName}
            selected={selectedButtonIndex === index}
          />
        </div>
      </>
    );
  });




  return (

    <div className={styles['container']}>
      {dataMapped}
    </div>
  );
};

export default BubbleGroup;




function filterActiveTemplates(templates: Object) {
  const result = [];

  for (const key in templates) {
    if (templates.hasOwnProperty(key) && templates[key].active) {
      result.push(templates[key]);
    }
  }

  return result;
}


const CustomComponent = ({ data, handleQuery, templateData, setIsVisible, isVisible }) => {
  const [inputValues, setInputValues] = useState({});

  const { bubbleColor, templateName } = templateData;

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
            <div className="Field__buttonContainer" >
              <QueryBubble shape="rounded"
                dot={true}
                dotColor={bubbleColor}
                custom={true}
                customColor={bubbleColor}
                outlineColor={bubbleColor}
                text={element.textContent || ''}
              ></QueryBubble>
              <input
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
    <div className="Field__container" ref={queryModalRef} onKeyDown={handleEnterKey}>
      <div style={{ cursor: 'pointer' }}>
        {data.map(renderElement)}
        <div onClick={handleClick} ref={goButtonRef}>  go</div>
      </div>
    </div>

  );
};