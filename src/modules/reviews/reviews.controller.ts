import { Request, Response, NextFunction } from 'express';
import * as ReviewService from './reviews.service';

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    const userId = req.user!.id; // ! para afirmar que req.user existe (garantido pelo middleware 'protect')

    const review = await ReviewService.create(gameId, userId, req.body);
    res.status(201).json(review);
  } catch (error: any) {
    if (error.message === 'Game not found') {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
};

export const getReviewsByGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { gameId } = req.params;
    const reviews = await ReviewService.findByGameId(gameId);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user!.id;

    await ReviewService.remove(reviewId, userId);
    res.status(204).send(); // Sucesso, sem conteúdo
  } catch (error: any) {
    if (error.message === 'Review not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Forbidden') {
      return res.status(403).json({ message: 'You are not authorized to delete this review' });
    }
    next(error);
  }
};