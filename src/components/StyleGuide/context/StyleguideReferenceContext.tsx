import React, { useEffect, createContext, useContext, useReducer, useState, useRef, Dispatch } from 'react';
import { WebsiteData } from '@src/types/ExportedWebsiteAssets/ExportedAssets';
const StyleguideContext = createContext({})



export function StyleguideProvider({children}) {

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [position, setPosition] = useState< 'relative' | 'fixed'>('fixed');
  const [currentNode, setCurrentNode] = useState<HTMLElement | null>(null);
  const [currentCss , setCurrentCss] = useState<string>('');
  const [currentStyleSheet, setCurrentStyleSheet] = useState<CSSStyleSheet | null>(null);
  const [websiteData, setWebsiteData] = useState<WebsiteData>();
  const [mode, setMode] = useState<'code' | 'flow'>('code');

  const [currentNodeData, setCurrentNodeData] = useState<HTMLElement | null>(null);

  useEffect(() => {
    console.log('%ccurrentNode', 'color: orange; font-size: 44px', currentNode);
  }, [currentNode]);


  const ctx = {
    mode,
    setMode,
    position,
    currentCss,
    setPosition,
    currentNode,
    websiteData,
    setCurrentCss,
    setCurrentNode,
    setWebsiteData,
    currentNodeData,
    currentPageIndex,
    currentStyleSheet,
    setCurrentNodeData,
    setCurrentPageIndex,
    setCurrentStyleSheet,
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








