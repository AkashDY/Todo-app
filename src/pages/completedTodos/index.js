import React from "react";
import { MongoClient } from "mongodb";

function completedTodos(props) {
  console.log(props);
  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* head */}
        <thead className="bg-fuchsia-200">
          <tr>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {props.todos.map((item) => {
            return (
              <tr key={item.id}>
                <td className="w-full">{item.text}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export async function getStaticProps() {
  //getting data

  const client = await MongoClient.connect(
    "mongodb+srv://hntrhound:DamzzXASl5wMg8J7@cluster0.vltkgzw.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  const todosCollection = db.collection("todos");
  const todos = await todosCollection.find().toArray();
  client.close();
  const completetodo = todos.filter((item) => item.completed === true);
  return {
    props: {
      todos: completetodo.map((todo) => ({
        text: todo.text,
        id: todo._id.toString(),
        completed: todo.completed,
      })),
    },
    revalidate: 1,
  };
}
export default completedTodos;
