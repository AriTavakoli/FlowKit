import React, { useEffect, useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import styles from '../fieldsManager.module.scss';
import FileTemp from "./Temp/File_Temp";
import { useCustomInput } from "./hooks/useCustomInput";


SyntaxHighlighter.registerLanguage("javascript", js);


export type InputType =
  | "text"
  | "textarea"
  | "number"
  | "range"
  | "color"
  | "email"
  | "tel"
  | "url"
  | "webflow"
  | "image"
  | "file"
  | "sequenceOutput"

type CustomVariableProps = {
  name: string;
  value: string;
  inputType: InputType;
  onChange: (name: string, value: string) => void;
};

function CustomInput({ name, value, inputType, onChange }: CustomVariableProps) {
  // const [editedValue, setEditedValue] = useState(value);

  const { editedValue, handleValueChange, handleBlur } = useCustomInput(
    value,
    inputType,
    (newValue) => onChange(name, newValue)
  );

  const [fileName, setFileName] = useState("");



  // const handleValueChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

  //   e.stopPropagation()
  //   e.preventDefault()

  //   if (inputType === "code") {
  //     setEditedValue(e);
  //   } else {
  //     setEditedValue(e.target.value);
  //   }
  // };

  // const handleBlur = (e) => {

  //   e.stopPropagation()
  //   e.preventDefault()
  //   if (editedValue.trim() !== "") {
  //     onChange(name, editedValue);
  //   } else {
  //     setEditedValue(value);
  //   }
  // };


  //owhahhhhhh

  useEffect(() => {
    console.log("CustomVariable useEffect");
    console.log(editedValue);
  }, [editedValue]);


  const renderInput = () => {
    switch (inputType) {
      case "text":
        return (
          <>
            <input
              type="text"
              value={editedValue}
              onChange={handleValueChange}
              onBlur={handleBlur}
              placeholder="Default Value1"
            />
          </>
        );
      case "textarea":
        return (
          <textarea
            value={editedValue}
            onChange={handleValueChange}
            onBlur={handleBlur}
            placeholder="Default Value"
          />
        );
      //
      case "file":
        return (
          <>
            <img src={editedValue} alt="savedImage" style={{ height: "75px", width: "75px", aspectRatio: '4/3' }} />
            <p className= {styles.Value__p} >{editedValue}</p>

            <FileTemp
              fileName={fileName}
              setFileName={setFileName}
              handleFileChange={handleValueChange}
            ></FileTemp>
          </>
        );

      case "image":
        return (
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleValueChange}
            // onBlur={handleBlur}
            placeholder="Default Value"
          />
        );
      case "webflow":
        return (
          <input
            value={editedValue}
            onChange={handleValueChange}
            placeholder="Webflow Link"
            disabled
          />
        );
      case "number":
        return (
          <input
            type="number"
            value={editedValue}
            onChange={handleValueChange}
            onBlur={handleBlur}
            placeholder="Default Value"
          />
        );
      case "range":
        return (
          <input
            type="range"
            placeholder="Default Value"
            value={editedValue}
            onChange={handleValueChange}
            onBlur={handleBlur}
          />
        );
      case "color":
        return (
          <input
            type="color"
            value={editedValue}
            onChange={handleValueChange}
            onBlur={handleBlur}
            placeholder="Default Value"
          />
        );

      case "sequenceOutput":
        return (
          <input
            value={editedValue}
            onChange={handleValueChange}
            placeholder="Parent Output"
            disabled
          />
        );

      case "url":
        return (
          <input
            type="url"
            value={editedValue}
            onChange={handleValueChange}
            onBlur={handleBlur}
            placeholder="Default Value"
          />
        );
      default:
        return <div></div>;
    }
  };

  return (
    // <div className={styles['Value__container']} >
    <div className={styles[`Value__${inputType}`]} >
      {renderInput()}
    </div>
    // </div>

  );
};

export default React.memo(CustomInput);

