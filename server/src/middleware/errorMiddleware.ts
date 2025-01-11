import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
    return;
  }

  // MongoDB ObjectId casting error
  if (err.name === 'CastError') {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid ID format'
    });
    return;
  }

  // MongoDB validation error
  if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid input data'
    });
    return;
  }

  // MongoDB duplicate key error
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    res.status(400).json({
      status: 'fail',
      message: 'Duplicate field value'
    });
    return;
  }

  // Default error
  console.error('ERROR 💥', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  });
};