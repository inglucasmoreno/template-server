import express from 'express';
import db from './config/db';
import chalk from 'chalk';
import dotenv from 'dotenv';
import cors from 'cors';

// Variables y Entorno
dotenv.config({path:'.env'});
const port = process.env.PORT || 4000;

// Express
const app = express();

// Configuraciones
app.use(cors());
app.use(express.json({extended: true}));

// Conexion con la base de datos - MongoDB
db();

// Rutas
import usuariosRoutes from './routes/usuariosRoute';
import authRoutes from './routes/authRoutes';
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/auth', authRoutes);

// Disparando el servidor
app.listen(port,()=>{
    console.log(chalk.blue('[ -- Equinoccio Technology -- ]'));
    console.log(chalk.blue('[Server]') + ` - Server escuchando en http://localhost:${port}`);
});