const readline = require('readline')

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let jogador = [] //nome,jogo,pontos CRUD
let ranking = [] //baseado nos pontos
let partidas = [] //quem ganhou,quem perdeu, ganhou +1 perdeu -1
let estatisticas = [] //vitórias,derrotas de cada 1

exibirMenu()

function exibirMenu(){
    console.log(`
    Menu principal:
    1.Criar Jogador;
    2.Listar Jogador;
    3.Editar Jogador;
    4.Remover Jogador;
    5.Registrar Partida;
    6.Ranking dos Jogadores;
    7.Estátiticas;
    8.Sair.`)
    rl.question(`O que gostaria de fazer?`,(funcao)=>{
        switch(funcao){
            case '1':
                break
            case '2':
                break
            case '3':
                break
            case '4':
                break
            case '5':
                break
            case '6':
                break
            case '7':
                break
            case '8':
                rl.close()
                break
        }
    })
}