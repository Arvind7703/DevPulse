import express, { Request, Response } from 'express';
import authRoutes from './modules/auth/auth.routes';
import projectRoutes from './modules/projects/project.routes';
import metricRoute from './modules/metrics/metric.routes';
import errorRoute from './modules/errors/error.routes';
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/globalError.middalware';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/metrics', metricRoute);
app.use('/api/v1/errors', errorRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Backend');
});

app.use(errorMiddleware)

export default app;
