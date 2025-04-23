const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const frogSize = 30;
const cellSize = 50;
let intervalCarros = null;
let gapTronco = 0;
let estaNotronco = false;
let primeiroTronco = false;
let aumentarY = -20;

let frog = {
    width: frogSize,
    height: frogSize,
    x: (canvas.width / 2) - (frogSize / 2),
    // y: canvas.height - cellSize + (cellSize - frogSize) / 2
    y: canvas.height- frogSize -30
}

let ArrayCarrosFaixa1 = [];
let ArrayCarrosFaixa2 = [];
let ArrayCarrosFaixa3 = [];
let ArrayCarrosFaixa4 = [];
let ArrayCarrosFaixa5 = [];

let ArrayTroncoFaixa1 = [];
let ArrayTroncoFaixa2 = [];
let ArrayTroncoFaixa3 = [];
let ArrayTroncoFaixa4 = [];
let ArrayTroncoFaixa5 = [];
let buracos = [];


function desenhaCalcada() {
    ctx.fillStyle = "purple";
    ctx.fillRect(0,260, canvas.width, 70);
}

function desenhaComeco() {
    ctx.fillStyle = "gray";
    ctx.fillRect(0,575, canvas.width, 70);
}



function geraTronco() {
    let tronco = { x: -100, y: 60, width: 100, height: 30, velocidade: 1.5, direcao: 'direita' };
    let tronco2 = { x: canvas.width + 100, y: 100, width: 70, height: 30, velocidade: -1.5, direcao: 'esquerda' };
    let tronco3 = { x: -160, y: 140, width: 160, height: 30, velocidade: 1, direcao: 'direita' };
    let tronco4 = { x: canvas.width + 100, y: 180, width: 130, height: 30, velocidade: -1.5, direcao: 'esquerda' };
    let tronco5 = { x: -150, y: 220, width: 150, height: 30, velocidade: 1.5, direcao: 'esquerda' };
    ArrayTroncoFaixa1.push(tronco);
    ArrayTroncoFaixa2.push(tronco2);
    ArrayTroncoFaixa3.push(tronco3);
    ArrayTroncoFaixa4.push(tronco4);
    ArrayTroncoFaixa5.push(tronco5);
}


function desenharTronco() {
    for (let indexTroncos = 0; indexTroncos < ArrayTroncoFaixa1.length; indexTroncos++) {
        let troncoFaixa1 = ArrayTroncoFaixa1[indexTroncos];
        let troncoFaixa2 = ArrayTroncoFaixa2[indexTroncos];
        let troncoFaixa3 = ArrayTroncoFaixa3[indexTroncos];
        let troncoFaixa4 = ArrayTroncoFaixa4[indexTroncos];
        let troncoFaixa5 = ArrayTroncoFaixa5[indexTroncos];
        troncoFaixa1.x += troncoFaixa1.velocidade;
        troncoFaixa2.x += troncoFaixa2.velocidade;
        troncoFaixa3.x += troncoFaixa3.velocidade;
        troncoFaixa4.x += troncoFaixa4.velocidade;
        troncoFaixa5.x += troncoFaixa5.velocidade;
        color = "red";
        ctx.fillStyle = color;
        ctx.fillRect(troncoFaixa1.x, troncoFaixa1.y, troncoFaixa1.width, troncoFaixa1.height);
        ctx.fillRect(troncoFaixa2.x, troncoFaixa2.y, troncoFaixa2.width, troncoFaixa2.height);
        ctx.fillRect(troncoFaixa3.x, troncoFaixa3.y, troncoFaixa3.width, troncoFaixa3.height);
        ctx.fillRect(troncoFaixa4.x, troncoFaixa4.y, troncoFaixa4.width, troncoFaixa4.height);
        ctx.fillRect(troncoFaixa5.x, troncoFaixa5.y, troncoFaixa5.width, troncoFaixa5.height);
    }

}


function criaBuracos(){
    const casas = 3;
    const larguraCasa = 50;
    const alturaCasa = 50;
    const yBuraco = 0;
    const espacamento = (canvas.width - casas * larguraCasa) / (casas + 1);
    for (let i = 0; i < casas; i++) {

    console.log(i);
    const x = espacamento + i * (larguraCasa + espacamento);
    let buraco = {x: x,y: yBuraco + 8,width: larguraCasa,height: alturaCasa - 8,ocupado: false}
    buracos.push(buraco);
    }
}


