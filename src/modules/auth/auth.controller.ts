import { Request, Response, NextFunction } from "express";
import * as AuthService from './auth.service'

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const user = await AuthService.register(req.body);
        res.status(201).json(user);
    } catch(error: any){
      if (error.message === 'Email já está em uso') {
      return res.status(409).json({ message: error.message }); // 409 Conflict
    }
    next(error);  
    }    
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await AuthService.login(req.body);
    res.status(200).json({ token });
  } catch (error: any) {
    // Se as credenciais forem inválidas, retorna um status de não autorizado
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message }); // 401 Unauthorized
    }
    next(error);
  }
};
