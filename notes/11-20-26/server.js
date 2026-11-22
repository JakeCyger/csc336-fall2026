import "dotenv/config";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

let app = express();
let port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

// The connection string has our password in it, so it lives in .env
let client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
console.log("Connected to MongoDB");

// A database holds collections. A collection holds documents (just objects).
// Neither has to exist yet: Mongo creates them the first time we insert.
let database = client.db("WebDevelopment");
let todos = database.collection("todos");


// LIST: GET /api/todos
app.get("/api/todos", async (req, res) => {
    // {} is a filter that matches every document.
    // find() gives back a "cursor"; toArray() turns it into a normal array.
    let cursor = todos.find({});
    let allTodos = await cursor.toArray();
    res.json(allTodos);
});


// ADD: POST /api/todos   with a body like { "text": "buy milk" }
app.post("/api/todos", async (req, res) => {
    let newTodo = {
        text: req.body.text
    };

    // Mongo gives every new document a unique _id
    await todos.insertOne(newTodo);

    let cursor = todos.find({});
    let allTodos = await cursor.toArray();
    res.json(allTodos);
});


// MODIFY: PUT /api/todos/<id>   with a body like { "text": "buy oat milk" }
// :id in the path means "whatever is here, call it id". Express puts it in req.params.id
app.put("/api/todos/:id", async (req, res) => {
    // _id is stored as an ObjectId, not a plain string, so we convert it
    let id = new ObjectId(req.params.id);

    // First object: which document. Second object: what to change.
    // $set means "change just these fields, leave the rest alone"
    await todos.updateOne({ _id: id }, { $set: { text: req.body.text } });

    let cursor = todos.find({});
    let allTodos = await cursor.toArray();
    res.json(allTodos);
});


// DELETE: DELETE /api/todos/<id>
app.delete("/api/todos/:id", async (req, res) => {
    let id = new ObjectId(req.params.id);

    await todos.deleteOne({ _id: id });

    let cursor = todos.find({});
    let allTodos = await cursor.toArray();
    res.json(allTodos);
});

app.post("/todo", async (req, res) => {
    let newTodo = {
        text: req.body.todoText
    };

    await todos.insertOne(newTodo)
});


app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});