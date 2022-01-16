import { Console } from 'console';
import express, { Request, Response, NextFunction } from 'express';


const app = express();

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 'online' });
});

app.listen(3000, () =>{
  console.log('App exec in port: 3000');

});