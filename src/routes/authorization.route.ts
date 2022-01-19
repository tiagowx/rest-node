import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbidden.error.model";
import userRepository from "../repositories/user.repository";

const authorizationRoute = Router();

authorizationRoute.post('/token', async (req: Request, res: Response, next: NextFunction) => {

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

    const tokenContent = Buffer.from(token, 'base64').toString('utf-8');

    const [username, password] = tokenContent.split(':');

    if (!username || !password) {
      throw new ForbiddenError('Credenciais não preenchidas');
    }

    const user = await userRepository.findByUserAuth(username, password);

    if (!user) {
      throw new ForbiddenError('Usuário ou senha inválidos')
    }

    console.log(user);

    const jwtPayload = { username: user.username };
    const jwtOptions = { subject: user?.uuid };
    const secretKey = 'my_secret_key';

    const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);

    res.status(StatusCodes.OK).json({ token: jwt });

  } catch (error) {
    next(error);
  }


});

export default authorizationRoute;