// src/middleware/errorHandler.ts

import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: err.message || 'Something went wrong',
  });
}
