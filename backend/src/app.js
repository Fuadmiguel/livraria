import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import livrosRouter from './src/routes/livros.js'; // Verifique este caminho

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + (process.env.NODE_ENV === 'production' ? '?sslmode=require' : '')
    }
  }
})

const app = express();

// Configuração do CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://livraria-e905.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

// Rotas
app.use('/api/livros', livrosRouter); // Prefixo /api para todas as rotas

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});