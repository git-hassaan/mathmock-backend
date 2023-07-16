const express = require('express');
const router = express.Router();
const Referral = require('../models/referral');

// GET /referrals
router.get('/', (req, res) => {
  Referral.find()
    .then((referrals) => {
      res.json(referrals);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch referrals' });
    });
});

// GET /referrals/:id
router.get('/:id', (req, res) => {
  const referralId = req.params.id;
  Referral.findById(referralId)
    .then((referral) => {
      if (!referral) {
        res.status(404).json({ error: 'Referral not found' });
      } else {
        res.json(referral);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch referral' });
    });
});

// POST /referrals
router.post('/', (req, res) => {
  const data = req.body;
  const referral = new Referral(data);
  referral
    .save()
    .then((savedReferral) => {
      res.status(201).json({ message: 'Referral created', referral: savedReferral });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to create referral' });
    });
});

// PUT /referrals/:id
router.put('/:id', (req, res) => {
  const referralId = req.params.id;
  const data = req.body;
  Referral.findByIdAndUpdate(referralId, data, { new: true })
    .then((updatedReferral) => {
      if (!updatedReferral) {
        res.status(404).json({ error: 'Referral not found' });
      } else {
        res.json({ message: 'Referral updated', referral: updatedReferral });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to update referral' });
    });
});

// DELETE /referrals/:id
router.delete('/:id', (req, res) => {
  const referralId = req.params.id;
  Referral.findByIdAndDelete(referralId)
    .then((deletedReferral) => {
      if (!deletedReferral) {
        res.status(404).json({ error: 'Referral not found' });
      } else {
        res.json({ message: 'Referral deleted', referral: deletedReferral });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete referral' });
    });
});

module.exports = router;
