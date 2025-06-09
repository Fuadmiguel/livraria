document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const livroId = urlParams.get('id');
    
    if (!livroId) {
        window.location.href = 'index.html';
        return;
    }
    
    document.getElementById('livroId').value = livroId;
    
    carregarLivroDetalhes(livroId);
    carregarAvaliacoes(livroId);
    
    // Adicionar nova avaliação
    document.getElementById('avaliacaoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const avaliacao = {
            nota: parseInt(document.getElementById('nota').value),
            comentario: document.getElementById('comentario').value
        };
        
        if (avaliacao.nota < 1 || avaliacao.nota > 5) {
            alert('A nota deve ser entre 1 e 5');
            return;
        }
        
        try {
            const response = await fetch(`/api/livros/${livroId}/avaliacoes`, {  // Corrigido para /api/livros
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(avaliacao)
            });
            
            if (response.ok) {
                document.getElementById('avaliacaoForm').reset();
                carregarAvaliacoes(livroId);
            } else {
                alert('Erro ao adicionar avaliação');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao adicionar avaliação');
        }
    });
    
    // Carregar detalhes do livro
    async function carregarLivroDetalhes(id) {
        try {
            const response = await fetch(`/api/livros/${id}`);  // Corrigido para /api/livros
            const livro = await response.json();
            
            const livroDetalhes = document.getElementById('livroDetalhes');
            livroDetalhes.innerHTML = `
                <div class="card-body">
                    <h2 class="card-title">${livro.titulo}</h2>
                    <h4 class="card-subtitle mb-2 text-muted">${livro.autor}</h4>
                    <p class="card-text"><strong>Gênero:</strong> ${livro.genero}</p>
                    <p class="card-text">${livro.sinopse}</p>
                </div>
            `;
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    
    // Carregar avaliações do livro
    async function carregarAvaliacoes(livroId) {
        try {
            const response = await fetch(`/api/livros/${livroId}`);  // Corrigido para /api/livros
            const livro = await response.json();
            
            const avaliacoesList = document.getElementById('avaliacoesList');
            avaliacoesList.innerHTML = '';
            
            if (livro.avaliacoes && livro.avaliacoes.length > 0) {
                livro.avaliacoes.forEach(avaliacao => {
                    const avaliacaoElement = document.createElement('div');
                    avaliacaoElement.className = 'card mb-2';
                    avaliacaoElement.innerHTML = `
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title star-rating">${'★'.repeat(avaliacao.nota)}${'☆'.repeat(5 - avaliacao.nota)}</h5>
                                <small class="text-muted">${new Date(avaliacao.createdAt).toLocaleDateString()}</small>
                            </div>
                            <p class="card-text">${avaliacao.comentario}</p>
                        </div>
                    `;
                    avaliacoesList.appendChild(avaliacaoElement);
                });
            } else {
                avaliacoesList.innerHTML = '<p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>';
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }
});