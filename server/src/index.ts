import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import taskRoutes from './routes/taskRoutes';
import { AppError } from './utils/AppError';
import { errorHandler } from './middleware/errorMiddleware';

// Load environment variables
dotenv.config();

// Initialize express
const app: Express = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
app.use((req: Request, res: Response, next: NextFunction) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
 next();
});

// Welcome route
app.get('/', (req: Request, res: Response) => {
 res.json({
   message: 'Welcome to Meow To Do API! 😺',
   status: 'Server is running'
 });
});

// Health check route
app.get('/health', (req: Request, res: Response) => {
 res.json({
   status: 'healthy',
   timestamp: new Date().toISOString(),
   uptime: process.uptime()
 });
});

// Routes
app.use('/api/tasks', taskRoutes);

// Handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
 next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
 console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
 console.log('UNHANDLED REJECTION! 💥 Shutting down...');
 console.log(err.name, err.message);
 process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
 console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
 console.log(err.name, err.message);
 process.exit(1);
});