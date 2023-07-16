const express = require('express');
const router = express.Router();
const TestPaperQuestion = require('../models/testPaperQuestion');

// GET /test_paper_questions
router.get('/', (req, res) => {
  TestPaperQuestion.find()
    .then((questions) => {
      res.json(questions);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch test paper questions' });
    });
});

// GET /test_paper_questions/:id
router.get('/:id', (req, res) => {
  const questionId = req.params.id;
  TestPaperQuestion.findById(questionId)
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

// POST /test_paper_questions
router.post('/', (req, res) => {
  const data = req.body;
  const testPaperQuestion = new TestPaperQuestion(data);
  testPaperQuestion
    .save()
    .then((savedQuestion) => {
      res.status(201).json({ message: 'Question created', question: savedQuestion });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create question' });
    });
});

// PUT /test_paper_questions/:id
router.put('/:id', (req, res) => {
  const questionId = req.params.id;
  const data = req.body;
  TestPaperQuestion.findByIdAndUpdate(questionId, data, { new: true })
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

// DELETE /test_paper_questions/:id
router.delete('/:id', (req, res) => {
  const questionId = req.params.id;
  TestPaperQuestion.findByIdAndDelete(questionId)
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
