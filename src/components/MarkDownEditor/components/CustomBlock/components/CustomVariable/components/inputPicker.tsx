import React, { useEffect, useState } from "react";
import CustomInput, { InputType } from "./CustomInput";
import styles from '../fieldsManager.module.scss'
import { useTemplate } from "../../../context/TemplateContext";

interface Field {
  name: string;
  value: string | File;
  inputType: InputType;
}

interface InputPickerProps {
  fields?: Field[];
  onFieldChange: (fields: Field[]) => void;
  field: Field;
}

function InputPicker({ fields = [], onFieldChange, field }: InputPickerProps) {

  const isArrayValue = Array.isArray(field.value);

  const [selectedInputType, setSelectedInputType] = useState<InputType>(isArrayValue ? field.value[0].inputType : field.inputType);
  const [inputValue, setInputValue] = useState(isArrayValue ? field.value[0].value : field.value);


  const handleInputChange = (name: string, value: string | File) => {
    const updatedFields = [
      {
        name: selectedInputType,
        value: selectedInputType === "file" || selectedInputType === "image" ? value : value, // Store the entire file object for file/image inputs
        inputType: selectedInputType,
      },
      ...fields.filter((field) => field.name !== selectedInputType),
    ];

    console.log("updatedFields", updatedFields, "value", value);
    onFieldChange(updatedFields);
    setInputValue(value);
  };


  const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newInputType = e.target.value as InputType;
    setSelectedInputType(newInputType);
    setInputValue("");

    const updatedFields = [
      {
        name: newInputType,
        value: inputValue,
        inputType: newInputType,
      },
      ...fields.filter((field) => field.name !== newInputType),
    ];
    onFieldChange(updatedFields);
  };

  useEffect(() => {
    handleInputChange(field.name, isArrayValue ? field.value[0].value : field.value);

    const initialInputType = isArrayValue ? field.value[0].inputType : field.inputType;
    handleInputTypeChange({ target: { value: initialInputType } } as React.ChangeEvent<HTMLSelectElement>);
  }, []);


  const renderInputTypeOptions = () => {
    const inputTypes: InputType[] = [
      "choose",
      "text",
      "textarea",
      "number",
      "image",
      "range",
      "color",
      "email",
      "tel",
      "url",
      "webflow",
      "file",
      "sequenceOutput"
    ];

    return inputTypes.map((inputType) => (
      <option key={inputType} value={inputType}>
        {inputType}
      </option>
    ));
  };

  return (

    <>
      {/* <label htmlFor="input-type">:</label> */}
      <select id="input-type" value={selectedInputType} onChange={handleInputTypeChange} className={styles["Value__dropDown"]}>
        {renderInputTypeOptions()}
      </select>
      <div className={styles["Value__valueBox"]} >
        <CustomInput
          name={selectedInputType}
          value={inputValue}
          inputType={selectedInputType}
          onChange={handleInputChange}
        />
      </div>


    </>
  );
};

export default InputPicker;
