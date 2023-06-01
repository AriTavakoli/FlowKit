import React from 'react';
import { useTextEditor } from './Context/TextEditorContext';
import RichTextEditor from './components/EditableTextArea/RichTextArea';

export default function TextEditor({ }) {

  const { textEditor } = useTextEditor();

  return (
    <div>
      <h1>{textEditor}</h1>
      <RichTextEditor > </RichTextEditor>
      {/* <Editor content={textEditor}></Editor> */}
    </div>


  )
}