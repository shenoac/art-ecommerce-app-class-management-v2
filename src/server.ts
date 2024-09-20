import express from 'express';
import mongoose from 'mongoose';
import classRoutes from './routes/classRoutes';
import reviewRoutes from './routes/reviewRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

const mongoUri: string = 'mongodb+srv://shenoachee:qang3gdPEQYsSs8k@cluster0.aqryt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


app.use(express.json()); 
app.use('/classes', classRoutes);
app.use('/reviews', reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
