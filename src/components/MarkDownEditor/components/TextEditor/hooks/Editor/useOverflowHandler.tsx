import { useCallback, useState, useEffect } from 'react';

function useOverflowHandler(initialRowRef, onNewRow) {
  const [rowRef, setRowRef] = useState(initialRowRef);

  const checkForOverflow = useCallback(
    (event, ref) => {
      if (
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.keyCode === 8 ||
        event.keyCode === 46 ||
        (event.ctrlKey && event.keyCode === 88)
      ) {
        return;
      }

      let totalWidth = 0;
      const children = ref.current.children;
      const rowRect = ref.current.getBoundingClientRect();

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const childClientRect = child.getBoundingClientRect();
        totalWidth += childClientRect.width;
      }

      if (totalWidth >= rowRect.width - 60) {
        // onNewRow();
      }
    },
    [onNewRow]
  );

  useEffect(() => {
    setRowRef(initialRowRef);
  }, [initialRowRef]);

  return {
    rowRef,
    checkForOverflow,
  };
}

export default useOverflowHandler;
