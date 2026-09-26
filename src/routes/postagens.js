import { Router } from 'express';

const router = Router();

let postagens = [];
let proximoId = 1;

//busca por texto
router.get('/', (req, res) => {
const { busca } = req.query;

if (busca) {
const resultado = postagens.filter(p =>
   p.titulo.toLowerCase().includes(busca.toLowerCase()) ||
   p.conteudo.toLowerCase().includes(busca.toLowerCase()));

 return res.json(resultado);
  }

  res.json(postagens);
});

//busca por id
router.get('/:id', (req, res) => {
const postagem = postagens.find(p => p.id === Number(req.params.id));

  if (!postagem) {
  return res.status(404).json({ erro: 'postagem nao encontrada'});
}

  res.json(postagem);
});

export default router;