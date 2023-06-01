


export function checkBlockNamesAreUnique() {
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


export function checkForEmptyBlockNames() {
  //if block names are empty, return false
  const inputElements = document.querySelectorAll('input[data-blockName]');
  let hasEmptyBlockName = false;

  inputElements.forEach((inputElement) => {
    const blockName = inputElement.dataset.blockname;
    if (blockName === '') {
      hasEmptyBlockName = true;
      return;
    }
  });

  if (hasEmptyBlockName) {
    console.log('Empty block names found');
    return false;
  }

  return true;
}



export default function validateForm() {
  const isBlockNamesUnique = checkBlockNamesAreUnique();
  const isFormValid = checkForEmptyBlockNames();

  if (isBlockNamesUnique && isFormValid) {
    console.log('Form is valid');
    return true;
  }

  return false;
}