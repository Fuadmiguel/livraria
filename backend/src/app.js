import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import helmet from 'helmet';
import livrosRouter from './routes/livros.js';

// Configuração única do Prisma (compatível com Render)
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL // SSL já é gerenciado pelo Render
    }
  }
});

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://livraria-e905.onrender.com']
}));

// Rota de health check (obrigatória para Render)
app.get('/', (req, res) => res.status(200).json({ status: 'API Online' }));

// Rotas
app.use('/api/livros', livrosRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));