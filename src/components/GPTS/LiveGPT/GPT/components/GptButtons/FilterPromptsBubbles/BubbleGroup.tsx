import QueryBubble from '@src/components/Buttons/RippleButton/QueryBubble';
import QueryGenerator from '@src/Utils/Queries/QueryGenerator';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './filterBubble.module.scss';
import { useRef } from 'react';
import useOnClickOutside from '@src/components/hooks/useOnClickOutside';
import FieldsModal from '../../FieldsModal/fieldsModal-index';
// import MDEditor, { selectWord } from "@uiw/react-md-editor";


const BubbleGroup = ({ handleQuery, accessType }) => {
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
      let templatesPassed;
      if (accessType !== 'currentNode') {
        templatesPassed = await StorageOps.getAllStorageItemsByAccessType(accessType);
      }
      else {
        templatesPassed = await StorageOps.getAllTemplatesForNode(sequenceId);
      }


      console.log('%callNodeTemplates', 'color: orange; font-size: 44px', templatesPassed);
      // console.log(allTemplates, 'allTemplates');
      let activeTemplates = filterActiveTemplates(templatesPassed);
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
          <FieldsModal
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
