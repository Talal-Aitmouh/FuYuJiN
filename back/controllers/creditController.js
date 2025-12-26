const Credit = require('../models/Credit');
const Order = require('../models/Order');

// GET all open credits
exports.getCredits = async (req, res) => {
  try {
    const credits = await Credit.find({ status: 'open' })
      .populate('client_id')
      .populate('order_id')
      .sort({ createdAt: -1 });

    res.json(credits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PAY credit
exports.payCredit = async (req, res) => {
  try {
    const { credit_id, amount } = req.body;

    const credit = await Credit.findById(credit_id);
    if (!credit) {
      return res.status(404).json({ message: 'Credit not found' });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    if (amount > credit.remaining) {
      return res.status(400).json({ message: 'Amount exceeds remaining credit' });
    }

    // 1️⃣ Update credit
    credit.remaining -= amount;
    if (credit.remaining === 0) {
      credit.status = 'closed';
    }
    await credit.save();

    // 2️⃣ Update order paid
    const order = await Order.findById(credit.order_id);
    order.paid += amount;
    order.status = order.paid >= order.total ? 'paid' : 'partial';
    await order.save();

    res.json({ message: 'Payment added successfully', credit, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
