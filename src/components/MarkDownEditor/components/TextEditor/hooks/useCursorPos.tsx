import { useState, useEffect } from 'react';

function useCursorPosition(elementRef) {
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedElement , setSelectedElement] = useState(null);

  useEffect(() => {
    function handleCursorPosition() {
      const selection = window.getSelection();
      const cursorPosition = selection.focusOffset;
      console.log('Cursor position:', cursorPosition);

      const selectedElement = selection.focusNode.parentNode;
      setSelectedElement(selectedElement);
      console.log('Selected element:', selectedElement);
      console.log('Element bounding rect:', selectedElement.getBoundingClientRect());
    }

    const element = elementRef.current;

    // element.addEventListener('mouseup', handleCursorPosition);
    // element.addEventListener('keyup', handleCursorPosition);

    return () => {
      element.removeEventListener('mouseup', handleCursorPosition);
      element.removeEventListener('keyup', handleCursorPosition);
    };
  }, [elementRef]);

  return {cursorPosition, selectedElement }
}

export default useCursorPosition;
