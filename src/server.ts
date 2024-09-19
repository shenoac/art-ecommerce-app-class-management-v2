import express from 'express';
import classRoutes from './routes/classRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse incoming JSON
app.use('/classes', classRoutes); // Attach the class routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
