import React, { createContext, useContext, useEffect, useReducer } from 'react';
// import StorageOps from '../../GPT/components/utils/StorageOps';
import TemplateSanitization from '../utils/TemplateSanitization';


enum BubbleColor {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  PURPLE = 'purple'
}

enum ConversationStyle {
  ACADEMIC = 'academic',
  FUNNY = 'funny'
}

type TemplateEditor = {
  queryName: string,
  bubbleColor: BubbleColor,
  conversationStyle: ConversationStyle,
  responseLength: number,
  markDownTemplateOutput: string,
  markDownTemplateQuery: string
}

export type Action =
  | { type: 'markDownOutput'; payload: string }
  | { type: 'markDownQuery'; payload: string }
  | { type: 'queryName'; payload: string }
  | { type: 'bubbleColor'; payload: BubbleColor }
  | { type: 'conversationStyle'; payload: ConversationStyle }
  | { type: 'responseLength'; payload: number };

interface EditorDispatchContextType {
  handleTemplateChange: (type: Action['type'], payload: Action['payload']) => void;
}

const EditorContext = createContext({});

const EditorDispatchContext = createContext<EditorDispatchContextType>({
  handleTemplateChange: () => { },
});


function editorReducer(formElements: TemplateEditor, action: Action) {
  switch (action.type) {
    case 'markDownOutput':
      return {
        ...formElements,
        markDownTemplateOutput: action.payload
      };
    case 'markDownQuery':
      return {
        ...formElements,
        markDownTemplateQuery: action.payload
      };
    case 'queryName':
      return {
        ...formElements,
        queryName: action.payload
      };
    case 'bubbleColor':
      return {
        ...formElements,
        bubbleColor: action.payload
      };
    case 'conversationStyle':
      return {
        ...formElements,
        conversationStyle: action.payload
      };
    case 'responseLength':
      return {
        ...formElements,
        responseLength: action.payload
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}


export function EditorProvider({ children }) {
  const [formElements, dispatch] = useReducer(editorReducer, {
    queryName: '',
    bubbleColor: BubbleColor.RED,
    conversationStyle: ConversationStyle.ACADEMIC,
    responseLength: 0,
    markDownTemplateOutput: '',
    markDownTemplateQuery: ''
  });


  function handleTemplateChange(type: Action['type'], payload: Action['payload']) {
    switch (type) {
      case 'markDownOutput':
        dispatch({ type: 'markDownOutput', payload: payload as string });
        break;
      case 'markDownQuery':
        dispatch({ type: 'markDownQuery', payload: payload as string });
        break;
      case 'queryName':
        console.log(payload, 'payload');
        dispatch({ type: 'queryName', payload: payload as string });
        break;
      case 'bubbleColor':
        dispatch({ type: 'bubbleColor', payload: payload as BubbleColor });
        break;
      case 'conversationStyle':
        dispatch({ type: 'conversationStyle', payload: payload as ConversationStyle });
        break;
      case 'responseLength':
        dispatch({ type: 'responseLength', payload: payload as number });
        break;
      default:
        break;
    }
  }


  const handleSaveTemplate = () => {
    // console.log('saving template');
    // let { queryName, bubbleColor, conversationStyle, responseLength, markDownTemplateQuery, markDownTemplateOutput } = formElements;
    // const Sanitizer = new TemplateSanitization()
    // let savedTemplate = {
    //   active: true,
    //   queryName,
    //   bubbleColor,
    //   conversationStyle,
    //   responseLength,
    //   markDownTemplateQuery: Sanitizer.sanitize(markDownTemplateQuery),
    //   markDownTemplateOutput: Sanitizer.sanitize(markDownTemplateOutput)
    // };
    // console.log(savedTemplate, 'savedTemplate');

    // let storageOps = new StorageOps(queryName, 'template', savedTemplate).addStorageItem();

  }



  useEffect(() => {
    console.log(formElements.queryName, 'queryName');
  }, [formElements.queryName]);


  const ctx = {
    formElements,
    handleSaveTemplate
  }

  const dispatchCtx = {
    handleTemplateChange
  }

  return (
    <EditorContext.Provider value={ctx}>
      <EditorDispatchContext.Provider value={dispatchCtx}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorContext.Provider>
  );
}


export function useMarkDown() {
  return useContext(EditorContext);
}

export function useDispatchMarkDown() {
  return useContext(EditorDispatchContext);
}



