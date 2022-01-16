import { Pool } from "pg";

require('dotenv/config'); // Requerimento para uso do 'dotenv' e habilitar variáveis de ambiente 

const connectionString = process.env.DB_CONNECTION_URL;

const db = new Pool({connectionString});


export default db;