const express = require('express');
const router = express.Router();
const Marks = require('../models/marks');

// GET /marks
router.get('/', (req, res) => {
  Marks.find()
    .then((marks) => {
      res.json(marks);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch marks' });
    });
});

// GET /marks/:id
router.get('/:id', (req, res) => {
  const markId = req.params.id;
  Marks.findById(markId)
    .then((mark) => {
      if (!mark) {
        res.status(404).json({ error: 'Mark not found' });
      } else {
        res.json(mark);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch mark' });
    });
});

// POST /marks
router.post('/', (req, res) => {
  const data = req.body;
  const mark = new Marks(data);
  mark
    .save()
    .then((savedMark) => {
      res.status(201).json({ message: 'Mark created', mark: savedMark });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create mark' });
    });
});

// PUT /marks/:id
router.put('/:id', (req, res) => {
  const markId = req.params.id;
  const data = req.body;
  Marks.findByIdAndUpdate(markId, data, { new: true })
    .then((updatedMark) => {
      if (!updatedMark) {
        res.status(404).json({ error: 'Mark not found' });
      } else {
        res.json({ message: 'Mark updated', mark: updatedMark });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update mark' });
    });
});

// DELETE /marks/:id
router.delete('/:id', (req, res) => {
  const markId = req.params.id;
  Marks.findByIdAndDelete(markId)
    .then((deletedMark) => {
      if (!deletedMark) {
        res.status(404).json({ error: 'Mark not found' });
      } else {
        res.json({ message: 'Mark deleted', mark: deletedMark });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete mark' });
    });
});

module.exports = router;
