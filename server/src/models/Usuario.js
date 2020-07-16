import { Schema, model } from 'mongoose';

const schema = Schema({

    dni: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    apellido: {
        type: String,
        required: true,
        trim: true
    },

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    rol: {
        type: String,
        required: true,
        trim: true
    },

    creado: {
        type: Date,
        default: Date.now
    }

});

export default model('Usuario',schema);