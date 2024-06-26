document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('criar-jogador')) {
        document.getElementById('criar-jogador').addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome').value;
            const jogo = document.getElementById('jogo').value;
            const pontos = document.getElementById('pontos').value;
            await fetch('/jogadores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, jogo, pontos: parseInt(pontos) }),
            });
            window.location.href = 'index.html';
        });
    }

    if (document.getElementById('ranking')) {
        fetch('/ranking')
            .then(response => response.json())
            .then(jogadores => {
                const rankingDiv = document.getElementById('ranking');
                rankingDiv.innerHTML = jogadores.map((jogador, index) => `
                    <p>${index + 1}. ${jogador.nome} - ${jogador.jogo} - ${jogador.pontos} pontos - Vitórias: ${jogador.vitorias} - Derrotas: ${jogador.derrotas}</p>
                `).join('');
            });
    }

    if (document.getElementById('lista-jogadores')) {
        fetch('/jogadores')
            .then(response => response.json())
            .then(jogadores => {
                const listaDiv = document.getElementById('lista-jogadores');
                listaDiv.innerHTML = jogadores.map((jogador, index) => `
                    <p>${index + 1}. ${jogador.nome} - ${jogador.jogo} - ${jogador.pontos} pontos - Vitórias: ${jogador.vitorias} - Derrotas: ${jogador.derrotas} 
                    <button onclick="editar(${index})">Editar</button> 
                    <button onclick="remover(${index})">Remover</button>
                `).join('');
            });
    }

    if (document.getElementById('editar-jogador')) {
        document.getElementById('editar-jogador').addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('id').value;
            const nome = document.getElementById('nome').value;
            const jogo = document.getElementById('jogo').value;
            const pontos = document.getElementById('pontos').value;
            await fetch(`/jogadores/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, jogo, pontos: parseInt(pontos) }),
            });
            window.location.href = 'index.html';
        });
    }

    if (document.getElementById('registrar-partida')) {
        populateJogadoresDropdown();
        document.getElementById('registrar-partida').addEventListener('submit', async (e) => {
            e.preventDefault();
            const vencedor = document.getElementById('vencedor').value;
            const perdedor = document.getElementById('perdedor').value;
            await fetch('/partidas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ vencedor: parseInt(vencedor), perdedor: parseInt(perdedor) }),
            });
            window.location.href = 'index.html';
        });
    }
});

function editar(index) {
    fetch('/jogadores')
        .then(response => response.json())
        .then(jogadores => {
            const jogador = jogadores[index];
            document.getElementById('id').value = index;
            document.getElementById('nome').value = jogador.nome;
            document.getElementById('jogo').value = jogador.jogo;
            document.getElementById('pontos').value = jogador.pontos;
        });
}

function remover(index) {
    fetch(`/jogadores/${index}`, {
        method: 'DELETE',
    }).then(() => {
        window.location.reload();
    });
}

function populateJogadoresDropdown() {
    fetch('/jogadores')
        .then(response => response.json())
        .then(jogadores => {
            const vencedorSelect = document.getElementById('vencedor');
            const perdedorSelect = document.getElementById('perdedor');
            jogadores.forEach((jogador, index) => {
                const optionVencedor = document.createElement('option');
                optionVencedor.value = index;
                optionVencedor.text = jogador.nome;
                vencedorSelect.add(optionVencedor);

                const optionPerdedor = document.createElement('option');
                optionPerdedor.value = index;
                optionPerdedor.text = jogador.nome;
                perdedorSelect.add(optionPerdedor);
            });
        });
}
