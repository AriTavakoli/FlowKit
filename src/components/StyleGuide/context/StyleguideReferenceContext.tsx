import React, { useEffect, createContext, useContext, useReducer, useState, useRef, Dispatch } from 'react';

const StyleguideContext = createContext({})



export function StyleguideProvider({children}) {

  const [currentPageIndex, setCurrentPageIndex] = useState(0);


  const [position, setPosition] = useState< 'relative' | 'fixed'>('fixed');

  const [currentNode, setCurrentNode] = useState<HTMLElement | null>(null);


  const ctx = {
    currentPageIndex,
    setCurrentPageIndex,
    position,
    setPosition,
    currentNode,
    setCurrentNode,
  };

  return (
    <StyleguideContext.Provider value={ctx}>
        {children}
    </StyleguideContext.Provider>
  );
}

export function useStyleguideContext() {
  return useContext(StyleguideContext);
}








