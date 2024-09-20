import express from 'express';
import Joi from 'joi';
import Review  from '../models/reviewModel'; // Import your MongoDB model

const router = express.Router();

// Define a Joi schema for the review
const reviewSchema = Joi.object({
  studentId: Joi.string().required(),
  classId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comments: Joi.string().optional(),
});

// Create a review route with validation
router.post('/', async (req, res) => {
  // Validate the incoming request data
  const { error, value } = reviewSchema.validate(req.body);
  
  if (error) {
    // If validation fails, return an error response
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    // If validation succeeds, create a new review using the validated data
    const newReview = new Review(value);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

export default router;
