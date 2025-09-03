const express = require('express');
const router = express.Router();
const CV = require('../models/CV');
const { v4: uuidv4 } = require('uuid');

// Get all CVs for a user
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'anonymous';
    const cvs = await CV.find({ userId }).sort({ createdAt: -1 });
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific CV
router.get('/:id', async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new CV
router.post('/', async (req, res) => {
  try {
    const { name, data, template, userId } = req.body;
    
    const cv = new CV({
      userId: userId || 'anonymous',
      name,
      data,
      template: template || 'modern'
    });
    
    const savedCV = await cv.save();
    res.status(201).json(savedCV);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a CV
router.put('/:id', async (req, res) => {
  try {
    const { name, data, template } = req.body;
    
    const cv = await CV.findByIdAndUpdate(
      req.params.id,
      { name, data, template },
      { new: true, runValidators: true }
    );
    
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    
    res.json(cv);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a CV
router.delete('/:id', async (req, res) => {
  try {
    const cv = await CV.findByIdAndDelete(req.params.id);
    
    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }
    
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Duplicate a CV
router.post('/:id/duplicate', async (req, res) => {
  try {
    const originalCV = await CV.findById(req.params.id);
    
    if (!originalCV) {
      return res.status(404).json({ message: 'CV not found' });
    }
    
    const duplicatedCV = new CV({
      userId: originalCV.userId,
      name: `${originalCV.name} (Copy)`,
      data: originalCV.data,
      template: originalCV.template
    });
    
    const savedCV = await duplicatedCV.save();
    res.status(201).json(savedCV);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;