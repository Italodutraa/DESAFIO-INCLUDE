import { Router } from 'express';
import { registerController, loginController } from './auth.controller';
import { validate } from '../../core/middlewares/validate';
import { registerSchema, loginSchema } from './auth.schemas';

const router = Router();

// Rota para registro de um novo usuário
router.post('/register', validate(registerSchema), registerController);

// Rota para login de um usuário existente
router.post('/login', validate(loginSchema), loginController);

export default router;