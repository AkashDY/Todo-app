"use client";
import { useState } from "react";
import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";

export default function Home() {
  const [toDos, setToDos] = useState([]);
  const addTodos = (data) => {
    setToDos([...toDos, data]);
    console.log(toDos);
  };
  const deleteToDo = (id) => {
    const updateTasks = [...toDos];
    const index = updateTasks.findIndex((index) => index.id === id);
    updateTasks.splice(index, 1);
    setToDos(updateTasks);
  };
  return (
    <main className="max-w-4xl m-auto mt-4 ">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <AddTask addTodos={addTodos} />
      </div>
      <ToDoList toDos={toDos} deleteToDo={deleteToDo} />
    </main>
  );
}
