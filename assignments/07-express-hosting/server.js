import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get('/about', (req, res) => {
  res.send('This is a brawl arena for pokemon using their attack, health, and speed.');
})

app.listen(port);