import { AiOutlineCheckSquare, AiOutlineDelete } from "react-icons/ai";
import { LuFileEdit } from "react-icons/lu";
import { useRef, useState } from "react";
import Modal from "./Modal";

export default function ToDoList(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState();
  const editTodoRef = useRef("");
  //this will show only if uncompleted task
  console.log(modalOpen);
  const todos = props.todos.filter((item) => item.completed === false);
  console.log(todos);

  const completedTodosHandler = async (data) => {
    data.completed = true;
    // console.log(data);
    const newData = { text: data.text, completed: data.completed };
    const response = await fetch("/api/editTodos", {
      method: "POST",
      body: JSON.stringify({
        id: data.id,
        newData,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    props.filterTodos(data);
  };
  //edit todos
  async function handleEditTodo(e) {
    e.preventDefault();
    const newData = { text: editTodoRef.current.value, completed: false };
    const response = await fetch("/api/editTodos", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        newData,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = newData;
    data.id = id;
    setModalOpen(false);
    props.filterTodos(data);
  }
  const openModal = (value, id) => {
    editTodoRef.current.value = value;
    setId(id);
    setModalOpen(true);
  };

  return (
    <div className="overflow-x-auto mt-10">
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleEditTodo}>
          <h3 className="font-bold text-lg text-center">Edit Task</h3>
          <div className="modal-action">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-full"
              ref={editTodoRef}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      <table className="table">
        {/* head */}
        <thead className="bg-fuchsia-200">
          <tr>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {todos.map((item) => {
            return (
              <tr key={item.id}>
                <td className="w-full">{item.text}</td>
                <td className="flex gap-2">
                  <AiOutlineCheckSquare
                    onClick={() => {
                      completedTodosHandler({
                        id: item.id,
                        text: item.text,
                        completed: item.completed,
                      });
                    }}
                    size={20}
                    className="cursor-pointer "
                    color="green"
                  />
                  <LuFileEdit
                    onClick={() => {
                      openModal(item.text, item.id);
                    }}
                    className="cursor-pointer "
                    size={19}
                  />
                  <AiOutlineDelete
                    color="red"
                    className="cursor-pointer "
                    onClick={() => {
                      deleteToDo(item.id);
                    }}
                    size={20}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
