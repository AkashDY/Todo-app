import { MongoClient, ObjectId } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://hntrhound:DamzzXASl5wMg8J7@cluster0.vltkgzw.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");

    const { id } = req.body;
    console.log("id ", id);
    const query = { _id: new ObjectId(id) };
    const res = await todosCollection.deleteOne(query);
    res.status(200).json({ message: "item deleted" });
  }
}
export default handler;
