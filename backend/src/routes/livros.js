import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + (process.env.NODE_ENV === 'production' ? '?sslmode=require' : '')
    }
  }
})

// POST /api/livros
router.post('/', async (req, res) => {
  try {
    const { titulo, autor, genero, sinopse } = req.body;
    
    // Validação básica
    if (!titulo || !autor || !genero || !sinopse) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const novoLivro = await prisma.livro.create({
      data: { titulo, autor, genero, sinopse }
    });
    
    res.status(201).json(novoLivro);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: 'Erro interno ao adicionar livro' });
  }
});

export default router;