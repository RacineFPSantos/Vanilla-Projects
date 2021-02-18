let order = [];
let clickedOrder = [];
let score = 0;

/*
0 - verde
1 - vermelho
2 - amarelo
3 - azul
*/

const green = document.querySelector('.green')
const red = document.querySelector('.red')
const yellow = document.querySelector('.yellow')
const blue = document.querySelector('.blue')

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i  in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

let lightColor = (element, number) =>{
    number *= 500;
    setTimeout(() =>{
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() =>{
        element.classList.remove('selected');
    }, tempo);
}

let checkOrder = () =>{
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }

    if(clickedOrder.length == order.length){
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando o próximo nível!`);
        nextLevel();
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() =>{
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);

}

let createColorElement = (color) => {
    switch(color){
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 4:
            return blue;
    }
}

let nextLevel = () =>{
    score++;
    shuffleOrder();
}

let gameOver = () =>{
    alert(`Pontuação: ${score}!\nVocê perdeu jogo!\nClique em Ok para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

let playGame = () =>{
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!')
    score = 0;

    nextLevel();
}

green.onClick = () => click(0);
red.onClick = () => click(1);
yellow.onClick = () => click(2);
blue.onClick = () => click(3);

playGame();