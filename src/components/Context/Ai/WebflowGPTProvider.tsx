import React, { createContext, useContext, useMemo, useRef, useState, useEffect } from 'react';
import StorageOps from '@src/Utils/LocalStorage/StorageOps';
const WebflowGptContext = createContext(null);


export function WebflowGptProvider({ children }) {

  const currentNodeAnalysisRef = useRef(null)

  const printNodeAnalysis = () => {
    console.log('%ccurrentNodeAnalysisRef', 'color: lightblue; font-size: 14px', currentNodeAnalysisRef);
  }

//wrap the ctx in memo to prevent rerenders
  const ctx = useMemo(() => ({
    currentNodeAnalysisRef,
    printNodeAnalysis
  }), [currentNodeAnalysisRef]);



  return (
    <WebflowGptContext.Provider value={ctx}>
        {children}
    </WebflowGptContext.Provider>
  );
}

export function useWebflowGptContext() {
  return useContext(WebflowGptContext);
}

