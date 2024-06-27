const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

let jogadores = [];

app.use(bodyParser.json());
app.use(express.static('public'));

const saveData = () => {
    fs.writeFileSync('data.json', JSON.stringify(jogadores, null, 2));
};

const loadData = () => {
    if (fs.existsSync('data.json')) {
        jogadores = JSON.parse(fs.readFileSync('data.json'));
    }
};

function padText(text, length) {
    if (text.length > length) {
        return text.slice(0, length); // Corta o texto se for maior que o comprimento desejado
    }
    return text.padEnd(length, ' '); // Adiciona espaços se for menor que o comprimento desejado
}

loadData();

app.get('/jogadores', (req, res) => {
    res.json(jogadores);
});

app.post('/jogadores', (req, res) => {
    let { nome, jogo, pontos } = req.body;

    nome = padText(nome, 20);
    jogo = padText(jogo, 20);
    
    const jogador = req.body;
    jogador.vitorias = 0;
    jogador.derrotas = 0;
    jogadores.push(jogador);
    saveData();
    res.status(201).json(jogador);
});

app.put('/jogadores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, jogo, pontos } = req.body;
    if (id >= 0 && id < jogadores.length) {
        jogadores[id] = { ...jogadores[id], nome, jogo, pontos: parseInt(pontos) };
        saveData();
        res.status(200).json(jogadores[id]);
    } else {
        res.status(404).send('Jogador não encontrado.');
    }
});

app.delete('/jogadores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < jogadores.length) {
        jogadores.splice(id, 1);
        saveData();
        res.status(200).send('Jogador removido com sucesso.');
    } else {
        res.status(404).send('Jogador não encontrado.');
    }
});

app.post('/partidas', (req, res) => {
    const { vencedor, perdedor } = req.body;
    console.log('Recebido nova partida:', req.body);
  
    if (vencedor && perdedor) {
      partidas.push({ vencedor, perdedor });
      res.status(201).send('Partida registrada');
    } else {
      res.status(400).send('Dados incompletos');
    }
  });
  

app.get('/ranking', (req, res) => {
    const ranking = [...jogadores].sort((a, b) => b.pontos - a.pontos);
    res.json(ranking);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
