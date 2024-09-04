const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// Dodavanje nove kategorije
router.post('/create-category', async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error });
  }
});

// Prikaz svih kategorija
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching categories', error });
  }
});

// Prikaz pojedinačne kategorije
router.get('/category/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching category', error });
  }
});

// Ažuriranje kategorije
router.put('/category/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error });
  }
});

// Brisanje kategorije
router.delete('/category/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting category', error });
  }
});

module.exports = router;

