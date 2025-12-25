const Category = require('../models/Category');

// ADD CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const exist = await Category.findOne({ name });
    if (exist) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({ name });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error creating category' });
  }
};

// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
