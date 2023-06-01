import React, { useState } from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import RenameModal from '../RenameModal/RenameModal';
import TodoListEmptyState from './TodoListEmptyState';
import { FilterOption } from '../TabGroup/TabGroup';
import { TodoItem } from '@src/components/Webflow/Features/Todo/utils/types';
import createToast, { dismiss } from '@src/components/Webflow/Features/Todo/utils/toast';
import useTodo from '@src/components/Webflow/Features/Todo/hooks/useTodo';

import './TodoList.css';

interface TodoListProps {
  todoList: TodoItem[];
  filterBy: FilterOption;
}




function TodoList({ todoList, filterBy }: TodoListProps) {
  const [editTodoItem, setEditTodoItem] = useState<TodoItem | undefined>(undefined);
  const { dispatch } = useTodo();

  const filteredTodoList = todoList.filter((todoItem) => {
    switch (filterBy) {
      case 'pending':
        return !todoItem.complete;

      case 'completed':
        return todoItem.complete;

      default:
        return true;
    }
  });

  const onRename = (newName: string) => {
    if (editTodoItem === undefined) return;

    dispatch({
      type: 'edit',
      payload: {
        id: editTodoItem.id,
        todo: newName,
      }
    });

    // Reset todo item for editing. This will hide the
    // rename modal
    setEditTodoItem(undefined);
  }

  if (filteredTodoList.length === 0) {
    return <TodoListEmptyState filterOption={filterBy} />
  }

  return (
    <>
      <ul className="todo-list-root">
        {filteredTodoList.map((todoItem) => (
          <TodoListItem
            key={todoItem.id}
            todoItem={todoItem}
            onEdit={() => setEditTodoItem(todoItem)}
            onDelete={() => {
              dispatch({
                type: 'remove',
                payload: todoItem.id,
              });

              // Play crumbled paper sound when deleting a task

              // Allow user to undo deletion of a task via toast
              createToast(`Deleted "${todoItem.todo}"`, 'info', {
                label: 'Undo',
                onClick: (toastInstance) => {
                  // Add the task back to the list
                  dispatch({
                    type: 'add',
                    payload: {
                      todo: todoItem.todo,
                      complete: todoItem.complete,
                    },
                  });

                  // Dismiss the toast
                  dismiss(toastInstance.id);
                },
              });
            }}
            onToggleCompletion={() => {
              dispatch({
                type: 'toggleCompletion',
                payload: todoItem.id,
              });

              if (!todoItem.complete) {
                // Play pencil stroke sound when marking the task
                // as completed
              }
              else {
                // Play button feedback sound when marking the task
                // as pending
              }
            }}
          />
        ))}
      </ul>

      <RenameModal
        todoItem={editTodoItem}
        onRename={onRename}
        onCancel={() => setEditTodoItem(undefined)}
      />
    </>
  )
}

export default TodoList;
