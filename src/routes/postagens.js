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

export default router;