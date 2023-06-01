import React, { useEffect, createContext, useContext, useReducer, useState, useRef, Dispatch } from 'react';
import customBlockReducer from './reducers/customBlockReducer';
import { Block, TemplateContextType, TemplateProviderProps, Field } from '@Types/Template/template.types';


const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

const TemplateDispatchContext = createContext<Dispatch<any> | undefined>(undefined);


export function TemplateProvider({ children, initialData }: TemplateProviderProps) {

  const createInitialState = (data: any): Block[] => {
    return data
      ? data.map((block: Block) => {
        const { blockName, id, fields } = block;
        return {
          id,
          name: blockName,
          fields: Object.entries(fields).map(([key, fieldData]) => {
            return {
              id: fieldData.fieldId,
              name: fieldData.name,
              value: fieldData.value,
            };
          }),
        };
      })
      : [];
  };


  const [initialState, setInitialState] = useState<Block[]>(createInitialState(initialData?.blocks || []));
  const [templateState, setTemplateState] = useState(initialState);
  const [initTemplateInfo, setInitTemplateInfo] = useState({ name: "custom template", color: "blue" });
  const [blocks, dispatch] = useReducer(customBlockReducer, templateState ? templateState : []);
  const [currentTemplateData, setCurrentTemplateData] = useState({});
  const [currentFieldData, setCurrentFieldData] = useState<Field>();
  const [count, setCount] = useState(0);
  const [templateRowRefs, setTemplateRowRefs] = useState([]);


  const resetTemplate = () => {
    setInitTemplateInfo({ name: "custom template", color: "blue" });
    setTemplateState([]);
    setCurrentTemplateData({});
    setCurrentFieldData(undefined);
    setTemplateRowRefs([]);

    // Dispatch an action to reset the blocks in your reducer
    dispatch({ type: "RESET_TEMPLATE" });
  };


  useEffect(() => {
    const initialState = initialData
      ? createInitialState(initialData.blocks)
      : createInitialState([]);

    dispatch({ type: "APPEND_INITIAL_DATA", payload: initialState });
  }, [initialData]);



  useEffect(() => {
    if (initialData && initialData['templateName'] !== initTemplateInfo) {
      setInitTemplateInfo({ name: initialData['templateName'], color: initialData.templateColor });
    }

  }, [initialData]);




  const reorderInitialState = (newOrder: number[]) => {
    const reorderedState = newOrder.map(index => initialState[index]);
    setInitialState(reorderedState);
  };


  useEffect(() => {
    setCurrentFieldData(currentTemplateData['fieldData'])
  });


  useEffect(() => {
    dispatch({ type: "UPDATE_INITIAL_DATA", payload: initialState });
  }, [initialState]);


  const getTemplateEditorByBlockId = (blockId) => {
    const templateData = initialData ? initialData : { templateLayout: {} };
    let templateLayout = templateData.templateLayout;

    // Check if templateLayout is defined and is an object
    if (templateLayout && typeof templateLayout === 'object') {
      return templateLayout[blockId];
    } else {
      console.error('templateLayout is not defined or not an object');
      return undefined;
    }
  };



  const handleBlockNameChange = (id: number, name: string) => {
    dispatch({ type: "UPDATE_BLOCK_NAME", id, name });
  };

  const addField = (payload: Object) => {
    dispatch({ type: "ADD_FIELD", payload });

  };
  const handleFieldChange = (blockId: number, fieldId: number, fieldUpdate: Partial<Field>) => {
    dispatch({ type: "UPDATE_FIELD", blockId, fieldId, fieldUpdate });
  };
  const handleDeleteField = (blockId: number, fieldId: number) => {
    dispatch({ type: "DELETE_FIELD", blockId, fieldId });
  };

  const addBlock = () => { dispatch({ type: "ADD_BLOCK" }); };



  const ctx: TemplateContextType = {
    count,
    blocks,
    addBlock,
    addField,
    resetTemplate,
    templateRowRefs,
    initTemplateInfo,
    currentFieldData,
    handleFieldChange,
    handleDeleteField,
    setTemplateRowRefs,
    reorderInitialState,
    currentTemplateData,
    handleBlockNameChange,
    setCurrentTemplateData,
    getTemplateEditorByBlockId,
  };

  return (
    <TemplateContext.Provider value={ctx}>
      <TemplateDispatchContext.Provider value={dispatch}>
        {children}
      </TemplateDispatchContext.Provider>
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  return useContext(TemplateContext);
}

export function useTemplateDispatch() {
  return useContext(TemplateDispatchContext);
}







