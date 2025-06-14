import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import livrosRouter from './routes/livros.js';
import avaliacoesRouter from './routes/avaliacoes.js';

// Configuração para __dirname em ES Modules
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

// Configuração de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "https://livraria-e905.onrender.com"],
      "script-src": ["'self'", "https://cdn.jsdelivr.net"],
      "style-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"]
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://livraria-e905.onrender.com']
}));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../../public')));

// Rotas da API
app.use('/api/livros', livrosRouter);
app.use('/api/livros', avaliacoesRouter);

// Rota para o frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});