document.getElementById('livroForm').addEventListener('submit', async (e) => {
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

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Erro ao adicionar livro');
    }

    alert('Livro adicionado com sucesso!');
    livroForm.reset();
    carregarLivros();
  } catch (error) {
    console.error('Erro:', error);
    alert(error.message || 'Erro ao adicionar livro');
  }
});