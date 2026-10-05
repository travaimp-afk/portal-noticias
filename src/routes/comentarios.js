import { Router } from 'express';
import { postagens } from './postagens.js';

const router = Router();

let comentarios = [];
let proximoId = 1;

router.post('/', (req, res) => {
  const { postagemId, autor, texto } = req.body;

  if (!postagemId || !autor || !texto) {
    return res.status(400).json({ erro: 'postagemId, autor e texto sao necessarios' });
  }

  const postagem = postagens.find(p => p.id === Number(postagemId));
  if (!postagem) {
    return res.status(404).json({ erro: 'postagem nao encontrada' });
  }

  const novoComentario = {
    id: proximoId++,
    postagemId: Number(postagemId),
    autor,
    texto,
    dataCriacao: new Date()
  };

  comentarios.push(novoComentario);
  res.status(201).json(novoComentario);
});

router.get('/', (req, res) => {
  const { postagemId } = req.query;

  if (postagemId) {
    const resultado = comentarios.filter(c => c.postagemId === Number(postagemId));
    return res.json(resultado);
  }

  res.json(comentarios);
});

export default router;