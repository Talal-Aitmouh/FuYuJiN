const express = require('express');
const {
  createCategory,
  getCategories
} = require('../controllers/category.controller');

const router = express.Router();

router.post('/', createCategory);   // add
router.get('/', getCategories);     // list

module.exports = router;
