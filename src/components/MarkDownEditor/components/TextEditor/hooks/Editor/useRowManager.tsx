import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import useCursor from '../useCursor';


function useRowManager(inputArray = [], blockId) {
  // Refs to each row of the table
  const initialRows = inputArray && inputArray.length > 0
    ? inputArray.map(() => ({
      // Ref to the row element
      ref: React.createRef(),
      // Components in the row
      components: [],
      // Parent block id
      parentBlock: blockId
    }))
    // If there are no rows, create one row
    : [{ ref: React.createRef(), parentBlock: blockId, id: uuid() }];

  const [rowRefs, setRowRefs] = useState(initialRows ? initialRows : [{ ref: React.createRef(), parentBlock: blockId, id: uuid() }]);


  const {
    setFocusAtEnd
  } = useCursor();

  useEffect(() => {
    console.log(rowRefs);
  }, [rowRefs]);


  // useEffect(() => {
  //   if (rowRefs.length > 1 && rowRefs[rowRefs.length - 1].ref.current) {
  //     setFocusAtEnd(rowRefs[rowRefs.length - 1].ref.current);
  //   }
  // }, [rowRefs]);


  function newRow() {
    if (rowRefs.length === 0) {
      setRowRefs([{ ref: React.createRef(), parentBlock: blockId }]);
    } else {
      const emptyRowIndex = rowRefs.findIndex(isEmptyRow);

      if (emptyRowIndex !== -1) {
        setFocusAtEnd(rowRefs[emptyRowIndex].ref.current);
      } else {
        setRowRefs((prevRows) => {
          const newRow = { ref: React.createRef(), parentBlock: blockId };
          return [...prevRows, newRow];
        });
      }
    }
  }


  function deleteRow(rowIndex, event) {
    const currentRow = rowRefs[rowIndex];
    const rowRef = currentRow.ref;

    // Check if the backspace key is pressed and the current row's content is empty

    if (event.keyCode === 8 && rowRef.current.textContent === "") {
      event.preventDefault();

      // Check if the current row is not the first row
      if (rowIndex !== 0) {
        setRowRefs((prevRows) => prevRows.filter((_, index) => index !== rowIndex));
        // Set the focus to the end of the previous row
        if (rowIndex > 0) {
          setFocusAtEnd(rowRefs[rowIndex - 1].ref.current);
        }
      }
    }
  }

  function isEmptyRow(row) {
    const rowRef = row.ref.current;
    return rowRef && rowRef.textContent === "";
  }

  function clearRowContents(rowIndex) {
    const rowRef = rowRefs[rowIndex].ref;
    if (rowRef.current) {
      rowRef.current.innerHTML = "";
    }
  }

  // function insertNewLineAfter(rowIndex) {
  //   setRowRefs((prevRows) => {
  //     const newRow = { ref: React.createRef(), parentBlock: blockId, id: uuid() };
  //     return [
  //       ...prevRows.slice(0, rowIndex + 1),
  //       newRow,
  //       ...prevRows.slice(rowIndex + 1),
  //     ];
  //   });
  //   // Wait for the new row to be rendered, then set the focus to the new row
  //   setTimeout(() => {
  //     setFocusAtEnd(rowRefs[rowIndex + 1].ref.current);
  //   }, 10);
  // }


  function handleNewLine(rowIndex, event) {
    if (event.keyCode === 13 || event.which === 13) {
      event.preventDefault();

      const newRow = {
        ref: React.createRef(),
        parentBlock: blockId,
        id: uuid(),
      };

      setRowRefs((prevRows) => {
        return [
          ...prevRows.slice(0, rowIndex + 1),
          newRow,
          ...prevRows.slice(rowIndex + 1),
        ];
      });

      // Wait for the new row to be rendered, then set the focus to the new row
      setTimeout(() => {
        setFocusAtEnd(newRow.ref.current);
        newRow.ref.current.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

      }, 10);
    }
  }


  function handleArrowKeys(rowIndex, event) {
    const isUpArrow = event.keyCode === 38 || event.which === 38;
    const isDownArrow = event.keyCode === 40 || event.which === 40;

    if (isUpArrow || isDownArrow) {
      event.preventDefault();

      let newRowToFocus;

      if (isUpArrow && rowIndex > 0) {
        newRowToFocus = rowIndex - 1;
      } else if (isDownArrow && rowIndex < rowRefs.length - 1) {
        newRowToFocus = rowIndex + 1;
      } else {
        return;
      }

      setFocusAtEnd(rowRefs[newRowToFocus].ref.current);
    }
  }


  return {
    rowRefs,
    newRow,
    deleteRow,
    clearRowContents,
    setRowRefs,
    handleNewLine,
    // insertNewLineAfter,
    handleArrowKeys
  };
}

export default useRowManager;
