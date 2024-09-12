const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');


router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching categories', error });
  }
});

module.exports = router;

