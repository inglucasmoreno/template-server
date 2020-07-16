import { Router } from 'express';
import { check } from 'express-validator';
import {    listarUsuarios, 
            obtenerUsuario,
            nuevoUsuario,
            eliminarUsuario, 
            actualizarUsuario    } from '../controllers/usuariosController';

const router = Router();

// Listar usuarios
router.get('/', listarUsuarios);

// Obtener usuario por ID
router.get('/:id', obtenerUsuario);

// Nuevo usuario
router.post('/',[
    check('dni','El dni es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),      
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('rol','El rol es obligatorio').not().isEmpty(),
], nuevoUsuario);

// Actualizar usuario
router.put('/:id', actualizarUsuario);

// Eliminar usuario
router.delete('/:id', eliminarUsuario);

export default router;