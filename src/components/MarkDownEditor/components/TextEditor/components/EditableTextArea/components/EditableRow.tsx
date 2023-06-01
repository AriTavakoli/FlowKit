import { useEffect, useImperativeHandle, useState } from 'react';
import { useTemplate } from '../../../../CustomBlock/context/TemplateContext';
import useOverflowHandler from '../../../hooks/Editor/useOverflowHandler';
import useCursor from '../../../hooks/useCursor';
import useRender from '../../../hooks/useRender';
import { useEditableRow } from '../hooks/useEditableRow';
import styles from '../textArea.module.scss';
import InsertedNode from './InsertedNode/InsertedNode';
import VoiceInput from './VoiceInput/VoiceInput-index';
import React from 'react';


type Container = {
  container: HTMLElement;
  fieldId: string;
};


export default function EditableRow({ onArrowKeys, menueStatus, rowIndex, initialData, rowRef, onNewLine, currentRow, onBackspace, editableRowRef, block, newRow, handleShowFieldsManager, handleSerializeLayout, fields, handleCommand }) {

  const [currentCursorPos, setCurrentCursorPos] = useState<number>(0);


  const handleTranscribe = (transcript: string) => {
    if (!rowRef.current) return;

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    if (range) {
      range.deleteContents();
      range.insertNode(document.createTextNode(transcript));
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  const [rootMap, setRootMap] = useState(new Map());

  const {
    getCursorCords,
    handleCursorPosition
  } = useCursor();

  const {
    currentTemplateData,
  } = useTemplate();

  const {
    handleNewChildNodes,
  } = useRender(rowRef);

  const {
    checkForOverflow
  } = useOverflowHandler(rowRef, newRow);


  const {
    containers,
    seedFields,
    deleteField,
    handleAddField,
    isRowOverflowed,
  } = useEditableRow(rowRef, block, handleCursorPosition, menueStatus,);



  useEffect(() => {
    if (containers.length > 1) {
      try {
        for (let i = 0; i < containers.length; i++) {
          let currentContainerObject = containers[i];
          const currentContainerElement = currentContainerObject.container;
          // Find the corresponding field object for the current container
          const fieldObj = fields.find(field => field.id === currentContainerObject.fieldId);
          if (fieldObj) {
            // Extract the attributes (if any) from the field object
            const { name, inputType, value } = fieldObj.value[0];
            currentContainerElement.setAttribute('data-inputType', inputType);
            currentContainerElement.setAttribute('data-value', value);
          }
        }
      } catch (error) {
        // console.log('%cerror', 'color: red; font-size: 14px', error);
      }
    }
  });



  useImperativeHandle(editableRowRef, () => ({
    runItSon(fieldType) {
      handleAddField(fieldType ? fieldType : 'text');
    },
    getCursorPosition() {
      return getCursorCords();
    },

    getBoundingClientRect: () => rowRef.current.getBoundingClientRect(),
  }));



  function logChildren(e, ref) {
    handleCursorPosition();
  }


  // check if the intial data is available and seed the fields with the initial data from TemplateProvider

  useEffect(() => {
    if (initialData && initialData[rowIndex]) {
      seedFields(initialData[rowIndex]);
    }
  }, []);


  useEffect(() => {
    deleteField();
  }, [fields]);

  function handleFocus() {
    // const pElement = rowRef.current.querySelector('p');
    // if (pElement) {
    //   pElement.innerText = "\u00A0";
    //   pElement.classList.remove(styles['commandText']);
    // }

  }

  function handleContentChange(e) {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        break;
      default:
        break;
    }
    switch (e.key) {
      case 'enter':
        if (menueStatus) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;

      default:
        break;
    }

    handleNewChildNodes();
  }

  useEffect(() => {
    handleSerializeLayout();
  });

  return (
    <>

      <div className={styles['editor__container']}>
        <div
          ref={rowRef}
          data-id="row"
          className={styles['editor__row']}
          onClick={(e) => logChildren(e, rowRef)}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onKeyDown={(event) => {

            handleCursorPosition();
            // setRenderTrigger(renderTrigger + 1);
            handleCommand(event);
            if (!menueStatus) {
              onArrowKeys(rowIndex, event);
              onNewLine(rowIndex, event);
            }
            onBackspace(event)
            // checkForOverflow(event, rowRef);
            handleSerializeLayout();
            handleContentChange(event);


          }}

          onFocus={handleFocus}
          onInput={(e) => {
            const { cursorPosition } = handleCursorPosition();
            setCurrentCursorPos(cursorPosition);
            handleContentChange(e);
          }

          }
        >
          {/* {initialData && initialData[rowIndex] ? ( */}
            <p>{'\u00A0'.repeat(1)}</p>
          {/* ) : (
            <p className={styles["commandText"]}>Ctrl + / for command menu</p>
          )} */}
        </div>

        {containers.map(({ container, fieldId }, index) => {

          return (
            <InsertedNode key={fieldId} container={container} currentTemplateData={currentTemplateData} fieldId={fieldId}
              block={block} rootMap={rootMap} handleShowFieldsManager={handleShowFieldsManager} />
          );
        })}
      </div>
    </>
  );
}

