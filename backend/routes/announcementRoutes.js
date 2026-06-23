const express = require('express');
const Announcement = require('../models/Announcement');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all active announcements
router.get('/', authMiddleware, async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true })
      .populate('author', '-password')
      .sort({ publishedAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create announcement (Admin only)
router.post('/', adminMiddleware, async (req, res) => {
  try {
    const { title, content, category, priority, targetAudience, image, expiresAt } = req.body;

    const announcement = new Announcement({
      title,
      content,
      author: req.user.id,
      category,
      priority,
      targetAudience,
      image,
      expiresAt
    });

    await announcement.save();
    await announcement.populate('author', '-password');

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update announcement (Admin only)
router.put('/:id', adminMiddleware, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    ).populate('author', '-password');

    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete announcement (Admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
