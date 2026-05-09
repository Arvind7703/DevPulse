import express, { Request, Response } from 'express';
import authRoutes from './modules/auth/auth.routes';
import dotenv from "dotenv"

dotenv.config() 

const app = express();

app.use(express.json());
app.use('/v1/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Backend');
});

export default app;
