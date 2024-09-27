import { VercelRequest, VercelResponse } from '@vercel/node';
import { getClasses, createClass } from '../src/routes/classRoutes'; 
import { setCorsHeaders } from '../src/utils/handlers';  

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (setCorsHeaders(req, res)) {
    return;
  }

  if (req.method === 'GET') {
    return getClasses(req, res);
  } else if (req.method === 'POST') {
    return createClass(req, res);
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}


