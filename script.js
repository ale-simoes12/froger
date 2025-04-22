const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const frogSize = 40; 
const cellSize = 50;

let frog = {
    width: frogSize,
    height: frogSize,
    x: (canvas.width / 2) - (frogSize / 2),
    y: canvas.height - cellSize + (cellSize - frogSize) / 2
}



function desenharSapo(){
    color = "lime";
    ctx.fillStyle = color;
    ctx.fillRect(frog.x, frog.y, frog.width, frog.height);
}


function movesapo(cordenada,direcao){
    if(cordenada == "x"){
      frog.x += frogSize*direcao;
    }
    if(cordenada == "y"){
        frog.y += frogSize*direcao;
      }
}



function update(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(update);
    desenharSapo();
}

update();

document.addEventListener("keydown", function (event) {
  
    if (event.key == "ArrowDown") {
        movesapo("y", 1)
    }
  
    if (event.key == "ArrowUp") {
        movesapo("y",-1)
    }
  
    if (event.key == "ArrowRight") {
        movesapo("x",1)
    }
  
    if (event.key == "ArrowLeft") {
        movesapo("x",-1)
    }
  });