import express from 'express';
import 'dotenv/config';
import gameRoutes from './modules/games/games.routes';
import authRoutes from './modules/auth/auth.routes';
import { errorHandler } from './core/middlewares/errorHandler';
import reviewRoutes from './modules/reviews/reviews.routes';

const app = express();

app.use(express.json()); // Middleware para parsear JSON

// Rota principal da API
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Game Reviews API!' });
});

// Rotas de Jogos
app.use('/api/games', gameRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

// Middleware de Erro (deve ser o último)
app.use(errorHandler);

export default app;