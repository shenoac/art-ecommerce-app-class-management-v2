
import { VercelRequest, VercelResponse } from '@vercel/node';
import Joi from 'joi';
import mongoose from 'mongoose';
import Review from '../models/reviewModel';

// Validation schema
const reviewSchema = Joi.object({
  studentId: Joi.string().required(),
  classId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comments: Joi.string().max(500).required()
});

// Create a review (POST /reviews)
export async function createReview(req: VercelRequest, res: VercelResponse) {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Validation Error', error: error.details });
  }

  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
}
