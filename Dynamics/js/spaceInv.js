const width = 500;
const height = 500;

//funcion para disparar :S
function disparar(gun,target){
  console.log("Holaaaa");
  let gunX = gun.posX;
  let gunY = gun.posY;
  let targetX = target.posX;
  let targetY = target.posY;
  let bala = new Bala(gunX,gunY,(gunY<targetY)?1:-1);
  if(bala.dir==1){
    while(bala.posY<targetY){
      bala.abajo();
      console.log("Allá voy!");
    }
    if((bala.posY==targetY)&&(bala.posX==targetX)){
      console.log("AUUUUCHH");
    }
    else{
      console.log("uuuff FALLASTE JAJA");
    }
  }
  else if(bala.dir==-1){
    while(bala.posY>targetY){
      bala.arriba();
      console.log("Me toca a mí")
    }
    if((bala.posY==targetY)&&(bala.posX==targetX)){
      console.log("TE ODIOOO PERRY EL ORNITORRINCOOOO");
    }
    else{
      console.log("Sigo vivo JAJAAAAA");
    }
  }
}

var avance = (width-60)/10;//a maximo 44
//funcion que imprime nave mala en canvas
function naveMala(){
  let a = 0;
  a = (malo.posX<avance)? 1:0;
  if(a == 0){
    context.clearRect((malo.posX)-1,20,j*10,50);
    context.beginPath();
    context.translate(malo.posX,0);
    context.rect(0,30,60,20);
    context.lineWidth = 2;
    context.fillStyle = "red";
    context.fill();
    context.stroke();
    context.translate(-malo.posX,0);
    j++;
    a = (malo.posX == avance)? 1:0;
  }else if(a == 1){
    context.clearRect((j*10)-11,20,j*10,50);
    context.beginPath();
    context.translate(j-10,0);
    context.rect(0,30,60,20);
    context.lineWidth = 2;
    context.fillStyle = "red";
    context.fill();
    context.stroke();
    context.translate(j+10,0);
    j--;
    a = (j*10 == 0)? 0:1;
  }
  requestAnimationFrame(naveMala());
}


//se define la clase que moldea las balas que se dispararán
class Bala {
  constructor(posX,posY,dir){
    this.posX = posX;
    this.posY = posY;
    this.dir = dir;
  }
  abajo(){
    this.posY += 1;
  }
  arriba(){
    this.posY -= 1;
  }
}

//molde de naves :)
class Nave {
  constructor(posX,posY){
    this.posX = posX;
    this.posY = posY;
  }
  derecha(){
    this.posX += 1;
  }
  izquierda(){
    this.posX -= 1;
  }
}

//se declaran las naves
let malo = new Nave(0,0);
let jugador = new Nave(0,6);

let dispararMalo = disparar(malo,jugador);

//nave enemiga se desplaza
var i = 0;
var a = 0;

/*var desplazarMalo = setInterval(function (){
  i++;
  if(a == 0){
    malo.derecha();
    console.log("(" + malo.posX + "," + malo.posY + ")");
    a = (malo.posX == 6)? 1:0;
  }
  else if(a == 1){
    malo.izquierda();
    console.log("(" + malo.posX + "," + malo.posY + ")");
    a = (malo.posX == 0)? 0:1;
  }
  if(i==24){
    clearInterval(desplazarMalo);
  }
}, 1000);*/


//el jugador se desplaza
$(document).keydown(function(event){
  if(event.which == 39){
    if(jugador.posX != 6){
      jugador.derecha();
      console.log("(" + jugador.posX + "," + jugador.posY + ")");
    }else{
      console.log("(" + jugador.posX + "," + jugador.posY + ")");
    }
  }
  if(event.which == 37){//tope
    if(jugador.posX != 0){
      jugador.izquierda();
      console.log("(" + jugador.posX + "," + jugador.posY + ")");
    }
    else{
      console.log("(" + jugador.posX + "," + jugador.posY + ")");
    }
  }
});

//el jugador dispara
$(document).keydown(function(event){
  if((event.which == 13)||(event.which == 32)){
    disparar(jugador,malo);
  }
});

let canvas = document.getElementById('spaceInv');
canvas.width = width;
canvas.height = height;

let context = canvas.getContext('2d');
naveMala(context);


context.beginPath();
context.arc(60,70,5,0,2*Math.PI);
context.fillStyle = "black";
context.fill();
context.closePath();
context.stroke();

context.beginPath();
context.rect(30,90,60,20);
context.fillStyle = "green";
context.fill();
context.closePath();
context.stroke();

let j = 0;
//posX = malo.posX;
requestAnimationFrame(naveMala());
