import { useState, useEffect, useRef, useCallback } from 'react';

type TextareaHook = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  selectAll: () => void;
  setSelectionRange: (start: number, end: number, direction?: "forward" | "backward" | "none") => void;
  insertText: (text: string) => void;
  clear: () => void;
  replaceSelection: (text: string) => void;
  insertAtCursor: (text: string) => void;
  lastCursorPosition: number;
  setLastCursorPosition: (position: number) => void;
};

export const useTextarea = (initialValue: string = "", textareaRef): TextareaHook => {
  // const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState<string>(initialValue);
  const [lastCursorPosition, setLastCursorPosition] = useState<number>(0);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }, []);

  const onFocus = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.select();
    }
  }, []);

  const onBlur = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(0, 0);
    }
  }, []);

  const selectAll = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.select();
    }
  }, []);

  const setSelectionRange = useCallback((start: number, end: number, direction: "forward" | "backward" | "none" = "none") => {
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(start, end, direction);
    }
  }, []);

  const insertText = useCallback((text: string) => {
    if (textareaRef.current) {
      const selectionStart = textareaRef.current.selectionStart;
      const selectionEnd = textareaRef.current.selectionEnd;
      const currentValue = textareaRef.current.value;
      const newValue = currentValue.substring(0, selectionStart) + text + currentValue.substring(selectionEnd);
      setValue(newValue);
      textareaRef.current.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
      textareaRef.current.focus();
    }
  }, []);

  const clear = useCallback(() => {
    setValue("");
  }, []);

  const replaceSelection = useCallback((text: string) => {
    if (textareaRef.current) {
      const selectionStart = textareaRef.current.selectionStart;
      const selectionEnd = textareaRef.current.selectionEnd;
      const currentValue = textareaRef.current.value;
      const newValue = currentValue.substring(0, selectionStart) + text + currentValue.substring(selectionEnd);
      setValue(newValue);
      textareaRef.current.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
      textareaRef.current.focus();
    }
  }, []);

  const insertAtCursor = useCallback((text: string) => {
    if (textareaRef.current) {
      const selectionStart = textareaRef.current.selectionStart;
      const currentValue = textareaRef.current.value;
      const newValue = currentValue.substring(0, selectionStart) + text + currentValue.substring(selectionStart);
      setValue(newValue);
      textareaRef.current.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
      textareaRef.current.focus();
    }
  }, []);

  return {
    value,
    onChange,
    onFocus,
    onBlur,
    selectAll,
    setSelectionRange,
    insertText,
    clear,
    replaceSelection,
    insertAtCursor,
    lastCursorPosition,
    setLastCursorPosition,
  };
};

export default useTextarea;