import { Router } from 'express';
import auth from '../middleware/auth';
import { check } from 'express-validator';
import {    listarUsuarios, 
            obtenerUsuario,
            nuevoUsuario,
            eliminarUsuario, 
            actualizarUsuario    } from '../controllers/usuariosController';

const router = Router();

// Listar usuarios
router.get('/', auth , listarUsuarios);

// Obtener usuario por ID
router.get('/:id', auth, obtenerUsuario);

// Nuevo usuario
router.post('/', auth, [
    check('dni','El dni es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),      
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').not().isEmpty(),
    check('rol','El rol es obligatorio').not().isEmpty(),
], nuevoUsuario);

// Actualizar usuario
router.put('/:id', auth, actualizarUsuario);

// Eliminar usuario
router.delete('/:id', auth, eliminarUsuario);

export default router;