import express from 'express'; // get app

const app = express(); // start the app
const port = process.env.PORT || 3000; // look for the express port or use the default 3000 port to test on local computer

app.use(express.static("public")); // use the public folder which has the files

app.get('/about', (req, res) => { // about the website
  res.send('This is a brawl arena for pokemon using their attack, health, and speed.');
})

app.listen(port); // make express listen to the port or the local 3000 port