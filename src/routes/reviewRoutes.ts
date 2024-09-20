import { Router } from 'express';
import Review from '../models/reviewModel';  // Import the review model

const router = Router();

// POST route to add a review
router.post('/', async (req, res) => {
  const { studentId, classId, rating, comments } = req.body;

  try {
    const newReview = new Review({ studentId, classId, rating, comments });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Error adding review' });
  }
});

export default router;
