const readline = require('readline')

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

let jogador = [] //nome,jogo,pontos CRUD
let ranking = [] //baseado nos pontos
let partidas = [] //quem ganhou,quem perdeu, ganhou +1 perdeu -1

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
    7.Sair.`)
    rl.question(`O que gostaria de fazer?`,(funcao)=>{
        switch(funcao){
            case '1': 
                cadastrarJogador()
                break
            case '2': 
                listarJogadores()
                break
            case '3': 
                editarJogador()
                break
            case '4': 
                removerJogador()
                break
            case '5':
                partidaJogador()
                break
            case '6':
                rankingJogador()
                break
            case '7':
                rl.close()
                break
            default:
                console.log('Opção Inválida, digite novamente.')
                exibirMenu()
                break
        }
    })
}
function rankingJogador() {
    if (jogador.length === 0) {
        console.log('Não há jogadores cadastrados!');
        exibirMenu();
    } else {
        let ranking = jogador.slice().sort((a, b) => b.pontos - a.pontos);
        ranking = ranking.slice(0, 5);
        console.log("O ranking é:");
        ranking.forEach((jog, index) => {
            console.log(`${index + 1}º: ${jog.nome} - ${jog.pontos} pontos`);
        });

        exibirMenu();
    }
}
function partidaJogador() {
    if (jogador.length === 0) {
        console.log('Não há jogadores cadastrados!');
        exibirMenu();
    } else {
        console.log('Lista de jogadores');
        jogador.forEach((jogador, index) => {
            console.log(`${index + 1}. ${jogador.nome}`);
        });

        rl.question('Qual o jogador venceu a partida? (número): ', (jog1) => {
            const vencedorIndex = parseInt(jog1) - 1;
            if (vencedorIndex >= 0 && vencedorIndex < jogador.length) {
                rl.question('Qual o jogador perdeu a partida? (número): ', (jog2) => {
                    const perdedorIndex = parseInt(jog2) - 1;
                    if (perdedorIndex >= 0 && perdedorIndex < jogador.length) {
                        jogador[vencedorIndex].pontos++;
                        jogador[vencedorIndex].vitoria++;
                        jogador[perdedorIndex].pontos--;
                        jogador[perdedorIndex].derrota++;
                        console.log('Partida realizada!');
                    } else {
                        console.log("Número inválido para perdedor, retornando...");
                    }
                    exibirMenu();
                });
            } else {
                console.log("Número inválido para vencedor, retornando...");
                exibirMenu();
            }
        });
    }
}

function cadastrarJogador() {
    rl.question('Digite o nome do jogador: ', (nome) => {
        rl.question('Digite o jogo do jogador: ', (jogo) => {
            rl.question('Digite os pontos do jogador: ', (pontos) =>{
                jogador.push({nome: nome, jogo: jogo, pontos: parseInt(pontos), vitoria: 0 , derrota: 0})
                console.log('Jogador cadastrado com sucesso!')
                exibirMenu()
            })
        })  
    })
}
function listarJogadores() {
    if(jogador == '') {
        console.log('Não há jogadores cadastrados')
            exibirMenu()
        }else{
            console.log('Há jogadores cadastrados')
            for(let i = 0; i < jogador.length; i++){
                console.log(jogador[i])
        }exibirMenu()
    }
}
    function editarJogador(){
        if(jogador.length==0) {
            console.log('Não há jogadores para editar.')
        }else{
            console.log('Lista de jogadores')
            jogador.forEach((jogador, index) => {
              console.log(`${index + 1}. ${jogador.nome}`)  
            })
            rl.question('Digite o número do jogador: ', (numero) => {
                if(numero > 0 && numero <= jogador.length){
                    rl.question('Digite o novo jogador: ', (nome) => {
                        rl.question('Digite o  jogo: ', (jogo) =>{
                            rl.question('Digite os pontos do novo jogador: ', (pontos) =>{
                                jogador[numero - 1] = {
                                    nome,
                                    jogo,
                                    pontos
                                }
                                exibirMenu()
                            })
                        })
                    })
                }else{
                    console.log('Numero não reconhecido,retornando...')
                    exibirMenu()
                }
            })
        }
    }
    function removerJogador() {
        if (jogador.length == 0) {
            console.log('Não há jogadores para remover.')
            exibirMenu()
        } else {
                console.log('Lista de Jogadores:')
                jogador.forEach((jogador, index) => {
                    console.log(`${index + 1}. ${jogador.nome}`)
                })
                rl.question('Digite o jogador que deseja remover: ', (remover) => {
                    if(remover > 0 && remover<= jogador.length) {
                        jogador.splice (remover -1, 1)
                        console.log('Jogador removido com sucesso!')
                        exibirMenu()
                    }else {
                        console.log('Opção Inválida, digite novamente.')
                        exibirMenu()
                    }
            })
        }
    }