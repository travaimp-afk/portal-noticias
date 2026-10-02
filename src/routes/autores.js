import { Router } from 'express';

const router = Router();

let autores = [];
let proximoId = 1;

router.get('/', (req, res) => {
  res.json(autores);
});

export default router;