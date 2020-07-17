import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import chalk from 'chalk';
import {success, error} from './response';
import Usuario from '../models/Usuario';
import {validationResult} from 'express-validator';

const generarToken = (usuario, secreta, expiresIn) => {
    const {id, dni, apellido, nombre, email ,rol} = usuario;
    return jwt.sign({id, dni, apellido, nombre, email, rol}, secreta, {expiresIn});
}

export const login = async (req, res) => {

    // [express-validator]
    const errores = validationResult(req);
    if(!errores.isEmpty()) return error(res,400,{errores: errores.array()});

    const { dni, password } = req.body;

    try{
       
        // Se determina si el usuario esta registrado
        const usuario = await Usuario.findOne({dni});
        if(!usuario) return error(res, 400, 'Datos incorrectos');    

        // Se corrobora que la contraseña es correcta
        const passwordCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passwordCorrecto) return error(res, 400, 'Datos incorrectos');

        //Se genera el token
        const token = generarToken(usuario, process.env.SECRET_KEY || 'Equinoccio', '24h');
        success(res, {token});

    }catch(err){
        console.log(chalk.red(err));
        error(res, 500);
    }

}