function resetaSapo(){
     frog = {
        width: frogSize,
        height: frogSize,
        x: (canvas.width / 2) - (frogSize / 2),
        // y: canvas.height - cellSize + (cellSize - frogSize) / 2
        y: canvas.height- frogSize -30
    }
}

function verificaEntrouBuraco(){
    for (let i = 0; i < buracos.length; i++) {
        const buraco = buracos[i];

        const colisaoHorizontal = frog.x + frog.width > buraco.x && frog.x < buraco.x + buraco.width;
        const colisaoVertical = frog.y + frog.height > buraco.y && frog.y < buraco.y + buraco.height;

        if (colisaoHorizontal && colisaoVertical && !buraco.ocupado) {
            buraco.ocupado = true;
            resetaSapo()
            break;
        }
    }
}

function desenharBuracosDeChegada() {
    const imgSapoVitoria = new Image();
    imgSapoVitoria.src = "Images/sapoVitoria.png";
    const casas = 3;
    const larguraCasa = 50;
    const alturaCasa = 50;
    const espacamento = (canvas.width - casas * larguraCasa) / (casas + 1);
    const y = 0;
    ctx.fillStyle = "limegreen";
    ctx.fillRect(0, y, canvas.width, alturaCasa);
    // for (let i = 0; i < casas; i++) {
    //     const x = espacamento + i * (larguraCasa + espacamento);
    //     ctx.fillStyle = "black";
    //     ctx.fillRect(x, y + 8, larguraCasa, alturaCasa - 8);
    //     ctx.drawImage(imgSapoVitoria, x, y + 8, larguraCasa, alturaCasa-8);
    // }
    console.log(buracos);
    for (let i = 0; i < buracos.length ; i++) {
        ctx.fillStyle = "black";
        ctx.fillRect(buracos[i].x, buracos[i].y, buracos[i].width,buracos[i].height);
        if(buracos[i].ocupado == true){
            ctx.drawImage(imgSapoVitoria, buracos[i].x, buracos[i].y, buracos[i].width,buracos[i].height);
        }
    }
}





function vericaSapoNoTronco(ArrayTronco) {
    for (let tronco of ArrayTronco) {
        const colisaoHorizontal = frog.x + frog.width > tronco.x && frog.x < tronco.x + tronco.width;
        const colisaoVertical = frog.y + frog.height > tronco.y && frog.y < tronco.y + tronco.height;
    

        if (colisaoHorizontal && colisaoVertical) {
            estaNotronco = true;
            return tronco;
        }
    }


}


function criaCarros() {
    let carro = { x: -100, y: 520+aumentarY, width: 70, height: 30, velocidade: 1.5, direcao: 'direita' };
    let carro2 = { x: canvas.width + 100, y: 480+aumentarY, width: 70, height: 30, velocidade: -1.5, direcao: 'esquerda' };
    let carro3 = { x: -100, y: 440+aumentarY, width: 70, height: 30, velocidade: 1, direcao: 'direita' };
    let carro4 = { x: canvas.width + 100, y: 400+aumentarY, width: 70, height: 30, velocidade: -1.5, direcao: 'esquerda' };
    let carro5 = { x: -100, y: 360+aumentarY, width: 70, height: 30, velocidade: 1.5, direcao: 'esquerda' };
    ArrayCarrosFaixa1.push(carro);
    ArrayCarrosFaixa2.push(carro2);
    ArrayCarrosFaixa3.push(carro3);
    ArrayCarrosFaixa4.push(carro4);
    ArrayCarrosFaixa5.push(carro5);
}

function gerarIntervalo() {
    criaCarros();
    geraTronco();
    intervalCarros = setInterval(criaCarros, 3000);
    intervalTroncos = setInterval(geraTronco, 3000);

}


function desenharSapo() {
    color = "lime";
    ctx.fillStyle = color;
    ctx.fillRect(frog.x, frog.y-gapTronco, frog.width, frog.height);
}


