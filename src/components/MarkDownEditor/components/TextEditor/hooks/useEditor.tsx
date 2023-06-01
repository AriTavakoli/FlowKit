import { useState, useEffect, useCallback, useRef } from 'react';
import EditorFactory from '../components/EditableTextArea/classes/Editor';

function useEditor(editorRef) {

  const [editor, setEditor] = useState();

  const hookRef = useRef();

  useEffect(() => {
    if (!hookRef.current) {
      hookRef.current = new EditorFactory(editorRef);
    }
  }, []);


  useEffect(() => {
    // console.log('rendering');
  });

  const renderElement = useCallback((content) => {
    const element = document.createElement('h1', content);
    element.innerHTML = content;
    return element;
  }, []);


  const addElement = useCallback((elementType , content) => {
    // console.log(content);
    hookRef.current.injectElement(elementType, content);
  }, [editorRef]);




  return { editor, addElement, renderElement}

}

export default useEditor;