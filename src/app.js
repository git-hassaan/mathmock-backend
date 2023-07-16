const express = require('express');
const app = express();  
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DB_URI;


mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
  app.use(express.json());



    // Years Router
    const yearsRouter = require('./routes/yearsRoute');
    const testPapersRouter = require('./routes/testPapersRoute');
    const questionsRouter = require('./routes/questionsRoute');
    const optionsRouter = require('./routes/optionsRoute');
    const usersRouter = require('./routes/userRoute');
    const referralRouter = require('./routes/referralRoute');
    const marksRouter = require('./routes/marksRoute');
    const testPaperQuestionsRouter = require('./routes/testPaperQuestionsRoute');




    app.use('/years', yearsRouter);
    app.use('/testPapers', testPapersRouter);
    app.use('/questions', questionsRouter);
    app.use('/options', optionsRouter);
    app.use('/users', usersRouter);
    app.use('/referrals', referralRouter);
    app.use('/marks', marksRouter);
    app.use('/testPaperQuestions', testPaperQuestionsRouter);





    // Default Route
    app.get('/', (req, res) => {
      res.send('Hello, world!');
    });

    // Start the server
    const port = 4000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
