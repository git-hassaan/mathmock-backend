const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// GET /questions
router.get('/', (req, res) => {
  Question.find()
    .then((questions) => {
      res.json(questions);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch questions' });
    });
});

// GET /questions/:id
router.get('/:id', (req, res) => {
  const questionId = req.params.id;
  Question.findById(questionId)
    .then((question) => {
      if (!question) {
        res.status(404).json({ error: 'Question not found' });
      } else {
        res.json(question);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch question' });
    });
});

// POST /questions
router.post('/', (req, res) => {
  const data = req.body;
  const question = new Question(data);
  question
    .save()
    .then((savedQuestion) => {
      res.status(201).json({ message: 'Question created', question: savedQuestion });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create question' });
    });
});

// PUT /questions/:id
router.put('/:id', (req, res) => {
  const questionId = req.params.id;
  const data = req.body;
  Question.findByIdAndUpdate(
    questionId,
    data,
    { new: true }
  )
    .then((updatedQuestion) => {
      if (!updatedQuestion) {
        res.status(404).json({ error: 'Question not found' });
      } else {
        res.json({ message: 'Question updated', question: updatedQuestion });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update question' });
    });
});

// DELETE /questions/:id
router.delete('/:id', (req, res) => {
  const questionId = req.params.id;
  Question.findByIdAndDelete(questionId)
    .then((deletedQuestion) => {
      if (!deletedQuestion) {
        res.status(404).json({ error: 'Question not found' });
      } else {
        res.json({ message: 'Question deleted', question: deletedQuestion });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete question' });
    });
});

module.exports = router;
