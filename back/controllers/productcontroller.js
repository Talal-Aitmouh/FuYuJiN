const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock, category_id } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      category_id,
      image: req.file ? req.file.path : null // 👈 هنا image
    });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product' });
  }
};
