import "dotenv/config";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

let app = express();
let port = process.env.PORT || 3000

app.use(express.static("public"));
app.use(express.json());

let client = new MongoClient(process.env.MONGODB_URI)
await client.connect();
console.log("Connected to MongoDB");

let database = client.db("APIGame")
let data = database.collection("data")

app.listen(port, () => {
    console.log("Server running at http://localhost:" + port);
});