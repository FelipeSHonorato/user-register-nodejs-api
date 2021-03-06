const express = require("express");
const User = require("../src/models/userModel");
const userRoutes = require("../src/routes/userRoutes");
const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use((req, res, next) => {
  console.log(`Request Type:${req.method}`);
  console.log(`Content Type:${req.headers["content-type"]}`);
  console.log(`Date Type:${new Date()}`);
  next();
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error.message);
    throw new Error("Nenhum usuário registrado");
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user === null) {
      throw new Error("Nenhum usuário encontrado com esse ID");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndRemove(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 8080;

app.listen(port, () => console.log(`Rodando com express na porta ${port}`));
