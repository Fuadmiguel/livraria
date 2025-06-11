document.addEventListener('DOMContentLoaded', () => {
  const livroForm = document.getElementById('livroForm');
  const livrosList = document.getElementById('livrosList');

  // Carregar livros ao iniciar
  carregarLivros();

  // Adicionar novo livro
  livroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const livro = {
      titulo: document.getElementById('titulo').value,
      autor: document.getElementById('autor').value,
      genero: document.getElementById('genero').value,
      sinopse: document.getElementById('sinopse').value
    };

    try {
      const response = await fetch('/api/livros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro)
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar livro');
      }

      alert('Livro adicionado com sucesso!');
      livroForm.reset();
      carregarLivros();
    } catch (error) {
      console.error('Erro:', error);
      alert(error.message);
    }
  });

  // Função para carregar livros
  async function carregarLivros() {
    try {
      const response = await fetch('/api/livros');
      const livros = await response.json();

      livrosList.innerHTML = '';
      livros.forEach(livro => {
        const livroElement = document.createElement('a');
        livroElement.href = `detalhes.html?id=${livro.id}`;
        livroElement.className = 'list-group-item list-group-item-action';
        livroElement.innerHTML = `
          <h5>${livro.titulo}</h5>
          <p class="mb-1">${livro.autor} - ${livro.genero}</p>
          <small>${livro.sinopse.substring(0, 50)}...</small>
        `;
        livrosList.appendChild(livroElement);
      });
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
    }
  }
});