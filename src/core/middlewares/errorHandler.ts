import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Erro de validação do Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: err.issues.map(e => ({ field: e.path.join('.'), message: e.message })),
    });
  }

  // Erro do Prisma (ex: registro não encontrado)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') { // "Record to update not found."
      return res.status(404).json({
        status: 'error',
        message: 'Resource not found',
      });
    }
  }

  // Logar o erro no console para debug em ambiente de desenvolvimento
  console.error(err);

  // Erro genérico para qualquer outra situação
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};