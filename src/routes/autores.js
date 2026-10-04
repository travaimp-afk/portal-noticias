import { Router } from 'express';

const router = Router();

let autores = [];
let proximoId = 1;

router.get('/', (req, res) => {
  res.json(autores);
});

router.get('/:id', (req, res) => {
  const autor = autores.find(a => a.id === Number(req.params.id));

  if (!autor) {
    return res.status(404).json({ 
      erro: 'autor nao encontrado' 
    });
  }

  res.json(autor);
});

router.post('/', (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ 
      erro: 'nome e email sao necessarios' 
    });
  }

  const novoAutor = {
    id: proximoId++,
    nome,
    email
  };

  autores.push(novoAutor);
  res.status(201).json(novoAutor);
});

router.put('/:id', (req, res) => {
  const autor = autores.find(a => a.id === Number(req.params.id));

  if (!autor) {
    return res.status(404).json({ 
      erro: 'autor nao encontrado' 
    });
  }

  const { nome, email } = req.body;

  if (nome) autor.nome = nome;
  if (email) autor.email = email;

  res.json(autor);
});

router.delete('/:id', (req, res) => {
  const index = autores.findIndex(a => a.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ erro: 'autor nao encontrado' });
  }

  autores.splice(index, 1);
  res.status(204).send();
});

export default router;