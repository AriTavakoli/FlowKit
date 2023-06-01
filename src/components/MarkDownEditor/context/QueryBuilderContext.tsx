import React, { useEffect, createContext, useContext, useReducer, useState, useRef, Dispatch } from 'react';

const QueryBuilderContext = createContext({});

export function QueryBuilderProvider({ children }) {


  const [newBlockJsonData, setNewBlockJsonData] = useState({});

  const ctx = {
    newBlockJsonData,
    setNewBlockJsonData,

  };

  return (
    <QueryBuilderContext.Provider value={ctx}>
      {children}
    </QueryBuilderContext.Provider>
  );
}

export function useQueryBuilderContext() {
  return useContext(QueryBuilderContext);
}

