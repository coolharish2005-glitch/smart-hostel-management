const express = require('express');
const Complaint = require('../models/Complaint');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all complaints (Admin) or user's complaints
router.get('/', authMiddleware, async (req, res) => {
  try {
    let complaints;
    if (req.user.role === 'admin') {
      complaints = await Complaint.find()
        .populate('residentId', '-password')
        .populate('roomId')
        .populate('assignedTo', '-password');
    } else {
      complaints = await Complaint.find({ residentId: req.user.id })
        .populate('residentId', '-password')
        .populate('roomId');
    }
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create complaint
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { roomId, title, description, category, priority, images } = req.body;

    const complaint = new Complaint({
      residentId: req.user.id,
      roomId,
      title,
      description,
      category,
      priority,
      images
    });

    await complaint.save();
    await complaint.populate('residentId', '-password');

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update complaint status (Admin only)
router.put('/:id', adminMiddleware, async (req, res) => {
  try {
    const { status, assignedTo, resolution } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status,
        assignedTo,
        resolution,
        resolvedAt: status === 'resolved' ? Date.now() : null,
        updatedAt: Date.now()
      },
      { new: true }
    ).populate('residentId', '-password').populate('assignedTo', '-password');

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get complaint by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate('residentId', '-password')
      .populate('roomId')
      .populate('assignedTo', '-password');

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
