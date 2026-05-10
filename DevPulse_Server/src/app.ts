import express, { Request, Response } from 'express';
import authRoutes from './modules/auth/auth.routes';
import projectRoutes from './modules/projects/project.routes';
import metricRoute from './modules/metrics/metric.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/v1/api/auth', authRoutes);
app.use('/v1/api/project', projectRoutes);
app.use('/v1/api/metric', metricRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Backend');
});

export default app;
