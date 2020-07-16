import Usuario from '../models/Usuario';
import bcryptjs from 'bcryptjs';
import chalk from 'chalk';
import {validationResult} from 'express-validator';
import {success, error} from './response';

// Listar usuarios
export const listarUsuarios = async (req, res) => {
    try{
        const usuarios = await Usuario.find();
        success(res, usuarios);
    }catch(error){
        console.log(chalk.red(error));
        error(res, 500);
    }
}

// Obtener usuario por ID
export const obtenerUsuario = async (req, res) => {

    try{

        const usuario = await Usuario.findById(req.params.id);
    
        // Se verifica si el usuario existe
        if(!usuario) return error(res, 400, 'El usuario no esta registrado');
        
        // Se devuelve los datos del usuario
        success(res, {usuario});

    }catch(error){
        console.log(chalk.red(error));
        error(res, 500);    
    }

}

// Nuevo usuario
export const nuevoUsuario = async (req, res) => {
    
    const errores = validationResult(req);
    if(!errores.isEmpty()) return error(res, 400, {errores: errores.array()});

    const { dni, password } = req.body;
  
    try{

        // Se verifica si el usuario existe
        const existeUsuario = await Usuario.findOne({dni});
        if(existeUsuario) return error(res, 400, 'El usuario ya esta registrado');
        
        // Encriptado de contraseña - Hasheo
        const salt = await bcryptjs.genSalt(10);
        req.body.password = await bcryptjs.hash(password, salt);

        // Se crea el nuevo usuario
        const usuario = new Usuario(req.body);
        await usuario.save();
        success(res,'Usuario creado correctamente');
    
    }catch(error){
        console.log(chalk.red(error));
        error(res, 500);
    }
}

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {

    const { id } = req.params;

    try{

        // Se verifica si el usuario existe
        const existeUsuario = await Usuario.findById(id);
        if(!existeUsuario){
            return error(res, 400, 'El usuario no existe')
        }

        // Encriptado de contraseña - Hasheo
        if(req.body.password){
            const salt = await bcryptjs.genSalt(10);
            req.body.password = await bcryptjs.hash(req.body.password, salt);      
        }

        // Se actualiza el usuario
        await Usuario.findOneAndUpdate({_id:id},req.body);
        success(res, 'Usuario actualizado correctamente');

    }catch(error){
        console.log(chalk.red(error));
        error(res, 500);
    }

}

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
    
    const { id } = req.params;

    try{

        // Se verifica si el usuario a eliminar existe
        const existeUsuario = await Usuario.findById(id);

        if(!existeUsuario){
            return error(res, 400, 'El usuario no existe');
        }

        // Se elimina el usuario
        await Usuario.findOneAndDelete({_id:id});
        success(res, 'Usuario eliminado correctamente');

    }catch(error){
        console.log(chalk.red(error));
        error(res, 500);
    }

}

