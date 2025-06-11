import { Router } from 'express';
import { prisma } from '../app.js';

const router = Router();

// GET /api/livros (Rota de teste)
router.get('/', async (req, res) => {
  try {
    const livros = await prisma.livro.findMany();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// POST /api/livros
router.post('/', async (req, res) => {
  try {
    const { titulo, autor, genero, sinopse } = req.body;
    
    if (!titulo || !autor || !genero || !sinopse) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const novoLivro = await prisma.livro.create({
      data: { titulo, autor, genero, sinopse }
    });
    
    res.status(201).json(novoLivro);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: 'Erro ao adicionar livro' });
  }
});

export default router;