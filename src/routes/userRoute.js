const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /users
router.get('/', (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch users' });
    });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user' });
    });
});

// POST /users
router.post('/', (req, res) => {
  const data = req.body;
  const user = new User(data);
  user
    .save()
    .then((savedUser) => {
      res.status(201).json({ message: 'User created', user: savedUser });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create user' });
    });
});

// PUT /users/:id
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  User.findByIdAndUpdate(userId, data, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User updated', user: updatedUser });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update user' });
    });
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
  const userId = req.params.id;
  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted', user: deletedUser });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete user' });
    });
});

module.exports = router;
