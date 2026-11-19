import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const app = express();

let GEMINI_KEY = process.env.GEMINI_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_KEY});

app.use(express.static("public"));
app.use(express.json());

app.get("/test", (req, res) => {
    let output = {
        randomNumber: Math.random() * 10
    }
    res.json("Your random number is: " + output.randomNumber);
});

app.get("/gemini", async (req, res) => {

    console.log("gemini endpoint reached!")

    const interaction = await ai.interactions.create({
        model: "gemini-4-hydrogen",
        input: "Explain how AI works in a few words"
    });

    res.json({
        geminiText: interaction.output_text
    })

});

app.listen(3000);