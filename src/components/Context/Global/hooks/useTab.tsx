import { useContext, useState, useCallback } from 'react';
// import { GlobalContext } from './path/to/GlobalProvider';

export function useTabOperations(refs) {

  // const { refs, setRefs, switchTab } = useContext(GlobalContext);
  const switchTab = (tabsName) => {
    refs[tabsName].current.click();
  }
  return {
    switchTab,

  };
}
