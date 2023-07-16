const express = require('express');
const router = express.Router();
const Year = require('../models/year');

// GET /years
router.get('/', (req, res) => {
  Year.find()
    .then((years) => {
      res.json(years);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch years' });
    });
});

// GET /years/:id
router.get('/:id', (req, res) => {
  const yearId = req.params.id;
  Year.findById(yearId)
    .then((year) => {
      if (!year) {
        res.status(404).json({ error: 'Year not found' });
      } else {
        res.json(year);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch year' });
    });
});

// POST /years
router.post('/', (req, res) => {
  const data = req.body;
  const year = new Year(data);
  year
    .save()
    .then((savedYear) => {
      res.status(201).json({ message: 'Year created', year: savedYear });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create year' });
    });
});

// PUT /years/:id
router.put('/:id', (req, res) => {
  const yearId = req.params.id;
  const data = req.body;
  Year.findByIdAndUpdate(yearId, data, { new: true })
    .then((updatedYear) => {
      if (!updatedYear) {
        res.status(404).json({ error: 'Year not found' });
      } else {
        res.json({ message: 'Year updated', year: updatedYear });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update year' });
    });
});

// DELETE /years/:id
router.delete('/:id', (req, res) => {
  const yearId = req.params.id;
  Year.findByIdAndDelete(yearId)
    .then((deletedYear) => {
      if (!deletedYear) {
        res.status(404).json({ error: 'Year not found' });
      } else {
        res.json({ message: 'Year deleted', year: deletedYear });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete year' });
    });
});

module.exports = router;
