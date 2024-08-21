const express = require('express');
const router = express.Router();
const Review = require('../modles/Review');

// Get reviews for an item
router.get('/:itemId', async (req, res) => {
  try {
    const reviews = await Review.find({ itemId: req.params.itemId });
    res.json(reviews);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Post a new review
router.post('/', async (req, res) => {
  try {
    const newReview = new Review(req.body);
    const review = await newReview.save();
    res.json(review);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
