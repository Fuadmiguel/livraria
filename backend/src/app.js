import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import livrosRouter from './routes/livros.js'; // Adicione esta linha
import avaliacoesRouter from './routes/avaliacoes.js'; // Adicione esta linha
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';

// Configuração segura para ambiente de produção
const corsOptions = {
  origin: [
    'https://livraria-e905.onrender.com', // Seu domínio no Render
    'http://localhost:3000'              // Para desenvolvimento local
  ],
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000; // Adicione esta linha

// Middleware para parsing de JSON
app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

// Configuração correta para arquivos estáticos
app.use('/css', express.static(path.join(__dirname, '../../frontend/css'), {
  setHeaders: (res) => {
    res.set('Content-Type', 'text/css');
  }
}));

app.use('/js', express.static(path.join(__dirname, '../../frontend/js'), {
  setHeaders: (res) => {
    res.set('Content-Type', 'application/javascript');
  }
}));

// Rotas da API
app.use('/api/livros', livrosRouter); // Adicione /api/ para evitar conflitos
app.use('/api/livros', avaliacoesRouter);

// Rota para o frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

// Rota fallback para SPA (deve vir por último)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});