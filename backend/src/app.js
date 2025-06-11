import express from 'express';
import cors from 'cors';
import livrosRouter from '/routes/livros.js'; // Verifique este caminho

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + 
           (process.env.NODE_ENV === 'production' ? 
           '&sslmode=require&sslaccept=strict&pool_timeout=60' : 
           '')
    }
  },
  log: ['query', 'info', 'warn', 'error']
})

// Teste de conexão
prisma.$connect()
  .then(() => console.log('✅ Conexão SSL estabelecida com sucesso'))
  .catch(err => console.error('❌ Erro de conexão SSL:', err))

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