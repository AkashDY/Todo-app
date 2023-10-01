import { AiOutlineDelete, AiOutlineCheckSquare } from "react-icons/ai";
export default function ToDoList({ toDos, deleteToDo }) {
  console.log(toDos);
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
          {toDos.map((item) => {
            return (
              <tr key={item.id}>
                <td className="w-full">{item.text}</td>
                <td className="flex gap-2">
                  <AiOutlineDelete
                    color="red"
                    className="cursor-pointer "
                    onClick={() => {
                      deleteToDo(item.id);
                    }}
                    size={20}
                  />
                  <AiOutlineCheckSquare
                    size={20}
                    className="cursor-pointer "
                    color="green"
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
