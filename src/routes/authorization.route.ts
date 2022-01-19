import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbidden.error.model";

const authorizationRoute = Router();

authorizationRoute.post('/token', (req: Request, res: Response, next: NextFunction) => {

  try {
    const authorizationHeaders = req.headers['authorization'];

    if (!authorizationHeaders) {
      throw new ForbiddenError('Credenciais não informadas');
    }
    // Basic dGlhZ286MTIzNDU2
    const [authenticationTypm, token] = authorizationHeaders.split(' ');


    if (authenticationTypm !== 'Basic' || !token) {
      throw new ForbiddenError('Autenticação inválida');
    }

    const tokenContent = Buffer.from(token,'base64').toString('utf-8');

    const [username, password] = tokenContent.split(':');

    if(!username || !password){
      throw new ForbiddenError('Credenciais não preenchidas');
    }

    console.log(tokenContent);

  } catch (error) {
    next(error);
  }


});

export default authorizationRoute;