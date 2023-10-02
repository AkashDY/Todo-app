import { AiOutlineCheckSquare, AiOutlineDelete } from "react-icons/ai";
import { LuFileEdit } from "react-icons/lu";

export default function ToDoList(props) {
  const todos = props.todos.filter((item) => item.completed === false);
  console.log(todos);
  const completedTodosHandler = async (data) => {
    data.completed = true;
    // console.log(data);
    const newData = { text: data.text, completed: data.completed };
    const response = await fetch("/api/completeTodos", {
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
  return (
    <div className="overflow-x-auto mt-10">
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
                  <LuFileEdit className="cursor-pointer " size={19} />
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
