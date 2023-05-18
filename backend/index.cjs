const express = require("express");
const app = express();
const PORT = 4030;

let animals = [];

app.use(express.json());
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

app.post("/api/animal/", (req, res) => {

  const { name, bday } = req.body;

  animals.push({ id: animals.length, name: name, birthday: bday, show: false });
  return res.status(201).json(animals);
});

app.get("/api/animal", (req, res) => {
  return res.status(200).json(animals);
});

app.get("/api/animal/:id", (req, res) => {
  return res.status(200).json(animals[req.params.id]);
});


app.delete("/api/animal/:id" , (req, res) => {
  const idx = Number(req.params.id)
  animals = animals.filter((el, i) => i !== idx)

  return res.status(200).json(animals)
})