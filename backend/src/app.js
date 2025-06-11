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
app.use(
  helmet({
    contentSecurityPolicy: false, // Desativa temporariamente CSP para testes
    crossOriginResourcePolicy: false // Desativa CORP temporariamente
  })
);

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://livraria-e905.onrender.com']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site'); // ou 'cross-origin'
  next();
});

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

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'), {
    headers: {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age=31536000'
    }
  });
});