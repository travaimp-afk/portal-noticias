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
    return res.status(404).json({ erro: 'autor nao encontrado' });
  }

  res.json(autor);
});

export default router;