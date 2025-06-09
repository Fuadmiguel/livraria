import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

// POST /livros/:id/avaliacoes - Adicionar avaliação/comentário ao livro
router.post('/:id/avaliacoes', async (req, res) => {
    const livroId = parseInt(req.params.id);
    const { nota, comentario } = req.body;
    
    try {
        const avaliacao = await prisma.avaliacao.create({
            data: {
                livroId,
                nota,
                comentario
            }
        });
        res.status(201).json(avaliacao);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar avaliação' });
    }
});

export default router;