function movesapo(cordenada, direcao) {
    let gap = 0
    console.log("primeiro tronco" , primeiroTronco);
    if (cordenada == "x") {
        
        let novaX = frog.x + 40 * direcao;
        frog.x = Math.max(0, Math.min(canvas.width - frog.width, novaX));
    }
    if (cordenada == "y") {
        console.log(frog.y);


        // if(estaNotronco == true  && direcao == -1 ){
        //     gap  = -10;
        // }
        
        // else if(estaNotronco == true  && direcao == 1 && primeiroTronco == true ){
        //     gap  = 0;
        //     console.log("primeiro tronco")
        // }

        // else if(estaNotronco == true  && direcao == 1 ){
        //     gap  = 10;
        //     console.log("caiu")
        // }
    
        // else{
        //     gap = 0;
        // }
        
        if(frog.y  == 540 && direcao == 1 ){
            return
        }
        frog.y += (40 * direcao);

    }

    console.log(frog.y);
}


function desenharCarro() {
    for (let indexCarros = 0; indexCarros < ArrayCarrosFaixa1.length; indexCarros++) {
        let carroFaixa1 = ArrayCarrosFaixa1[indexCarros];
        let carroFaixa2 = ArrayCarrosFaixa2[indexCarros];
        let carroFaixa3 = ArrayCarrosFaixa3[indexCarros];
        let carroFaixa4 = ArrayCarrosFaixa4[indexCarros];
        let carroFaixa5 = ArrayCarrosFaixa5[indexCarros];
        carroFaixa1.x += carroFaixa1.velocidade;
        carroFaixa2.x += carroFaixa2.velocidade;
        carroFaixa3.x += carroFaixa3.velocidade;
        carroFaixa4.x += carroFaixa4.velocidade;
        carroFaixa5.x += carroFaixa5.velocidade;
        color = "red";
        ctx.fillStyle = color;
        ctx.fillRect(carroFaixa1.x, carroFaixa1.y, carroFaixa1.width, carroFaixa1.height);
        ctx.fillRect(carroFaixa2.x, carroFaixa2.y, carroFaixa2.width, carroFaixa2.height);
        ctx.fillRect(carroFaixa3.x, carroFaixa3.y, carroFaixa3.width, carroFaixa3.height);
        ctx.fillRect(carroFaixa4.x, carroFaixa4.y, carroFaixa4.width, carroFaixa4.height);
        ctx.fillRect(carroFaixa5.x, carroFaixa5.y, carroFaixa5.width, carroFaixa5.height);
    }
}

function verificaTroncoFaixa() {
    
    if (vericaSapoNoTronco(ArrayTroncoFaixa1)) {
        frog.x += vericaSapoNoTronco(ArrayTroncoFaixa1).velocidade;
        primeiroTronco = false;
    }
    else if (vericaSapoNoTronco(ArrayTroncoFaixa2)) {
        frog.x += vericaSapoNoTronco(ArrayTroncoFaixa2).velocidade;
        primeiroTronco = false;
    }
    else if (vericaSapoNoTronco(ArrayTroncoFaixa3)) {
        frog.x += vericaSapoNoTronco(ArrayTroncoFaixa3).velocidade;
        primeiroTronco = false;
    }
    else if (vericaSapoNoTronco(ArrayTroncoFaixa4)) {
        primeiroTronco = false;
        frog.x += vericaSapoNoTronco(ArrayTroncoFaixa4).velocidade;
        
    }

    else if (vericaSapoNoTronco(ArrayTroncoFaixa5)) {
        primeiroTronco = true;
        frog.x += vericaSapoNoTronco(ArrayTroncoFaixa5).velocidade;
        
    }

    else{
        estaNotronco = false;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // if(vericaSapoNoTronco()){
    //     console.log("entrou")
    //     frog.x += vericaSapoNoTronco().velocidade;
    // }
    verificaTroncoFaixa();
    verificaEntrouBuraco()
    requestAnimationFrame(update);
    desenharCarro();
    desenharBuracosDeChegada();
    desenhaCalcada();
    desenhaComeco();
    desenharTronco();
    desenharSapo();

}

gerarIntervalo();
update();
criaBuracos();

document.addEventListener("keydown", function (event) {

    if (event.key == "ArrowDown") {
        movesapo("y", 1)
    }

    if (event.key == "ArrowUp") {
        movesapo("y", -1)
    }

    if (event.key == "ArrowRight") {
        movesapo("x", 1)
    }

    if (event.key == "ArrowLeft") {
        movesapo("x", -1)
    }
});