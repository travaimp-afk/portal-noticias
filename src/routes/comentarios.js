import { Router } from 'express';
import { postagens } from './postagens.js';

const router = Router();

let comentarios = [];
let proximoId = 1;

export default router;