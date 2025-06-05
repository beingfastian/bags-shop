import express, { Request, Response } from 'express';
import * as path from 'path';
import { LocationMiddleware } from './middlewares/locationMiddleware.js';

const app = express();
app.use(express.json());
app.use(LocationMiddleware);

app.set('json spaces', 2);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Bags Shop API!');
});

const uploadPath = path.join(process.cwd(), '/uploads');
app.use('/upload', express.static(uploadPath));

export default app;
