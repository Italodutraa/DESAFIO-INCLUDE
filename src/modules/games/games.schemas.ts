import { z } from 'zod';

const gameBodySchema = z.object({
  title: z.string({ required_error: 'Title is required' }).min(2, 'Title must be at least 2 characters long'),
  genre: z.string({ required_error: 'Genre is required' }),
  platforms: z.array(z.string()).min(1, 'At least one platform is required'),
  cover_url: z.string({ required_error: 'Cover URL is required' }).url('Must be a valid URL'),
  release_date: z.string({ required_error: 'Release date is required' }).datetime('Must be a valid ISO date string'),
});

// 2. O schema de criação usa o schema base, exigindo todos os campos
export const createGameSchema = z.object({
  body: gameBodySchema,
});

// 3. O schema de atualização aplica o .deepPartial() diretamente no schema base
export const updateGameSchema = z.object({
  body: gameBodySchema.partial(), // <-- A CORREÇÃO ESTÁ AQUI
});