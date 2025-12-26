const Order = require('../models/Order');
const Product = require('../models/Product');
const Credit = require('../models/Credit');

// CREATE order (cash OR credit)
exports.createOrder = async (req, res) => {
  try {
    const { client_id, items, paid } = req.body;

    let total = 0;

    // 1️⃣ Check stock + calculate total
    for (let item of items) {
      const product = await Product.findById(item.product_id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `Stock insufficient for ${product.name}` });
      }

      total += item.quantity * item.price;
    }

    // 2️⃣ Create order
    const order = await Order.create({
      client_id: client_id || null,
      items,
      total,
      paid: paid || 0,
      status:
        paid >= total
          ? 'paid'
          : paid > 0
          ? 'partial'
          : 'unpaid'
    });

    // 3️⃣ Update stock
    for (let item of items) {
      await Product.findByIdAndUpdate(item.product_id, {
        $inc: { stock: -item.quantity }
      });
    }

    // 4️⃣ Create credit if needed
    if (order.status !== 'paid' && client_id) {
      await Credit.create({
        order_id: order._id,
        client_id,
        total,
        remaining: total - order.paid
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('client_id')
      .populate('items.product_id')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
