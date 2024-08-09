import React, { useEffect, useState } from "react";
import "../../styles/styles.css";
import { Todo } from "../../types/types";
import { MdEditSquare, MdDelete, MdDoneOutline } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type TodoItemProps = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoItem = (props: TodoItemProps) => {
  const [editModeOn, setEditModeOn] = useState(false);
  const [editValue, setEditValue] = useState(props.todo.task);

  useEffect(() => {
    focusEditField();
  }, [editModeOn]);

  const handleDone = (id: number) => {
    props.setTodos(
      props.todos.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isDone: !todoItem.isDone }
          : todoItem
      )
    );
  };

  const handleDelete = (id: number) => {
    props.setTodos(props.todos.filter((todoItem) => todoItem.id !== id));
  };

  const handleEdit = (id: number) => {
    setEditModeOn(true);
  };

  const focusEditField = () => {
    let el = document.getElementById("todoEditText");
    el?.focus();
  };

  const handleEditSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    e.preventDefault();

    props.setTodos(
      props.todos.map((todoItem) =>
        todoItem.id === id ? { ...todoItem, task: editValue } : todoItem
      )
    );

    setEditModeOn(false);
  };

  const getTodoText = () =>
    props.todo.isDone ? (
      <s className="todoItemText">{props.todo.task}</s>
    ) : (
      <span className="todoItemText">{props.todo.task}</span>
    );

  return (
    <Draggable draggableId={props.todo.id.toString()} index={props.index}>
      {(provided) => (
        <form
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="todoItem"
          onSubmit={(e) => {
            handleEditSubmit(e, props.todo.id);
          }}
        >
          {editModeOn ? (
            <input
              id="todoEditText"
              className="todoItemText"
              type="text"
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            />
          ) : (
            getTodoText()
          )}

          <div>
            {!props.todo.isDone && (
              <span className="icon">
                <MdEditSquare
                  onClick={() => {
                    handleEdit(props.todo.id);
                  }}
                />
              </span>
            )}

            <span className="icon">
              <MdDelete
                onClick={() => {
                  handleDelete(props.todo.id);
                }}
              />
            </span>
            <span className="icon">
              <MdDoneOutline
                onClick={() => {
                  handleDone(props.todo.id);
                }}
              />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};
