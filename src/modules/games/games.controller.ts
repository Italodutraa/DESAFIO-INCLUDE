import { Request, Response, NextFunction } from 'express';
import * as GameService from './games.service';

// POST /games
export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newGame = await GameService.create(req.body);
    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

// GET /games
export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const games = await GameService.findAll();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
};

// GET /games/:id
export const getGameById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const game = await GameService.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    next(error);
  }
};

// PUT /games/:id
export const updateGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedGame = await GameService.update(req.params.id, req.body);
    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    next(error);
  }
};

// DELETE /games/:id
export const deleteGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedGame = await GameService.remove(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    next(error);
  }
};