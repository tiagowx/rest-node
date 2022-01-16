import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/user.route';

// Instanciando Aplicação
const app = express();

// Configurando Aplicação
app.use(express.json()); // Converte requisições em Json
app.use(express.urlencoded({ extended: true })); // Habilita querystring na conversão de dados passados na Url

// Configurando Rotas
app.use(usersRoute);

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 'online' });
});

// Inicializando Aplicação

app.listen(3000, () => {
  const url = "http://localhost:3000";
  console.log(`Aplicação executando no caminho: ${url}`);

});