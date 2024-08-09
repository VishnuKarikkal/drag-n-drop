import React from "react";
import "../../styles/styles.css";

type InputFieldProps = {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  onAdd: (e: React.FormEvent) => void;
};

export const InputField = (props: InputFieldProps) => {
  // to remove the box shadow of input box on after adding a task
  let blurInput = () => {
    let el = document.getElementById("inputBox");
    el?.blur();
  };

  return (
    <form
      className="input"
      onSubmit={(e) => {
        props.onAdd(e);
        blurInput();
      }}
    >
      <input
        type="input"
        id="inputBox"
        className="inputBox"
        placeholder="enter a task here!"
        value={props.todo}
        onChange={(e) => props.setTodo(e.target.value)}
      />
      <button className="submitTask">Go</button>
    </form>
  );
};
