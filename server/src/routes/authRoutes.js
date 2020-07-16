import { Router }  from 'express';
import { check } from 'express-validator';
import { login } from '../controllers/authController';

const router = Router();

// Login de usuario
router.post('/',[
    check('dni','El dni es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty()    
], login);

export default router;