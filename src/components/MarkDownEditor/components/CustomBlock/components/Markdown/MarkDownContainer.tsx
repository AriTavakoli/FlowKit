// import React from "react";
// import Editor from "react-markdown-editor-lite";
// import MarkdownIt from "markdown-it";
// import MarkdownToJSX from "markdown-to-jsx";
// import MyComponent from "./MyComponent";

// const mdParser = new MarkdownIt();

// export default function MarkDownIndex({ input }) {
//   const mdEditor = React.useRef(null);

//   const [currentMarkDown, setCurrentMarkDown] = React.useState("");

//   React.useEffect(() => {
//     setCurrentMarkDown(input ? input : "");
//   }, [input]);

//   const handleEditorChange = ({ html, text }) => {
//     const newValue = text.replace(/\d/g, "");
//     setCurrentMarkDown(newValue);
//   };

//   const renderHTML = (text) => {
//     const options = {
//       overrides: {
//         MyComponent: {
//           component: MyComponent
//         }
//       }
//     };
//     return MarkdownToJSX(text, options);
//   };

//   return (
//     <div className="markdown__container">
//       <Editor
//         ref={mdEditor}
//         value={currentMarkDown}
//         className="markdown__editor"
//         onChange={handleEditorChange}
//         renderHTML={renderHTML}
//       />
//     </div>
//   );
// }
