const express = require('express');
const { createProduct } = require('../controllers/productcontroller');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/', upload.single('image'), createProduct);

module.exports = router;
