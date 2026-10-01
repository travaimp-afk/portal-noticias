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

//faz o post em tarefas da postagem, as postagens em si 
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

//faz o put no id de postagens
router.put('/:id', (req, res) => {
  const postagem = postagens.find(p => p.id === Number(req.params.id));

  if (!postagem) {
    return res.status(404).json({ erro: 'nao encontra a postagem' });
  }

   //regra de negócio só é permitido editar noticias até 30 minutos depois de postada
  const minutosDesdePublicacao = (Date.now() - new Date(postagem.dataPublicacao)) / 1000 / 60;
  if (minutosDesdePublicacao > 30) {
    return res.status(403).json({ erro: '30 minutos para edicao, ja expirou' });
  }

  const { titulo, conteudo, categoria } = req.body;

  //regra de negócio cada noticia só tem uma categoria
  if (categoria && Array.isArray(categoria)) {
    return res.status(400).json({ erro: 'a postagem só pode pertencer a uma categoria'});}

  if (titulo) postagem.titulo = titulo;
  if (conteudo) postagem.conteudo = conteudo;
  if (categoria) postagem.categoria = categoria;

  res.json(postagem);});

  //deleta as postagens por id
router.delete('/:id', (req, res) => {
  const index = postagens.findIndex(p => p.id === Number(req.params.id));

if (index === -1) {
return res.status(404).json({ erro: 'Postagem não encontrada' });
}

postagens.splice(index, 1);
res.status(204).send();
});

export default router;