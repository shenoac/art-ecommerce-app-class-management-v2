import express from 'express';
import Joi from 'joi';
import Review  from '../models/reviewModel';
import { errorHandler } from '../middleware/errorHandler'; 

const router = express.Router();


const reviewSchema = Joi.object({
  studentId: Joi.string().required(),
  classId: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comments: Joi.string().max(500).required()
});


router.post('/', async (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    return next(error); 
  }

  try {
    const review = new Review(req.body);
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    next(err); 
  }
});


router.use(errorHandler);

export default router;
