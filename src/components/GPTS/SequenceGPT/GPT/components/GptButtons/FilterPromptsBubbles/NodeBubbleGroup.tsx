import QueryBubble from '@src/components/Buttons/RippleButton/QueryBubble';
import QueryGenerator from '@src/Utils/Queries/QueryGenerator';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './filterBubble.module.scss';
import { useRef } from 'react';
import useOnClickOutside from '@src/components/hooks/useOnClickOutside';
import SequenceFieldsModal from '../../FieldsModal/SequenceFieldsModal';
import NodeTemplateStorage from '@src/components/Sequence/classes/NodeTemplateStorage';
import FieldsModal from '@src/components/GPTS/LiveGPT/GPT/components/FieldsModal/fieldsModal-index';
// import MDEditor, { selectWord } from "@uiw/react-md-editor";


const NodeBubbleGroup = ({ handleQuery, accessType, sequenceRef }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);

  const [storageUpdate, setStorageUpdate] = useState(0);
  const [currentTemplateButtons, setCurrentTemplateButtons] = useState([]);

  const [selectedBubbleData, setSelectedBubbleData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);



  const handleClick = useCallback((index, data) => {

    // Toggle the visibility state of the bubble
    if (selectedButtonIndex === index) {
      setIsVisible(!isVisible);
    } else {
      setIsVisible(true);
    }

    setSelectedButtonIndex(index);
    setSelectedBubbleData(data);
  }, [selectedButtonIndex, isVisible]);
  let sequenceId = sequenceRef ? sequenceRef.getId() : null;



  useEffect(() => {
    (async () => {
      let templatesPassed;

      if (accessType !== 'currentNode') {
        templatesPassed = await StorageOps.getAllStorageItemsByAccessType(accessType);
      }
      else {
        templatesPassed = await StorageOps.getAllTemplatesForNode(sequenceId);
      }

      let activeTemplates = filterActiveTemplates(templatesPassed);
      setCurrentTemplateButtons(activeTemplates);

    })();

  }, [storageUpdate,accessType]);


  useEffect(() => {
    (async () => {
      let watchDog = await StorageOps.watchForStorageUpdate();
      if (watchDog === 'updated') {
        setStorageUpdate((s) => s + 1);
      }
    })();
  });




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
            sequenceRef={sequenceRef}
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

export default NodeBubbleGroup;




function filterActiveTemplates(templates: Object) {
  const result = [];

  for (const key in templates) {
    if (templates.hasOwnProperty(key) && templates[key].active) {
      result.push(templates[key]);
    }
  }

  return result;
}
