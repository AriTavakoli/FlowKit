import { useEffect, useState } from 'react';
import { useTemplateDispatch } from '../../../../CustomBlock/context/TemplateContext';
import { v4 as uuid } from 'uuid';
import { insertRenderedNodeAtCursorPosition } from '../RichTextArea';

type Container = {
  container: HTMLElement;
  fieldId: string;
};

export function useEditableRow(rowRef, block, handleCursorPosition, menuStatus,) {
  const dispatch = useTemplateDispatch();
  const [containers, setContainers] = useState<Container[]>([]);

  const [currentCursorPos, setCurrentCursorPos] = useState<number>(0);
  const [preservedCursorPos, setPreservedCursorPos] = useState<number>(0);

  const [currentSelectedElement, setCurrentSelectedElement] = useState<HTMLElement | null>(null);
  const [preservedSelectedElement, setPreservedSelectedElement] = useState<HTMLElement | null>(null);


  useEffect(() => {
    if (menuStatus) {
      setPreservedCursorPos(currentCursorPos);
      setPreservedSelectedElement(currentSelectedElement);
    }
  }, [menuStatus]);


  // useEffect(() => {
  //   console.log('%ccurrentRow', 'color: lightblue; font-size: 14px', rowIndex);
  //   console.log('%cCursorPos', 'color: lightblue; font-size: 14px', currentCursorPos);
  //   console.log('%cSelectedElement', 'color: lightblue; font-size: 14px', currentSelectedElement);
  // }, [currentCursorPos, currentSelectedElement]);



  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);
  function handleSelectionChange() {
    const { cursorPosition, selectedElement } = handleCursorPosition();
    setCurrentCursorPos(cursorPosition);
    setCurrentSelectedElement(selectedElement);
  }



  useEffect(() => {
    deleteField();
  });




  function handleAddField(inputType) {
    if (isRowOverflowed(rowRef)) {
      return;
    }

    const newFieldId = uuid();
    const cursorInfo = handleCursorPosition();

    let selectedElement = menuStatus ? preservedSelectedElement : cursorInfo.selectedElement;
    selectedElement = getClosestPElement(selectedElement);
    const cursorPosition = menuStatus ? preservedCursorPos : cursorInfo.cursorPosition;

    if (selectedElement) {
      const container = insertRenderedNodeAtCursorPosition(cursorPosition, selectedElement, rowRef, block, newFieldId);

      // Check if the container already exists in the containers state
      const containerExists = containers.some((cont) => cont.fieldId === newFieldId);

      // If the container does not already exist, update the containers state and dispatch the ADD_FIELD action
      if (!containerExists) {
        setContainers((prevContainers) => [...prevContainers, { container: container, fieldId: newFieldId }]);
        dispatch({ type: 'ADD_FIELD', payload: { fieldId: newFieldId, blockId: block.id, inputType: inputType ? inputType : 'text' } });
      }
    } else {
      return null;
    }
  }


  function getClosestPElement(element) {
    while (element) {
      if (element.nodeName === 'P') {
        return element;
      }
      element = element.parentElement;
    }
    return null;
  }




  function deleteField() {
    const updatedContainers = containers.filter((container) => document.body.contains(container.container));

    // If there's any change, update the state and dispatch the DELETE_FIELD action
    if (updatedContainers.length !== containers.length) {
      const removedContainers = containers.filter((container) => !document.body.contains(container.container));
      removedContainers.forEach(({ fieldId }) => {
        dispatch({ type: 'DELETE_FIELD', payload: { fieldId: fieldId, blockId: block.id } });
      });
      setContainers(updatedContainers);
    }
  }



  function seedFields(data) {
    if (!data) return;

    const dataArray = Object.values(data);

    dataArray.forEach((element) => {
      const newElement = document.createElement(element.type);

      if (element.type === 'DIV' && element.attributes.componentType === 'formField') {
        const elementAttributes = element.attributes;
        const { fieldId, componentType, inputtype, name, value } = elementAttributes;

        newElement.setAttribute('data-field-id', fieldId);
        newElement.setAttribute('data-component-type', componentType);
        newElement.setAttribute('data-inputtype', inputtype);

        setContainers((prevContainers) => [
          ...prevContainers,
          { container: newElement, fieldId: fieldId },
        ]);

      } else if (element.type === 'P') {
        newElement.textContent = element.textContent || '\u00A0';
      }

      // if (element.attributes) {
      //   Object.entries(element.attributes).forEach(([key, value]) => {
      //     newElement.setAttribute(key, value);
      //   });
      // }
      // Append the new element to the row
      rowRef.current.appendChild(newElement);
    });
  }

  function isRowOverflowed(ref) {
  let totalWidth = 0;
    const children = ref.current.children;
    const rowRect = ref.current.getBoundingClientRect();
    const elementSizes = [];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childClientRect = child.getBoundingClientRect();

      totalWidth += childClientRect.width;

      const elementSize = {
        element: child,
        width: childClientRect.width,
        height: childClientRect.height
      };
      elementSizes.push(elementSize);
    }

    // console.log('Total Width:', totalWidth);
    // console.log('Row Width:', rowRect.width);
    // console.log('Available Width:', rowRect.width - 100);
    // console.log('Element Sizes:', elementSizes);

    return totalWidth >= rowRect.width - 100;
  }



  return {
    seedFields,
    containers,
    deleteField,
    handleAddField,
    isRowOverflowed,
  };
}
