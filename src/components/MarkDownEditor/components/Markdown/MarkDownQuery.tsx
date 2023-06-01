import React from "react";
import Editor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import './index.css'
import { useMarkDown, useDispatchMarkDown } from "../../context/EditorContext";

const mdParser = new MarkdownIt();

export default function MarkDownQuery() {
  const mdEditor = React.useRef(null);

  const { handleTemplateChange } = useDispatchMarkDown();
  const [currentMarkDown, setCurrentMarkDown] = React.useState("");

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    setCurrentMarkDown(newValue);
    handleTemplateChange('markDownQuery', newValue);
  };

  return (
    <div className="markdown__container">
      <Editor
        ref={mdEditor}
        value={currentMarkDown}
        className="markdown__editor"

        onChange={handleEditorChange}
        renderHTML={text => mdParser.render(text)}
      />
    </div>
  );
}
