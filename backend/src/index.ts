import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import podcastSummaryRoutes from './routes/podcastSummaryRoutes';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/podcast-summary', podcastSummaryRoutes);

// Root test route
app.get('/', (req: Request, res: Response): void => {
  res.send('StudyPod API is running - Convert your study materials to podcasts!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});