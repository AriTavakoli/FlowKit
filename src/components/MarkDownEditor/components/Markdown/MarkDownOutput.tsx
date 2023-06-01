import React from "react";
import Editor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import './index.css'
import { useMarkDown, useDispatchMarkDown } from "../../context/EditorContext";
// import TemplateSanitization from "../../utils/TemplateSanitization";

const mdParser = new MarkdownIt();

export default function MarkDownOutput() {
  const mdEditor = React.useRef(null);

  // const { handleMarkDownOutputChange, markDownTemplate, handleSaveTemplate } = useMarkDown();
  const { handleTemplateChange } = useDispatchMarkDown();
  const [currentMarkDown, setCurrentMarkDown] = React.useState("");

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, "");
    console.log(newValue);
    setCurrentMarkDown(newValue);
    handleTemplateChange('markDownOutput', newValue);

  };

  return (
    <div className="markdown__container">
      {/* <button onClick={handleClick}>save</button> */}
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
