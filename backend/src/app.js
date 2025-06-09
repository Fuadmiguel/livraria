import express from 'express';
import cors from 'cors';
import livrosRouter from './routes/livros.js';
import avaliacoesRouter from './routes/avaliacoes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração para __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: 'https://livraria-e905.onrender.com' // ou seu domínio
}));
app.use(express.json());

// Rotas da API
app.use('/livros', livrosRouter);
app.use('/livros', avaliacoesRouter);

// Servir arquivos estáticos se tiver frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rota para o frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});