import React, { useState } from 'react';
import createToast, { dismiss} from '@src/components/Webflow/Features/Todo/utils/toast';
import useTodo from '@src/components/Webflow/Features/Todo/hooks/useTodo';
import './AddTodoBox.css';
import Icon from '@src/components/IconWrapper/Icon';

/**
 * Renders an input group to add todo items
 */
function AddTodoBox() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [todoText, setTodoText] = useState('');
  const [isError, setIsError] = useState(false);
  const { dispatch } = useTodo();

  const onSubmit = () => {
    if (todoText.trim().length === 0) {
      // Play feedback when creating an empty task

      // Show error styles to convey visually
      setIsError(true);

      // Display error message as a toast
      createToast('Please provide a name for the task', 'error', {
        label: 'Dismiss',
        onClick: (toastInstance) => dismiss(toastInstance.id),
      });

      return;
    };

    // Add new todo item to the list
    dispatch({
      type: 'add',
      payload: {
        todo: todoText,
        complete: false,
      }
    });

    // Reset the input text
    setTodoText('');

    // Play feedback when the task has been added
  }

  return (
    <div className="add-todo-box-root" data-active={isInputFocused} data-error={isError}>
      <span className="add-todo-box-leading">
        &gt;
      </span>

      <input
        type="text"
        placeholder="What's on your mind..."
        className="add-todo-box-input"
        value={todoText}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => {
          setIsInputFocused(false);
          setIsError(false);
        }}
        onChange={(e) => {
          setTodoText(e.currentTarget.value);
          setIsError(false);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSubmit();
          }
        }}
      />

      <div className="add-todo-button-root">
        <button
          type="submit"
          className="add-todo-button"
          title="Add todo"
          disabled={(todoText.trim()).length === 0}
          onClick={onSubmit}
        >
          <Icon id = "plus" size = {16} color = "grey"></Icon>
        </button>
      </div>
    </div>
  )
}

export default AddTodoBox;
