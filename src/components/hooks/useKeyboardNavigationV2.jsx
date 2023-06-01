import { useEffect } from 'react';

const useKeyboardNavigationV2 = (filteredResults, currentRowIndex, setCurrentRowIndex, dropdownRef, max) => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!Array.isArray(filteredResults)) {
            setCurrentRowIndex((currentRowIndex + 1) % max);
          } else {
            setCurrentRowIndex((currentRowIndex + 1) % max);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!Array.isArray(filteredResults)) {
            setCurrentRowIndex((currentRowIndex + max - 1) % max);
          } else {
            setCurrentRowIndex((currentRowIndex + max - 1) % max);
          }
          break;
        case 'Enter':
          const rows = dropdownRef.current.querySelectorAll('.dropdown-row');
          const className = rows[currentRowIndex].innerText;
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredResults, currentRowIndex, setCurrentRowIndex, max]);



  useEffect(() => {
    console.log('currentRowIndex', currentRowIndex);
  }, [currentRowIndex]);





};

export default useKeyboardNavigationV2;
