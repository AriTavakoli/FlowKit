import React from 'react';

function useCursor() {
  function setFocusAtEnd(element) {
    if (!element || typeof element.focus !== 'function') {
      return;
    }

    try {
      const selection = window.getSelection();
      if (!selection) {
        return;
      }
      const range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      element.focus();
    } catch (error) {
      console.error('Error setting focus at the end:', error);
    }
  }

  function handleCursorPosition() {
    try {
      const selection = window.getSelection();
      if (!selection) {
        return null;
      }

      const cursorPosition = selection.focusOffset;
      const selectedElement = selection.focusNode?.parentNode;

      if (selectedElement && selectedElement.hasAttribute('row')) {
        console.log('%c HAS DATA ATTRIBUTE', 'color: lightblue; font-size: 14px');
      }

      return {
        cursorPosition,
        selectedElement,
      };
    } catch (error) {
      console.error('Error handling cursor position:', error);
      return null;
    }
  }

  function getCursorCords() {
    try {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        return { x: 0, y: 0 };
      }

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const x = rect.x + window.pageXOffset;
      const y = rect.y + window.pageYOffset;

      return { x, y };
    } catch (error) {
      console.error('Error getting cursor coordinates:', error);
      return { x: 0, y: 0 };
    }
  }

  return { setFocusAtEnd, handleCursorPosition, getCursorCords };
}

export default useCursor;
