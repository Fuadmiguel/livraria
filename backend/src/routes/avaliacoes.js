const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

module.exports = router;