import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import livrosRouter from './routes/livros.js';

// Configuração para obter __dirname em módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Prisma
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

const app = express();

// Configuração do Helmet com políticas de segurança
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "https://livraria-e905.onrender.com"],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

// Middlewares básicos
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://livraria-e905.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota explícita para favicon
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'), {
    headers: {
      'Content-Type': 'image/x-icon',
      'Cache-Control': 'public, max-age=31536000'
    }
  });
});

// Rota de health check
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'API Online',
    message: 'Servidor operacional',
    timestamp: new Date().toISOString()
  });
});

// Rotas da API
app.use('/api/livros', livrosRouter);

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erro interno no servidor',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`URL do banco: ${process.env.DATABASE_URL ? 'configurada' : 'não configurada'}`);
});