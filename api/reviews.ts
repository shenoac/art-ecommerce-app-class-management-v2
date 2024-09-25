import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import { createReview } from '../src/routes/reviewRoutes';  // Import the individual handler

const mongoUri: string = process.env.MONGODB_URI || '';
let cachedConnection: typeof mongoose | null = null; // Cache the connection

// Function to connect to MongoDB
async function connectToDatabase() {
  console.time('MongoDB Connection Start');
  if (cachedConnection && cachedConnection.connection.readyState === 1) {
    console.log('=> Using existing MongoDB connection');
    console.timeEnd('MongoDB Connection Start');  // Log time to use cached connection
    return;
  }

  // Otherwise, create a new connection
  try {
    cachedConnection = await mongoose.connect(mongoUri);
    console.log('=> New MongoDB connection established');
  } catch (error) {
    console.error('=> MongoDB connection error:', error);
  }
  console.timeEnd('MongoDB Connection Start');  // Log time to establish new connection
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.time('Function Execution Time');  // Log function execution time
  try {
    console.log('=> Connecting to MongoDB');
    await connectToDatabase();  // Ensure MongoDB is connected

    if (req.method === 'POST') {
      console.log('=> Handling POST request');
      return createReview(req, res);  // Handle the POST request
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (err) {
    const error = err as Error;  // Explicitly cast the error to the Error type
    console.error('=> Error in function:', error.message);
    res.status(500).json({ message: 'Failed to handle reviews', error: error.message });
  }
  console.timeEnd('Function Execution Time');  // Log end of function execution
}
