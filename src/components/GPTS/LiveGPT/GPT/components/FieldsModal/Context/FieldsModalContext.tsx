import React, { createContext, useContext, useState } from 'react';

const FieldsModalContext = createContext({});

const useFieldsModalContext = () => {
  const context = useContext(FieldsModalContext);
  if (!context) {
    throw new Error('useFieldsModalContext must be used within a FieldsModalProvider');
  }
  return context;
};

const FieldsModalProvider = ({ children }) => {
  const [inputValues, setInputValues] = useState({});
  const [useDefaults, setUseDefaults] = useState(true);

  const value = {
    inputValues,
    setInputValues,
    useDefaults,
    setUseDefaults,
  };

  return (
    <FieldsModalContext.Provider value={value}>
      {children}
    </FieldsModalContext.Provider>
  );
};

export { FieldsModalProvider, useFieldsModalContext };
