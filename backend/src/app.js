import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// backend/src/app.js
const express = require('express');
const cors = require('cors');
const livrosRouter = require('./routes/livros');
const avaliacoesRouter = require('./routes/avaliacoes');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// server estático para arquivos estáticos
app.use(express.static(path.join(__dirname, '/home/fuad/faculdade/n46112n1/livraria-api/frontend')));

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/home/fuad/faculdade/n46112n1/livraria-api/frontend/index.html'));
});

app.use('/livros', livrosRouter);
app.use('/livros', avaliacoesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});