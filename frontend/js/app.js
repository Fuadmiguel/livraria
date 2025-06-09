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
            const response = await fetch('/api/livros', {  // Corrigido para /api/livros
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(livro)
            });
            
            if (response.ok) {
                livroForm.reset();
                carregarLivros();
            } else {
                alert('Erro ao adicionar livro');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar livro');
        }
    });
    
    // Carregar lista de livros
    async function carregarLivros() {
        try {
            const response = await fetch('/api/livros');  // Corrigido para /api/livros
            const livros = await response.json();
            
            livrosList.innerHTML = '';
            
            livros.forEach(livro => {
                const livroElement = document.createElement('div');
                livroElement.className = 'list-group-item';
                livroElement.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${livro.titulo}</h5>
                        <small>${livro.autor}</small>
                    </div>
                    <p class="mb-1">${livro.sinopse.substring(0, 100)}...</p>
                    <small>Gênero: ${livro.genero}</small>
                    <div class="mt-2">
                        <a href="detalhes.html?id=${livro.id}" class="btn btn-sm btn-info">Detalhes</a>
                        <button class="btn btn-sm btn-danger" onclick="deletarLivro(${livro.id})">Excluir</button>
                    </div>
                `;
                livrosList.appendChild(livroElement);
            });
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    
    // Função global para deletar
    window.deletarLivro = async (id) => {
        if (confirm('Tem certeza que deseja excluir este livro?')) {
            try {
                const response = await fetch(`/api/livros/${id}`, {  // Corrigido para /api/livros
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    carregarLivros();
                } else {
                    alert('Erro ao excluir livro');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao excluir livro');
            }
        }
    };
});