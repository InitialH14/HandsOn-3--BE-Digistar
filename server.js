const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let users = [];

app.use(bodyParser.json());

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    users = users.map(u => (u.id === id ? user : u));
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== id);
    res.status(204).end();
});

app.get('/users/search', (req, res) => {
    const { name } = req.query; 
    if (!name) {
      return res.status(400).send({ message: "Name query parameter is required" });
    }
    const filteredUsers = users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    res.json(filteredUsers);
  });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});