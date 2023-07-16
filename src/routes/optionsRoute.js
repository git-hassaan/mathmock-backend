const express = require('express');
const router = express.Router();
const Option = require('../models/option');

// GET /options
router.get('/', (req, res) => {
  Option.find()
    .then((options) => {
      res.json(options);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch options' });
    });
});

// GET /options/:id
router.get('/:id', (req, res) => {
  const optionId = req.params.id;
  Option.findById(optionId)
    .then((option) => {
      if (!option) {
        res.status(404).json({ error: 'Option not found' });
      } else {
        res.json(option);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch option' });
    });
});

// POST /options
router.post('/', (req, res) => {
  const data = req.body;
  const option = new Option(data);
  option
    .save()
    .then((savedOption) => {
      res.status(201).json({ message: 'Option created', option: savedOption });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create option' });
    });
});

// PUT /options/:id
router.put('/:id', (req, res) => {
  const optionId = req.params.id;
  const data = req.body;
  Option.findByIdAndUpdate(optionId, data, { new: true })
    .then((updatedOption) => {
      if (!updatedOption) {
        res.status(404).json({ error: 'Option not found' });
      } else {
        res.json({ message: 'Option updated', option: updatedOption });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update option' });
    });
});

// DELETE /options/:id
router.delete('/:id', (req, res) => {
  const optionId = req.params.id;
  Option.findByIdAndDelete(optionId)
    .then((deletedOption) => {
      if (!deletedOption) {
        res.status(404).json({ error: 'Option not found' });
      } else {
        res.json({ message: 'Option deleted', option: deletedOption });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete option' });
    });
});

module.exports = router;
