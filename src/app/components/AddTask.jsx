"use client";
import React, { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import uuid from "react-uuid";
export default function AddTask({ addTodos }) {
  const [modalOpen, setModalOpen] = useState(false);
  const todoRef = useRef("");
  const openModal = () => {
    setModalOpen(true);
  };
  function handleSubmitnewTodo(e) {
    e.preventDefault();
    const data = { id: uuid(), text: todoRef.current.value, completed: false };

    addTodos(data);
    todoRef.current.value = "";
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
