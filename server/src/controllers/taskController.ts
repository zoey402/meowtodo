import { Request, Response, NextFunction } from 'express';
import Task from '../models/Task';
import { AppError } from '../utils/AppError';

// Define interfaces
interface TaskParams {
  id: string;
}

interface CreateTaskBody {
  title: string;
  description: string;
}

interface UpdateTaskBody extends CreateTaskBody {
  status?: 'pending' | 'completed';
}

// Get all tasks
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Get single task
export const getTask = async (
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      throw new AppError('Task not found', 404);
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Create task
export const createTask = async (
  req: Request<{}, {}, CreateTaskBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      throw new AppError('Title and description are required', 400);
    }

    const task = new Task({
      title,
      description,
      status: 'pending'
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (
  req: Request<TaskParams, {}, UpdateTaskBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, description, status } = req.body;
    
    if (!title && !description && !status) {
      throw new AppError('Please provide title, description or status to update', 400);
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

// Delete task
export const deleteTask = async (
  req: Request<TaskParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      throw new AppError('Task not found', 404);
    }

    res.json({
      status: 'success',
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};