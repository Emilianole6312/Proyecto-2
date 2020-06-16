let gameone = document.getElementById("gameone");
let gametwo = document.getElementById("gametwo");
let gamethree = document.getElementById("gamethree");
let styleOne = document.getElementById("oscuro");
let styleTwo = document.getElementById("claro");
let contenedorJuego = document.getElementById("contenedorJuego");

let navbar = document.getElementsByClassName("navbar");
let lateral = document.getElementsByClassName("lateral");
let content = document.getElementsByClassName("content");
let uno = document.getElementsByClassName("uno");
let dos = document.getElementsByClassName("dos");
let tres = document.getElementsByClassName("tres");
let cuatro = document.getElementsByClassName("cuatro");

/*Se muestra juego 1*/
fetch("../Templates/Blackjack.html")
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    console.log(text);
    document.getElementById("gameone").addEventListener("click", () => {
      document.getElementById("contenedorJuego").innerHTML = text;
    })
  })


/*let text = document.createElement("p");
text.innerText = "Algo";*/

let otro = document.createElement("p");
otro.innerText = "Juego 2";

let otroDos = document.createElement("p");
otroDos.innerText = "Juego 3";

/*gameone.onclick = function() {
    $(contenedorJuego).load(text);
    contenedorJuego.appendChild(text);
};*/

gametwo.onclick = function() {
    $(contenedorJuego).empty();
    contenedorJuego.appendChild(otro);
}

gamethree.onclick = function() {
    $(contenedorJuego).empty();
    contenedorJuego.appendChild(otroDos);
}
claro.onclick = function() {
    $(navbar).css("background-color", "#389448");
    $(lateral).css("background-color", "#D4CC62");
    $(content).css("background-color", "#D4CC62");
    $(uno).css("background-color", "#D94223");
    $(dos).css("background-color", "#F69221");
    $(tres).css("background-color", "#91B41E");
    $(cuatro).css("background-color", "#F3401F");
    document.body.style.backgroundColor = "#D4CC62";
}

oscuro.onclick = function() {
    $(navbar).css("background-color", "#4169E1");
    $(lateral).css("background-color", "#4A4B71");
    $(content).css("background-color", "#4A4B71");
    $(uno).css("background-color", "#C4619F");
    $(dos).css("background-color", "#4169E1");
    $(tres).css("background-color", "#02BF71");
    $(cuatro).css("background-color", "#BF02AF");
    document.body.style.backgroundColor = "#4A4B71";
}
