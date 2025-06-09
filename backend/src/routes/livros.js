import express from 'express';
import prisma from '../prisma.js';

const router = express.Router();

// POST /livros - Cadastrar novo livro
router.post('/', async (req, res) => {
    const { titulo, autor, genero, sinopse } = req.body;
    try {
        const novoLivro = await prisma.livro.create({
            data: { titulo, autor, genero, sinopse }
        });
        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar livro' });
    }
});

// GET /livros - Listar todos os livros
router.get('/', async (req, res) => {
    try {
        const livros = await prisma.livro.findMany({
            include: { avaliacoes: true }
        });
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
});

// GET /livros/:id - Obter detalhes de um livro específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const livro = await prisma.livro.findUnique({
            where: { id: parseInt(id) },
            include: { avaliacoes: true }
        });
        if (livro) {
            res.json(livro);
        } else {
            res.status(404).json({ error: 'Livro não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar livro' });
    }
});

// DELETE /livros/:id - Remover livro do catálogo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.livro.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar livro' });
    }
});

export default router;