const express = require('express');
const User = require('../models/User');
const Room = require('../models/Room');
const Complaint = require('../models/Complaint');
const Fee = require('../models/Fee');
const { adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Dashboard Statistics
router.get('/dashboard/stats', adminMiddleware, async (req, res) => {
  try {
    const totalResidents = await User.countDocuments({ role: 'resident' });
    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ status: 'occupied' });
    const availableRooms = await Room.countDocuments({ status: 'available' });
    const openComplaints = await Complaint.countDocuments({ status: 'open' });
    const pendingFees = await Fee.countDocuments({ status: 'pending' });
    const totalRevenue = await Fee.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      totalResidents,
      totalRooms,
      occupiedRooms,
      availableRooms,
      occupancyRate: totalRooms > 0 ? ((occupiedRooms / totalRooms) * 100).toFixed(2) : 0,
      openComplaints,
      pendingFees,
      totalRevenue: totalRevenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get revenue report
router.get('/reports/revenue', adminMiddleware, async (req, res) => {
  try {
    const revenue = await Fee.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$paidDate' } },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: -1 } }
    ]);
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
