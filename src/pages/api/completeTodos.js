import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const client = await MongoClient.connect(
      "mongodb+srv://hntrhound:DamzzXASl5wMg8J7@cluster0.vltkgzw.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();
    const todosCollection = db.collection("todos");
    console.log("putt call hua");
    const { id, newData } = req.body;
    const query = { _id: new ObjectId(id) };
    const updatedData = await todosCollection.findOneAndReplace(query, newData);
    console.log("putt call hua", updatedData);
    res.status(200).json(updatedData.value);
  }
}

export default handler;
