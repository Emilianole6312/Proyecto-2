let navbar = document.getElementsByClassName("navbar");
let lateral = document.getElementsByClassName("lateral");
let content = document.getElementsByClassName("content");

let uno = document.getElementsByClassName("uno");
let dos = document.getElementsByClassName("dos");
let tres = document.getElementsByClassName("tres");
let cuatro = document.getElementsByClassName("cuatro");

let gameone = document.getElementById("gameone");
let gametwo = document.getElementById("gametwo");
let gamethree = document.getElementById("gamethree");

let sinopsis1 = document.getElementById("sinopsis1");
let sinopsis2 = document.getElementById("sinopsis2");
let sinopsis3 = document.getElementById("sinopsis3");

let divJuego1 = document.getElementById("juego1");
let divJuego2 = document.getElementById("juego2");
let divJuego3 = document.getElementById("juego3");

let styleOne = document.getElementById("oscuro");
let styleTwo = document.getElementById("claro");
let contenedorJuego = document.getElementById("contenedorJuego");

let creditos = document.getElementById("boton_creditos");
let divCred = document.getElementById("creditos");


sinopsis1.onclick = function() {
  fetch("../Templates/descripJ1.html")
  .then((response => {
      return response.text();
  }))
  .then((data) => {
    divJuego1.innerHTML = data;
  })
  .catch((error) => {
    console.error(error);
  })
};

sinopsis2.onclick = function() {
  fetch("../Templates/descripJ2.html")
  .then((response => {
      return response.text();
  }))
  .then((data) => {
    divJuego2.innerHTML = data;
  })
  .catch((error) => {
    console.error(error);
  })
};

sinopsis3.onclick = function() {
  fetch("../Templates/descripJ3.html")
  .then((response => {
      return response.text();
  }))
  .then((data) => {
    divJuego3.innerHTML = data;
  })
  .catch((error) => {
    console.error(error);
  })
};

gameone.onclick = function() {
  fetch("../Templates/blackjack.html")
  .then((response => {
    return response.text();
  }))
  .then((data) => {
    divJuego1.remove();
    divJuego2.remove();
    divJuego3.remove();
    contenedorJuego.innerHTML = data;
    $("#jugar").click(blackjackgame);
  })
  .catch((error) => {
    console.error(error);
  })
};

// gametwo.onclick = function() {
//     $(contenedorJuego).empty();
//     contenedorJuego.appendChild(otro);
// }
//
// gamethree.onclick = function() {
//     $(contenedorJuego).empty();
//     contenedorJuego.appendChild(otroDos);
// }

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
