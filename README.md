# Gerenciamento de Jogadores

Este projeto é um sistema de gerenciamento de jogadores que permite criar, listar, editar, remover jogadores, registrar partidas, e exibir o ranking dos jogadores com base em seus pontos. O projeto é implementado em Node.js e utiliza a biblioteca `readline` para interação via linha de comando.

## Funcionalidades

1. **Criar Jogador**: Permite cadastrar um novo jogador com nome, jogo e pontos iniciais.
2. **Listar Jogadores**: Exibe a lista de jogadores cadastrados.
3. **Editar Jogador**: Permite editar as informações de um jogador existente.
4. **Remover Jogador**: Remove um jogador da lista de jogadores.
5. **Registrar Partida**: Registra uma partida entre dois jogadores, atualizando os pontos, vitórias e derrotas.
6. **Ranking dos Jogadores**: Exibe o ranking dos jogadores com base em seus pontos.
7. **Sair**: Encerra o programa.

## Estrutura de Dados

- **jogador**: Array que armazena os jogadores com suas informações (nome, jogo, pontos, vitórias, derrotas).
- **ranking**: Array que será usado para exibir o ranking dos jogadores com base nos pontos.
- **partidas**: Array que registra as partidas realizadas entre os jogadores.
- **estatisticas**: Array que armazena as estatísticas de vitórias e derrotas de cada jogador.

## Como Usar

1. Clone este repositório.
2. Instale o Node.js se ainda não o tiver.
3. Execute o script com o comando `node script.js`.
4. Siga as instruções no menu para gerenciar jogadores e partidas.
