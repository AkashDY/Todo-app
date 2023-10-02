import React, { useState } from "react";
import AddTask from "./AddTask";
import ToDoList from "./ToDoList";


function Todos(props) {
  const [todos, setTodos] = useState(props.todos.todos);
  console.log(todos);
  function addTodo(data) {
    setTodos([...todos, data]);
  }
  function filterTodos(data) {
    setTodos((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === data.id) {
          return data;
        }
        return task;
      });
    });
  }
  return (
    <>
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <AddTask addTodo={addTodo} />
      </div>
      <ToDoList todos={todos} filterTodos={filterTodos} />
    </>
  );
}
export default Todos;
