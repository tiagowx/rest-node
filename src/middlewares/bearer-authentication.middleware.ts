import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";
import JWT from 'jsonwebtoken';
import userRepository from "../repositories/user.repository";
import { type } from "os";


async function bearerAuthenticationMiddleware(req: Request, res: Response, next: NextFunction) {

  try {
    const authorizationHeaders = req.headers['authorization'];

    if (!authorizationHeaders) {
      throw new ForbiddenError('Credenciais não informadas');
    }
    // Basic dGlhZ286MTIzNDU2
    const [authenticationTypm, token] = authorizationHeaders.split(' ');

    if (authenticationTypm !== 'Bearer' || !token) {
      throw new ForbiddenError('Autenticação inválida');
    }

    const tokenPayload = JWT.verify(token, 'my_secret_key');


    if (typeof tokenPayload !== 'object' || !tokenPayload.sub) {
      throw new ForbiddenError('Token inválido!')
    }

    const uuid = tokenPayload.sub;

    const user = await userRepository.findById(uuid);

    req.user = user;
    
    next();
  } catch (error) {
    next(error);
  }
}

export default bearerAuthenticationMiddleware;