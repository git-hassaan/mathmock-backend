const express = require('express');
const router = express.Router();
const TestPaper = require('../models/testPaper');

// GET /testPapers
router.get('/', (req, res) => {
  TestPaper.find()
    .then((testPapers) => {
      res.json(testPapers);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch test papers' });
    });
});

// GET /testPapers/:id
router.get('/:id', (req, res) => {
  const testPaperId = req.params.id;
  TestPaper.findById(testPaperId)
    .then((testPaper) => {
      if (!testPaper) {
        res.status(404).json({ error: 'Test paper not found' });
      } else {
        res.json(testPaper);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch test paper' });
    });
});

// POST /testPapers
router.post('/', (req, res) => {
  const data = req.body;
  const testPaper = new TestPaper(data);
  testPaper
    .save()
    .then((savedTestPaper) => {
      res.status(201).json({ message: 'Test paper created', testPaper: savedTestPaper });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create test paper' });
    });
});

// PUT /testPapers/:id
router.put('/:id', (req, res) => {
  const testPaperId = req.params.id;
  const data = req.body;
  TestPaper.findByIdAndUpdate(
    testPaperId,
    data,
    { new: true }
  )
    .then((updatedTestPaper) => {
      if (!updatedTestPaper) {
        res.status(404).json({ error: 'Test paper not found' });
      } else {
        res.json({ message: 'Test paper updated', testPaper: updatedTestPaper });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update test paper' });
    });
});

// DELETE /testPapers/:id
router.delete('/:id', (req, res) => {
  const testPaperId = req.params.id;
  TestPaper.findByIdAndDelete(testPaperId)
    .then((deletedTestPaper) => {
      if (!deletedTestPaper) {
        res.status(404).json({ error: 'Test paper not found' });
      } else {
        res.json({ message: 'Test paper deleted', testPaper: deletedTestPaper });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete test paper' });
    });
});

module.exports = router;
