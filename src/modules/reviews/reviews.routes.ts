import { Router } from 'express';
import { deleteReview } from './reviews.controller';
import { protect } from '../../core/middlewares/protect.middleware';

const router = Router();

// DELETE /api/reviews/:reviewId
router.delete('/:reviewId', protect, deleteReview);

export default router;