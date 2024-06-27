document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('iniciar-torneio')) {
        populateJogadoresDropdown();

        document.getElementById('iniciar-torneio').addEventListener('submit', (e) => {
            e.preventDefault();
            iniciarTorneio();
        });
    }
});

function populateJogadoresDropdown() {
    fetch('/jogadores')
        .then(response => response.json())
        .then(jogadores => {
            const select = document.getElementById('jogadores-torneio');
            jogadores.forEach(jogador => {
                const option = document.createElement('option');
                option.value = jogador.id;
                option.text = jogador.nome;
                select.add(option);
            });
        });
}

function iniciarTorneio() {
    const select = document.getElementById('jogadores-torneio');
    const selectedJogadores = Array.from(select.selectedOptions).map(option => ({
        id: option.value,
        nome: option.text
    }));

    if (selectedJogadores.length < 2) {
        alert('Selecione pelo menos dois jogadores para iniciar o torneio.');
        return;
    }

    iniciarRodada(selectedJogadores);
}

function iniciarRodada(jogadores) {
    const partidas = gerarPartidasAleatorias(jogadores);
    mostrarChaves(partidas);
}

function gerarPartidasAleatorias(jogadores) {
    jogadores = shuffleArray(jogadores);
    const partidas = [];

    while (jogadores.length > 1) {
        const jogador1 = jogadores.pop();
        const jogador2 = jogadores.pop();
        partidas.push([jogador1, jogador2]);
    }

    return partidas;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function mostrarChaves(partidas) {
    const chavesDiv = document.getElementById('chaves');
    chavesDiv.innerHTML = '';

    partidas.forEach((partida, index) => {
        const partidaDiv = document.createElement('div');
        partidaDiv.innerHTML = `
            <p>Partida ${index + 1}: ${partida[0].nome} vs ${partida[1].nome}</p>
            <button onclick="registrarResultado(${index}, ${JSON.stringify(partida).replace(/"/g, '&quot;')}, true)">Vencedor: ${partida[0].nome}</button>
            <button onclick="registrarResultado(${index}, ${JSON.stringify(partida).replace(/"/g, '&quot;')}, false)">Vencedor: ${partida[1].nome}</button>
        `;
        chavesDiv.appendChild(partidaDiv);
    });
}

function registrarResultado(partidaIndex, partidaJson, jogador1Venceu) {
    const partida = JSON.parse(partidaJson);
    const vencedor = jogador1Venceu ? partida[0] : partida[1];
    const perdedor = jogador1Venceu ? partida[1] : partida[0];

    fetch('/partidas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vencedor: vencedor.id, perdedor: perdedor.id }),
    }).then(() => {
        atualizarTorneio(vencedor);
    });
}

function atualizarTorneio(vencedor) {
    const chavesDiv = document.getElementById('chaves');
    const partidasAtuais = Array.from(chavesDiv.querySelectorAll('button')).map(button => button.disabled = true);

    const vencedores = Array.from(chavesDiv.querySelectorAll('button')).filter(button => button.innerText.includes(vencedor.nome));
    vencedores.forEach(vitoria => {
        vitoria.parentNode.innerHTML = `<p>Partida - Vencedor: ${vencedor.nome}</p>`;
    });

    const proximosJogadores = vencedores.map(vitoria => {
        const partidaTexto = vitoria.parentNode.innerText.split(' - Vencedor: ')[1];
        return { id: vencedor.id, nome: partidaTexto };
    });

    if (proximosJogadores.length > 1) {
        const novasPartidas = gerarPartidasAleatorias(proximosJogadores);
        mostrarChaves(novasPartidas);
    } else {
        chavesDiv.innerHTML += `<p>Torneio Concluído! Campeão: ${vencedor.nome}</p>`;
    }
}
