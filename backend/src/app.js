// backend/src/app.js
const express = require('express');
const cors = require('cors');
const livrosRouter = require('./routes/livros');
const avaliacoesRouter = require('./routes/avaliacoes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/livros', livrosRouter);
app.use('/livros', avaliacoesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});