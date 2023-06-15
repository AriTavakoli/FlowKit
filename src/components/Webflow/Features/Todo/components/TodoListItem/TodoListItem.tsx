import React from 'react';
import { TodoItem } from 'utils/types';
import TodoListItemActionButton, { TodoListItemActionButtonProps } from './TodoListItemActionButton';
import './TodoListItem.css';
import Icon from '@src/components/IconWrapper/Icon';

interface TodoListItemProps {
  todoItem: TodoItem;
  onEdit: () => void;
  onDelete: () => void;
  onToggleCompletion: () => void;
}

function TodoListItem({ todoItem, onDelete, onEdit, onToggleCompletion }: TodoListItemProps) {
  const todoListItemActions: TodoListItemActionButtonProps[] = [
    {
      title: 'Edit Item',
      ariaLabel: `Edit Item "${todoItem.todo}"`,
      Icon: <Icon id="edit" />,
      onClick: onEdit,
    },
    {
      title: 'Delete Item',
      ariaLabel: `Delete Item "${todoItem.todo}"`,
      Icon: < Icon id="trash" size={16} color="grey" />,
      onClick: onDelete,
    },
  ];

  return (
    <div
      className="todo-list-item-root"
      data-completed={todoItem.complete}
      layout
      animate={{
        y: [30, 0],
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        }
      }}
    >
      <div
        className="todo-list-item-click-target"
        onClick={onToggleCompletion}
      />

      <div className="todo-list-item-primary-content">
        <input
          type="checkbox"
          checked={todoItem.complete}
          id={`checkbox-${todoItem.id}`}
          title={`Mark item "${todoItem.todo}" as ${todoItem.complete ? 'pending' : 'completed'}`}
          onChange={onToggleCompletion}
        />

        <label
          className="todo-list-item-label"
          htmlFor={`checkbox-${todoItem.id}`}
        >
          {todoItem.todo}
        </label>
      </div>

      <div className="todo-list-item-actions-group">
        {todoListItemActions.map((action) => (
          <TodoListItemActionButton
            key={action.title}
            Icon={action.Icon}
            ariaLabel={action.ariaLabel}
            title={action.title}
            onClick={action.onClick}
          />
        ))}
      </div>
    </div>
  )
}

export default TodoListItem;
