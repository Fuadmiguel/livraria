import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import livrosRouter from './routes/livros.js'; // Verifique este caminho
import helmet from 'helmet'; // Importe o helmet

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

// Configuração do Helmet com CSP personalizado
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "https://livraria-e905.onrender.com", "data:"], // Permite imagens do próprio domínio e data URIs
        scriptSrc: ["'self'", "'unsafe-inline'"], // Permite scripts inline (se necessário)
        styleSrc: ["'self'", "'unsafe-inline'"], // Permite CSS inline (se necessário)
        connectSrc: ["'self'"], // Permite conexões (fetch, XHR)
      },
    },
  })
);

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