const express = require('express');
const Review = require('../models/review');
const Product = require('../models/product');
const router = express.Router();

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const { productId, text, rating } = req.body;
    if (!productId || !text || !rating) return res.status(400).json({ message: 'All fields required' });

    // Проверяем, что продукт существует
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const review = await Review.create({ productId, text, rating });
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
});

// READ ALL (с продуктом)
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.find().populate('productId');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// READ ONE
router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate('productId');
    if (!review) return res.status(404).json({ message: 'Not found' });
    res.json(review);
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ message: 'Not found' });
    res.json(review);
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
