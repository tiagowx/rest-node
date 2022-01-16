import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/user.route';


const app = express();

app.use(usersRoute);

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 'online' });
});

app.listen(3000, () =>{
  const url= "http://localhost/status";
  console.log(`App exec in port: 3000 ${url.link}`);

});