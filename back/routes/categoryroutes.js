const express = require('express');
const {
  createCategory,
  getCategories
} = require('../controllers/categorycontroller');

const router = express.Router();

router.post('/', createCategory);   // add
router.get('/', getCategories);     // list

module.exports = router;
