// customInputHook.ts
import { useState } from 'react';

export type InputType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'range'
  | 'color'
  | 'email'
  | 'tel'
  | 'url'
  | 'webflow'
  | 'image'
  | 'file'

type UseCustomInput = (
  initialValue: string,
  inputType: InputType,
  onValueChange: (value: string) => void) => {
    editedValue: string;

    handleValueChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleBlur: () => void;

  };

export const useCustomInput: UseCustomInput = (
  initialValue,
  inputType,
  onValueChange
) => {
  const [editedValue, setEditedValue] = useState(initialValue);

  const inputTypeToHandler = {
    text: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditedValue(e.target.value),
    textarea: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditedValue(e.target.value),
    number: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditedValue(e.target.value),
    range: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditedValue(e.target.value),
    color: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditedValue(e.target.value),
    email: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditedValue(e.target.value),

    file: (e) => {
      console.log("file input");
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          const base64 = reader.result;
          setEditedValue(base64); // Set the base64-encoded file content as the edited value
          onValueChange(base64); // Call onValueChange to pass the updated value to the parent component
        };

        reader.readAsDataURL(file); // Read the file as a data URL
      }
    },

    image: (e) => {
      console.log('image input');
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        // Process the file as needed (e.g., convert it to base64 or upload it to a server)
        setEditedValue(file.name); // Set the file name as the edited value
        onValueChange(file.name); // Call onValueChange to pass the updated value to the parent component
      }
    },
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const handler = inputTypeToHandler[inputType];
    if (handler) {
      handler(e);
    } else {
      console.warn(`No handler found for input type: ${inputType}`);
    }
  };

  const handleBlur = () => {
    if (editedValue.trim() !== '') {
      onValueChange(editedValue);
    } else {
      setEditedValue(initialValue);
    }
  };

  return {
    editedValue,
    handleValueChange,
    handleBlur,
  };
};
