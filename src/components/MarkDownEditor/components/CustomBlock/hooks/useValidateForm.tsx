import { useEffect, useState } from 'react';

function useFormValidation() {
  const [isValid, setIsValid] = useState(false);

  function checkBlockNamesAreUnique() {
    const inputElements = document.querySelectorAll('input[data-blockName]');
    const blockNames = new Set();
    let hasDuplicateBlockName = false;

    inputElements.forEach((inputElement) => {
      const blockName = inputElement.dataset.blockname;
      if (blockNames.has(blockName)) {
        hasDuplicateBlockName = true;
        return;
      }
      blockNames.add(blockName);
    });

    if (hasDuplicateBlockName) {
      console.log('Duplicate block names found');
      return false;
    }

    return true;
  }

  function blockNamesValidation() {
    const requiredFields = document.querySelectorAll('input:required');
    const hasEmptyFields = Array.from(requiredFields).some((field) => !field.value);

    if (hasEmptyFields) {
      console.log('Empty fields found');
      return false;
    }

    return true;
  }

  useEffect(() => {
    const isBlockNamesUnique = checkBlockNamesAreUnique();
    const isFormValid = blockNamesValidation();

    if (isBlockNamesUnique && isFormValid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, []);

  return isValid;
}

export default useFormValidation;
