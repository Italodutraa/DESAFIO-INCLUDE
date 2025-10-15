import { prisma } from '../../core/lib/prisma';
import { Game } from '@prisma/client';

// Tipagem para os dados de criação e atualização
type CreateGameData = Omit<Game, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateGameData = Partial<CreateGameData>;

// CREATE
export const create = async (data: CreateGameData): Promise<Game> => {
  return await prisma.game.create({ data });
};

// READ (All)
export const findAll = async (): Promise<Game[]> => {
  // TODO: Implementar paginação e filtros
  return await prisma.game.findMany();
};

// READ (by ID)
export const findById = async (id: string) => {
  // Retorna o jogo com a média de ratings e o total de reviews
  const game = await prisma.game.findUnique({
    where: { id },
  });

  if (!game) return null;

  const aggregations = await prisma.review.aggregate({
    _avg: { rating: true },
    _count: { id: true },
    where: { gameId: id },
  });

  return {
    ...game,
    averageRating: aggregations._avg.rating || 0,
    reviewsCount: aggregations._count.id || 0,
  };
};

// UPDATE
export const update = async (id: string, data: UpdateGameData): Promise<Game | null> => {
  try {
    return await prisma.game.update({
      where: { id },
      data,
    });
  } catch (error) {
    // Prisma lança um erro P2025 se o registro não for encontrado
    return null;
  }
};

// DELETE
export const remove = async (id: string): Promise<Game | null> => {
  try {
    return await prisma.game.delete({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};