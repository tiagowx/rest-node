import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

async function basicAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeaders = req.headers['authorization'];

    console.log(authorizationHeaders);
    if (!authorizationHeaders) {
      throw new ForbiddenError('Credenciais não informadas');
    }
    // Basic dGlhZ286MTIzNDU2
    const [authenticationTypm, token] = authorizationHeaders.split(' ');


    if (authenticationTypm !== 'Basic' || !token) {
      throw new ForbiddenError('Autenticação inválida');
    }

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

    const [username, password] = tokenContent.split(':');
    

    if (!username || !password) {
      throw new ForbiddenError('Credenciais não preenchidas');
    }

    const user = await userRepository.findByUserAuth(username, password);

    if (!user) {
      throw new ForbiddenError('Usuário ou senha inválidos')
    }

    req.user = user;

    next();

  } catch (error) {

    next(error);
  }
}

export default basicAuthenticationMiddleware;