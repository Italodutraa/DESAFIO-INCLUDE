import {prisma} from '../../core/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

type UserRegistrationData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export const register = async (data: UserRegistrationData) => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  // Nunca retorne a senha, mesmo que seja o hash
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (credentials: Pick<User, 'email' | 'password'>) => {
  const user = await prisma.user.findUnique({ where: { email: credentials.email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Gera o token JWT com o ID do usuário no payload
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' } // Token expira em 1 dia
  );

  return token;
};