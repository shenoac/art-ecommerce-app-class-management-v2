
import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import { createReview } from '../src/routes/reviewRoutes';  // Import the individual handler

const mongoUri: string = process.env.MONGODB_URI || 'mongodb+srv://shenoachee:qang3gdPEQYsSs8k@cluster0.aqryt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(mongoUri);
    }

    if (req.method === 'POST') {
      return createReview(req, res);  // Handle the POST request
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (err) {
    const error = err as Error;  // Explicitly cast the error to the Error type
    console.error(error.message);
    res.status(500).json({ message: 'Failed to handle reviews', error: error.message });
  }
  
}
