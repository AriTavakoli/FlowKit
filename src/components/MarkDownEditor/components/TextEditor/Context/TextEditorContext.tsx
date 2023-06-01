import { createContext, useContext, useReducer, useRef } from 'react';
import EditorFactory from '../components/EditableTextArea/class/Editor';
import useEditor from '../hooks/useEditor';

const TextEditorContext = createContext(null);

const TextEditorDispatchContext = createContext(null);

export function TextEditorProvider({ children }) {
  const [textEditor, dispatch] = useReducer(
    textEditorReducer,
    ""
  );

  const textEditorInstanceRef = useRef();



  const ctx = {
    textEditor,
    textEditorInstanceRef
  }

  return (
    <TextEditorContext.Provider value={ctx}>
      <TextEditorDispatchContext.Provider value={dispatch}>
        {children}
      </TextEditorDispatchContext.Provider>
    </TextEditorContext.Provider>
  );
}

export function useTextEditor() {
  return useContext(TextEditorContext);
}

export function useTextEditorDispatch() {
  return useContext(TextEditorDispatchContext);
}

function textEditorReducer(textEditor, action) {
  switch (action.type) {
    case 'added': {
      return [...textEditor, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return textEditor.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return textEditor.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
