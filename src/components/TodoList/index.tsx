import React from "react";
import "../../styles/styles.css";
import { Todo } from "../../types/types";
import { TodoItem } from "../TodoItem";
import { Droppable } from "react-beautiful-dnd";

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoList = (props: TodoListProps) => {
  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todosHeading">Active Todo</span>
            {props.todos.map((item, index) => (
              <TodoItem
                key={item.id}
                index={index}
                todo={item}
                todos={props.todos}
                setTodos={props.setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="CompletedList">
        {(provided, snapshot) => (
          <div
            className={`todos  ${
              snapshot.isDraggingOver ? "dragcomplete" : "completedTodos"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todosHeading">Completed Tasks</span>
            {props.completedTodos.map((item, index) => (
              <TodoItem
                key={item.id}
                index={index}
                todo={item}
                todos={props.completedTodos}
                setTodos={props.setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
