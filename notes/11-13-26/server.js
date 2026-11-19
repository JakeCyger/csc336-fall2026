import express from "express";

const app = express();
const port = 3000;

let foods = [];

app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
});

app.get("/demo", (req, res) => {
    console.log("DEMO REQUEST ON THE SERVER!");
    let jsonObj = {
        message: "THIS IS FROM THE SERVER"
    }
    res.json(jsonObj);
});

app.get("/food", (req, res) => {
    let foodFromURL = req.query.food;
    let userFromURL = req.query.user;
    foods.push(foodFromURL + " " + userFromURL);
    console.log(foods);
});

app.post("/food", (req, res) => {
    console.log(req.body);
});