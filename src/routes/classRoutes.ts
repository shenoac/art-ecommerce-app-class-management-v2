import { Router } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();
const pool = new Pool({
  user: process.env.DB_USER,       
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false
  } 
});


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM classes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/', async (req, res) => {
  const { artist_id, class_name, description, price, schedule, max_capacity } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO classes (artist_id, class_name, description, price, schedule, max_capacity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [artist_id, class_name, description, price, schedule, max_capacity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create class' });
  }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { artist_id, class_name, description, price, schedule, max_capacity } = req.body;
    try {
      const result = await pool.query(
        `UPDATE classes 
         SET artist_id = $1, class_name = $2, description = $3, price = $4, schedule = $5, max_capacity = $6 
         WHERE id = $7 
         RETURNING *`,
        [artist_id, class_name, description, price, schedule, max_capacity, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Class not found' });
      }
  
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update class' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query(
        'DELETE FROM classes WHERE id = $1 RETURNING *',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Class not found' });
      }
  
      res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete class' });
    }
  });
  
  

export default router;
