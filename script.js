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

//Pergunta a quantidade de cartas e verifica se é válido.
let numeroDeCartas= Number(prompt(`Com quantas cartas você deseja jogar?`));

while(numeroDeCartas<4 || numeroDeCartas>14 || numeroDeCartas%2 !==0){
    let perguntarNovamente= Number(prompt(`Número inválido. Escolha um número "par" entre 4 e 14. `));
    numeroDeCartas = perguntarNovamente;
}

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

for(let i=0; i<numeroDeCartas; i++){
    listaDeCartas.innerHTML+= `<li class="${usandoCartaVirada[i]} carta" onclick="VirarCarta(this)"></li>`
}




//Vira a carta ao clicar.
function VirarCarta(cartaClicada){
    cartaClicada.classList.toggle('carta');
}