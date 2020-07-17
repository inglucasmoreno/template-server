import jwt from 'jsonwebtoken';
import chalk from 'chalk';
import {success, error} from '../controllers/response';

export default (req, res, next) => {
    
    // Verificamos si viene un token
    if(!req.header('Authorization')) error(res, 401, 'No tienes permisos para realizar esta accion');
    const token = req.header('Authorization'); 
    
    try{
        // Validar el token
        const payload = jwt.verify(token, process.env.SECRET_KEY || 'Equinoccio');
        req.usuario = payload;
        next();
    }catch(err){
        console.log(chalk.red(err));
        error(res, 500);
    }

}