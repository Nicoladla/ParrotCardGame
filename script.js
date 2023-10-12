//Embaralhando array.
function embaralharArray(array){
    for(let i =array.length-1; i>0; i--){
        let j = Math.floor( Math.random() * (i + 1) );
        [array[i],array[j]]=[array[j],array[i]];
    }
}

//Lista das cartas viradas.
const listaDeCartasVirada= [
    'bobross', 'explody', 'fiesta',
    'metal', 'revertit', 'triplets', 'unicorn'
];
embaralharArray(listaDeCartasVirada);

//Inicia o jogo.
const contador= document.querySelector('.contador');
let contando;
function iniciarJogo(){
    //Pergunta a quantidade de cartas e verifica se é válido.
    let numeroDeCartas= Number(prompt(`Com quantas cartas você deseja jogar?`));

    while(numeroDeCartas<4 || numeroDeCartas>14 || numeroDeCartas%2 !==0){
        let perguntarNovamente= Number(prompt(`Número inválido. Escolha um número "par" entre 4 e 14. `));
        numeroDeCartas = perguntarNovamente;
    }

    //Iniciando o contador.
    contador.innerHTML= 0;

    function contar(){
        contador.innerHTML++;
    }
    contando= setInterval(contar, 1000);

    //Distribui as cartas.
        //Vai armazenar e embaralhar a lista de carta virada de acordo com o numero de carta.
    let usandoCartaVirada= [];

    for(let i=0; i<numeroDeCartas/2; i++){
        usandoCartaVirada.push(listaDeCartasVirada[i]);
    }

    usandoCartaVirada= usandoCartaVirada.concat(usandoCartaVirada);
    embaralharArray(usandoCartaVirada);

        //Vai distribuir as cartas de forma aleatória.
    const listaDeCartas= document.querySelector('ul');
    listaDeCartas.innerHTML="";

    for(let i=0; i<numeroDeCartas; i++){
        listaDeCartas.innerHTML+= `<li class="${usandoCartaVirada[i]} carta" onclick="VirarCarta(this)"></li>`
    }
}
iniciarJogo()

//Esconde a carta quando selecionado 2 cartas diferentes.
function esconderCarta(){

    //Pega as duas cartas que estão com a mesma classe.
    const cartasDeMesmaClasse1= document.querySelectorAll(`.${carta1}`);
    const cartasDeMesmaClasse2= document.querySelectorAll(`.${carta2}`);

    //Verifica qual das cartas esta virada e esconde ela.
    for(let i=0; i<2; i++){
        let verificarCarta1= cartasDeMesmaClasse1[i].classList.contains('carta');
        let verificarCarta2= cartasDeMesmaClasse2[i].classList.contains('carta');

        if(!verificarCarta1){
            cartasDeMesmaClasse1[i].classList.add('carta');
        }
        if(!verificarCarta2){
            cartasDeMesmaClasse2[i].classList.add('carta');
        }
    }
    carta1= "";
    carta2= "";
}

//Vira a carta ao clicar.
let numeroDeJogadas= 0;
let carta1="";
let carta2="";
function VirarCarta(cartaClicada){

    //Verifica se é a primeira ou a segunda carta clicada.
    if(cartaClicada.classList.contains('carta') && carta1 == ""){
        cartaClicada.classList.remove('carta');

        carta1= cartaClicada.classList.value;
        numeroDeJogadas++

    }else if(cartaClicada.classList.contains('carta') && carta2 == ""){
        cartaClicada.classList.remove('carta');

        carta2= cartaClicada.classList.value;
        numeroDeJogadas++
    }

    //Verifica se as cartas são iguais ou diferentes.
    if(carta1 && carta2 !== "" && carta1 === carta2){
        carta1= "";
        carta2= "";

    }else if(carta1 && carta2 !== "" && carta1 !== carta2){
        setTimeout(esconderCarta, 1000);
    }

    jogoFinalizado()
}

//Verifica se ainda existe cartas escondidas, se não existir, o jogo é finalizado.
function jogoFinalizado(){

    const temCartaEscondida= document.querySelector(".carta");

    if(temCartaEscondida === null){
        clearInterval(contando);

        function resultadoDoJogo(){
            alert(`Você ganhou em ${numeroDeJogadas} jogadas e em ${contador.innerHTML} segundos!`);

            const querJogarNovamente= confirm('Deseja jogar novamente?');
            if(querJogarNovamente){
                setTimeout(iniciarJogo, 1000);
            }
        }
        setTimeout(resultadoDoJogo, 1000);
    }
}