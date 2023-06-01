import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import Command from '../../../Command/command-index';
import { useBlob } from '../../../CustomBlock/context/BlobContext';
import { useTemplate } from '../../../CustomBlock/context/TemplateContext';
import useRowManager from '../../hooks/Editor/useRowManager';
import useCursor from '../../hooks/useCursor';
import TextEditorSerializer from './classes/TextEditorSerializer';
import EditableRow from './components/EditableRow';






function RichTextEditor({ editableRowRef, block, handleShowFieldsManager, fields }) {


  const [showCommandMenu, setShowCommandMenu] = useState(false);

  // Template Context
  const {
    getTemplateEditorByBlockId,
  } = useTemplate();

  // handle focus controls
  const {
    setFocusAtEnd
  } = useCursor();

  // handle all row operations and state
  const {
    rowRefs,
    newRow,
    deleteRow,
    clearRowContents,
    handleNewLine,
    handleArrowKeys
  } = useRowManager(getTemplateEditorByBlockId(block.id), block.id);

  // Blob instance that collects all new data
  const {
    parentBlobInstance
  } = useBlob();



  const handleCommand = (e) => {
    // Check if the key pressed is '/' and if the Control key is held down
    if (e.key === '/' && e.ctrlKey) {
      setShowCommandMenu(true);
    }
  };



  const onCommandSelected = (selectedCommand) => {
    selectedCommand();
    setShowCommandMenu(false);
  };


  useEffect(() => {
    if (rowRefs.length > 1 && rowRefs[rowRefs.length - 1].ref.current) {
      setFocusAtEnd(rowRefs[rowRefs.length - 1].ref.current);
    }
  }, [rowRefs]);


  function handleRender() {
    for (let i = 0; i < rowRefs.length; i++) {
      let currentRowRef = rowRefs[i].ref.current;
      if (currentRowRef === null) {
        return;
      }
      console.log(currentRowRef, 'ref');
      console.log(currentRowRef.innerText);
    }
  }

  const handleSerializeLayout = debounce(() => {
    const serializer = new TextEditorSerializer(rowRefs, block.id);
    serializer.print();
    let serializedData = serializer.extractAttributes();

    // console.log('%cserializedData', 'color: lightblue; font-size: 14px', serializedData);

    parentBlobInstance.current.addTemplateEditor(serializedData, block.id);
  }, 200);


  return (
    <>
      {/* <button onClick={handleRender} >Render</button> */}


      {showCommandMenu && (
        <Command
          editableRowRef={editableRowRef}
          onCommandSelected={onCommandSelected}
          status={showCommandMenu}
          onClose={() => setShowCommandMenu(false)}
        />
      )}

      {rowRefs.map((row, rowIndex) => (
        <EditableRow
          menueStatus={showCommandMenu}
          rowIndex={rowIndex}
          handleCommand={handleCommand}
          fields={fields}
          initialData={getTemplateEditorByBlockId(block.id)}
          editableRowRef={editableRowRef}
          rowRef={row.ref}
          block={block}
          newRow={newRow}
          onNewLine={handleNewLine}
          onArrowKeys={handleArrowKeys}
          handleShowFieldsManager={handleShowFieldsManager}
          currentRow={rowIndex === rowRefs.length - 1}
          onBackspace={(event) => deleteRow(rowIndex, event)}
          onClearContents={() => clearRowContents(rowIndex)}
          handleSerializeLayout={handleSerializeLayout}
        />
      ))}
    </>
  );
}

export default RichTextEditor;


export function insertRenderedNodeAtCursorPosition(cursorPosition, selectedElement, rowRef, block, newFieldId) {

  const { setFocusAtEnd } = useCursor();

  if (selectedElement === null) {
    return;
  }

  // If the selected element is not of type element node, return
  if (selectedElement.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  const textNode = selectedElement.firstChild;
  const textContent = textNode ? textNode.textContent : "";

  const textBeforeCursor = textContent.slice(0, cursorPosition);
  const textAfterCursor = textContent.slice(cursorPosition);

  const newTextNodeBefore = document.createTextNode(textBeforeCursor);
  const newTextNodeAfter = document.createTextNode(textAfterCursor);

  if (cursorPosition === 0) {
    const newRow = document.createElement("div");
    newRow.appendChild(selectedElement.cloneNode(true));
    rowRef.insertBefore(newRow, rowRef.firstChild);
    setFocusAtEnd(newRow);
    return newRow;
  }


  const newParagraphBefore = document.createElement('p');
  newParagraphBefore.style.minWidth = '20px';
  newParagraphBefore.style.height = '20px';
  newParagraphBefore.style.paddingRight = '0px';
  newParagraphBefore.style.margin = '0';
  newParagraphBefore.style.display = 'flex';
  newParagraphBefore.style.justifyContent = 'flex-start';
  newParagraphBefore.style.alignItems = 'center';
  newParagraphBefore.style.whiteSpace = 'nowrap';

  newParagraphBefore.style.wordBreak = 'keep-all';

  newParagraphBefore.setAttribute('contenteditable', 'true');


  if (textBeforeCursor.trim() !== "") {
    newParagraphBefore.appendChild(newTextNodeBefore);
  }

  const newParagraphAfter = document.createElement('p');
  newParagraphAfter.style.minWidth = '20px';
  newParagraphAfter.style.height = '20px';

  newParagraphAfter.style.margin = '0';
  newParagraphAfter.style.display = 'flex';
  newParagraphAfter.style.justifyContent = 'flex-start';
  newParagraphAfter.style.alignItems = 'center';
  newParagraphAfter.style.wordBreak = 'keep-all';
  newParagraphAfter.style.whiteSpace = 'nowrap';
  newParagraphAfter.style.paddingRight = '0px';


  newParagraphAfter.setAttribute('contenteditable', 'true');

  if (textAfterCursor.trim() !== "") {
    newParagraphAfter.appendChild(newTextNodeAfter);
  }

  // A container for the React component to be rendered
  const reactComponentContainer = document.createElement('div');
  reactComponentContainer.setAttribute('data-component-type', "formField");
  reactComponentContainer.setAttribute('data-field-id', newFieldId);
  reactComponentContainer.setAttribute('style', 'display: flex; justify-content: center; align-items: center;');
  reactComponentContainer.setAttribute('data-functionality', 'someFunctionality');
  reactComponentContainer.setAttribute('data-inputType', "balagoo");


  try {
    selectedElement.replaceWith(newParagraphBefore);
    newParagraphBefore.insertAdjacentElement('afterend', reactComponentContainer);
    reactComponentContainer.insertAdjacentElement('afterend', newParagraphAfter);
  } catch (e) {
    console.log(e);
    return;
  }


  setFocusAtEnd(newParagraphAfter);

  return reactComponentContainer;


}



