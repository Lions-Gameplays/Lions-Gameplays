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
function rankingJogador(){
    if(jogador==""){
        console.log('Não há jogadores cadastrados!')
        exibirMenu()
    } else {
        ranking1=jogador[0]
        ranking2=jogador[0]
        ranking3=jogador[0]
        ranking4=jogador[0]
        ranking5=jogador[0]
        jogador.forEach((nome,i)=>{
            if(jogador[i]>ranking1){
                ranking1.push(jogador[i])
            }else if (jogador[i]<ranking1 && jogador[i]>ranking2){
                ranking2.push(jogador[i])
            }else if (jogador[i]<ranking2 && jogador[i]>ranking3){
                ranking3.push(jogador[i])
            }else if (jogador[i]<ranking3 && jogador[i]>ranking4){
                ranking4.push(jogador[i])
            }else if (jogador[i]<ranking4 && jogador[i]>ranking5){
                ranking5.push(jogador[i])
            }else{
            }
        })
        console.log(`
            O ranking é:
            1º:${ranking1}
            2º:${ranking2}
            3º:${ranking3}
            4º:${ranking4}
            5º:${ranking5}`)
        exibirMenu()
    }
}
function partidaJogador(){
    if(jogador==''){
        console.log('Não há jogadores cadastrados!')
        exibirMenu()
    }else{
        console.log(listar)
        rl.question('Qual o jogador venceu a partida?',(jog1)=>{
            rl.question('Qual o jogador perdeu a partida?',(jog2)=>{
                jogador[jog1-1].pontos(+1)
                jogador[jog2-1].pontos(-1)
            })
        })
    }
    console.log('Partida realizada!')
    exibirMenu()
}
function estatisticas(){
    if(jogador==''){
        console.log('Não há jogadores cadastrados!')
        exibirMenu()
    }else{
        jogador.forEach((nome,i)=>{
            
        })   
    }

}