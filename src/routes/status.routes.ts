import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";


require('dotenv/config');
const statusRoute = Router();

statusRoute.get('/status', (req: Request, res: Response, next: NextFunction) => {

console.log(process.env.DB_CONNECTION);
  res.sendStatus(StatusCodes.OK);
});


export default statusRoute;