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

//faz o post em tarefas
router.post('/', (req, res) => {
const { titulo, conteudo, categoria, autorId } = req.body;

if (!titulo || !conteudo || !categoria || !autorId) {return res.status(400).json({ erro: 'titulo, conteudo, categoria e autorId é necessario' });
}

//aqui é a regra de negocio onde cada noticia pertence apenas a uma categoria
if (Array.isArray(categoria)) {
return res.status(400).json({ erro: 'uma postagem deve ter so uma categoria' });
}

const novaPostagem = {
id: proximoId++,
titulo,
conteudo,
categoria,
autorId,
dataPublicacao: new Date()
};

postagens.push(novaPostagem);
res.status(201).json(novaPostagem);
});

export default router;