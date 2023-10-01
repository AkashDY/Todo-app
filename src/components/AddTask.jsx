"use client";
import React, { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";


export default function AddTask(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const todoRef = useRef("");
  const openModal = () => {
    setModalOpen(true);
  };
  async function handleSubmitnewTodo(e) {
    e.preventDefault();
    const data = { text: todoRef.current.value, completed: false };
    //api
    const response = await fetch("/api/addTodos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    const res = await response.json();
    console.log(res.result.insertedId);
    todoRef.current.value = "";
    data.id = res.result.insertedId;
    props.addTodo(data);
    setModalOpen(false);
  }
  return (
    <div>
      <button className="btn btn-primary w-full" onClick={openModal}>
        Add new task <AiOutlinePlus size={15} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitnewTodo}>
          <h3 className="font-bold text-lg">Add new Task</h3>
          <div className="modal-action">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-full"
              ref={todoRef}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}