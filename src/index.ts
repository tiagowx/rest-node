import express from 'express';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import errorHandler from './middlewares/error-handdler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.routes';
import usersRoute from './routes/users.route';

// Instanciando Aplicação
const app = express();

// Configurando Aplicação
app.use(express.json()); // Converte requisições em Json
app.use(express.urlencoded({ extended: true })); // Habilita querystring na conversão de dados passados na Url

// Configurando Rotas
app.use(statusRoute);
app.use(authorizationRoute);
  // Rotas autenticadas
  app.use(jwtAuthenticationMiddleware);
  app.use(usersRoute);

// Configuração dos Handdlers de Erro
app.use(errorHandler)

// Inicializando Aplicação
app.listen(3000, () => {
  const url = "http://localhost:3000";
  console.log(`Aplicação executando no caminho: ${url}`);

});