import { Router } from 'express';
import * as GameController from './games.controller';
import { validate } from '../../core/middlewares/validate'; // Middleware de validação que criaremos
import { createGameSchema, updateGameSchema } from './games.schemas';
import { createReview, getReviewsByGame } from '../reviews/reviews.controller';
import { createReviewSchema } from '../reviews/reviews.schemas';
import { protect } from '../../core/middlewares/protect.middleware';

const router = Router();

//Rotas de Games
router.post('/', validate(createGameSchema), GameController.createGame);
router.get('/', GameController.getAllGames);
router.get('/:id', GameController.getGameById);
router.put('/:id', validate(updateGameSchema), GameController.updateGame);
router.delete('/:id', GameController.deleteGame);

//Rotas de Review
router.get('/:gameId/reviews', getReviewsByGame);
router.post(
  '/:gameId/reviews',
  protect, // Middleware de autenticação
  validate(createReviewSchema), // Middleware de validação
  createReview
);

export default router;