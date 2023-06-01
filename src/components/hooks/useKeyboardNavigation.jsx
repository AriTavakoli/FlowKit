import { useEffect } from 'react';

const useKeyboardNavigation = (filteredResults, currentRowIndex, setCurrentRowIndex, dropdownRef) => {
  useEffect(() => {
    // console.log(filteredResults.length, 'filteredResults.length');

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowDown':
          console.log(currentRowIndex, 'currentRowIndex');
          event.preventDefault();
          if (!Array.isArray(filteredResults)) {
            setCurrentRowIndex((currentRowIndex + 1) % Object.keys(filteredResults).length);
          } else {
            setCurrentRowIndex((currentRowIndex + 1) % filteredResults.length);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (!Array.isArray(filteredResults)) {
            setCurrentRowIndex((currentRowIndex + Object.keys(filteredResults).length - 1) % Object.keys(filteredResults).length);
          } else {

            setCurrentRowIndex((currentRowIndex + filteredResults.length - 1) % filteredResults.length);
          }
          break;
        case 'Enter':
          const rows = dropdownRef.current.querySelectorAll('.dropdown-row');
          const className = rows[currentRowIndex].innerText;
          break;
        default: break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredResults, currentRowIndex, setCurrentRowIndex]);
}

export default useKeyboardNavigation;
