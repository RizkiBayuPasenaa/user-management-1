const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors())

let users = [];

function addUser(name) {
  const user = { id: users.length + 1, name };
  users.push(user);
}

function getUsers() {
  return users;
}

function deleteUser(id) {
  users = users.filter(user => user.id !== id);
}

app.get('/users', (req, res) => {
  res.json(getUsers());
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  addUser(name);
  res.status(201).json({ message: 'User added' });
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  deleteUser(id);
  res.json({ message: 'User deleted' });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
