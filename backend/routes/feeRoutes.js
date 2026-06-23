const express = require('express');
const Fee = require('../models/Fee');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all fees (Admin) or user's fees
router.get('/', authMiddleware, async (req, res) => {
  try {
    let fees;
    if (req.user.role === 'admin') {
      fees = await Fee.find()
        .populate('residentId', '-password')
        .populate('roomId');
    } else {
      fees = await Fee.find({ residentId: req.user.id })
        .populate('roomId');
    }
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create fee (Admin only)
router.post('/', adminMiddleware, async (req, res) => {
  try {
    const { residentId, roomId, amount, feeType, month, dueDate } = req.body;

    const fee = new Fee({
      residentId,
      roomId,
      amount,
      feeType,
      month,
      dueDate
    });

    await fee.save();
    await fee.populate('residentId', '-password').populate('roomId');

    res.status(201).json(fee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark fee as paid
router.put('/:id/pay', authMiddleware, async (req, res) => {
  try {
    const { paymentMethod, transactionId } = req.body;

    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      {
        status: 'paid',
        paidDate: Date.now(),
        paymentMethod,
        transactionId,
        updatedAt: Date.now()
      },
      { new: true }
    ).populate('residentId', '-password').populate('roomId');

    if (!fee) {
      return res.status(404).json({ error: 'Fee not found' });
    }
    res.json(fee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fee by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id)
      .populate('residentId', '-password')
      .populate('roomId');

    if (!fee) {
      return res.status(404).json({ error: 'Fee not found' });
    }
    res.json(fee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
