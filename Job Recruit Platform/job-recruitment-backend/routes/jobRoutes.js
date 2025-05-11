const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/jobs
// @desc    Create a new job (only for employers)
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    // Destructure the fields from the request body
    const { title, description, requirements, location, company } = req.body;

    // Validation: Check if all required fields are provided
    if (!title || !description || !requirements || !location || !company) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create the new job
    const newJob = new Job({
      title,
      description,
      requirements,
      location,
      company,
      createdBy: req.user.id,
    });

    // Save the job to the database
    const savedJob = await newJob.save();

    // Return the saved job data in the response
    res.status(201).json(savedJob);
  } catch (err) {
    // If there's an error, return a 500 error with the message
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   GET /api/jobs
// @desc    Get all job listings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('createdBy', 'name email');
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
