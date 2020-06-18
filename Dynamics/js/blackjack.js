//Elementos de jquery
//Gamezone
let gamezone = $("<div>");
gamezone.attr("class", "gamezone");

//Middle
let middle = $("<div>");
middle.attr("id", "middle");

//Crea el bottom
let bottom = $("<div>");
bottom.attr("id", "bottom");

//BottomTop
let bottomTop = $("<div>");
bottomTop.attr("id", "bottomTop");

//Cartas
let carta0 = $("<img>");
carta0.attr("class", "card");
carta0.attr("id", "carta0Player");
let carta1 = $("<img>");
carta1.attr("class", "card");
carta1.attr("id", "carta1Player");
let carta0Crupier = $("<img>");
carta0Crupier.attr("class", "card");
carta0Crupier.attr("id", "carta0Crupier");
let carta1Crupier = $("<img>");
carta1Crupier.attr("class", "card");
carta1Crupier.attr("id", "carta1Crupier");
let cartaAddCrupier = $("<img>");
cartaAddCrupier.addClass("card");
cartaAddCrupier.attr("src","../Statics/media/img/backcard.jpg")

//Div del dinero
let dineroDiv = $("<div>");
dineroDiv.attr("id","dineroDiv");
let dineroH3 = $("<h3>");
dineroH3.text("Tu dinero:");
dineroH3.addClass("indicadores");
let pasta = $("<input>");
pasta.attr("type","text");
pasta.attr("id","dinero");
pasta.addClass("info player");
pasta.attr("readonly","");
dineroDiv.append(dineroH3,pasta);

//Div del total
let totalDiv = $("<div>");
totalDiv.attr("id","totalDiv");
let total = $("<h3>");
total.text("Tus puntos: ");
total.addClass("indicadores")
let puntos = $("<input>");
puntos.attr("id","puntos")
puntos.attr("type","text");
puntos.attr("readonly","");
puntos.addClass("info puntos")
totalDiv.append(total,puntos);

//Div de las cartas
let cartasDiv = $("<div>");
cartasDiv.attr("class", "cartas");

//Input para apostar
let apuestaInput = $("<input readonly></input>");
apuestaInput.attr("type", "number");
apuestaInput.attr("id", "apuesta");
apuestaInput.addClass("button apuesta");
apuestaInput.attr("name", "apuesta");

//Boton para apostar
let apostar = $("<button>");
apostar.text("Apostar");
apostar.addClass("apostar");
apostar.attr("id", "apostar");
let bottomBottom = $("<div>");
bottomBottom.attr("id", "bottomBottom");

//Boton para plantarse
let plantarse = $("<button>PLANTARSE</button>");
plantarse.attr("id", "plantarse");
plantarse.addClass("apostar");

//Boton para pedir
let pedir = $("<button>PEDIR</button>");
pedir.attr("id", "pedir");
pedir.addClass("apostar");

//manos Cuprier
manosCrupier = $("<img>");
manosCrupier.attr("src", "../Statics/media/img/crupier.png");
manosCrupier.attr("id","manosCrupier")

//Boton para continuar
let continuar = $("<button>");
continuar.attr("id", "continuar");
continuar.text("Continuar");
continuar.addClass("apostar")

let blackjackgame = () => {
  $("#inicio").remove();
  let top = $("<div>");
  top.attr("id", "top");
  //------Crear la pantalla para apostar------
  cartasDiv.prepend(carta0, carta1);
  bottomTop.prepend(dineroDiv,cartasDiv,totalDiv);
  bottom.prepend(bottomTop, bottomBottom);
  //Meto los tres niveles (top, middle, bottom) en gamezone
  gamezone.prepend(top, middle, bottom);
  $("#blackjack_container").prepend(gamezone);
  jugar();
};

function jugar(dinero = 1000){
  //Se ponen las manos del crupier
  $("#top").empty();
  $("#top").append(manosCrupier);
  $("#bottomBottom").append(apuestaInput,apostar);
  $("#dinero").attr("value",dinero);
  $("#puntos").attr("value", "?");
  $("#carta0Player").attr("src", "../Statics/Media/img/backcard.jpg");
  $("#carta1Player").attr("src", "../Statics/Media/img/backcard.jpg");
  $("#apuesta").attr("value", "100");

  $("body").keydown(function (event) {
    apuesta = parseInt($("#apuesta").val());
    switch (event.keyCode) {
      case 38:
        apuesta += (apuesta + 100 <= dinero) ? 100 : 0;
        break;
      case 40:
        apuesta -= (apuesta - 100 >= 100) ? 100 : 0;
        break;
      }
      $("#apuesta").val(apuesta);
  });

  //Evento del botón Apostar
  $("#apostar").click(() => {
    //-----FUNCIONES------
    //Sumar los punto acumulados
    function suma(jugador) {
      let suma = 0;
      let ases = 0;
      for (carta in jugador) {  //carta es el índice
        suma += (parseInt(jugador[carta].numero) > 10) ? 10 : jugador[carta].numero;
        ases += (jugador[carta].numero === 1) ? 1 : 0;
      }
      for (let fo = 0; fo < ases; fo++) {
        suma = (parseInt(suma + 10) < 21) ? suma + 10 : suma;
      }
      return suma;
    }

    //Generar Carta aleatoria
    function cartaRandom() {
      numero = Math.round(Math.random() * 12) + 1;
      palo = Math.round(Math.random() * 3) + 1;
      let carta = new Object();
      carta.numero = numero;
      carta.palo = palo;
      cartas.push(carta);
      return carta;
    }

    //Valida que no se repitan cartas
    function generarCarta() {
      carta = cartaRandom();
      let existencia = 0;
      for (prueba in cartas) {
        if (carta.numero === prueba.numero && carta.palo === prueba.palo) {
          existencia += 1;
        }
      }
      if (existencia === 0) {
        return carta;
      }
      else {
        carta = generarCarta();
      }
    }

    function nombreCarta(carta) {
      let palo = "sin palo";
      palo = (carta.palo === 1) ? "picas" : palo;
      palo = (carta.palo === 2) ? "corazones" : palo;
      palo = (carta.palo === 3) ? "treboles" : palo;
      palo = (carta.palo === 4) ? "diamantes" : palo;
      return palo + "-" + carta.numero + ".jpg";
    }

    function empate() {
      dinero += parseInt(apuesta);
    }

    function gana() {
      dinero += parseInt(apuesta * 2);
    }

    let cartas = new Array();
    let apuesta = $("#apuesta").val();
    dinero -= apuesta;
    $("#dinero").attr("value", parseInt(dinero));
    var crupier = new Array(generarCarta(), generarCarta());
    var player = new Array(generarCarta(), generarCarta());
    console.log("Actualizar");
    $("#dinero").attr("value", dinero);
    $("#apostar").remove();
    $("#apuesta").remove();
    
    $("#puntos").attr("value",suma(player));
    

    $("#manosCrupier").remove();
    $("#top").prepend(carta0Crupier,carta1Crupier);
    $("#carta0Crupier").attr("src", "../Statics/Media/img/baraja/" + nombreCarta(crupier[0]));
    $("#carta1Crupier").attr("src", "../Statics/Media/img/backcard.jpg");

    $("top").append()
    $("#carta0Player").attr("src", "../Statics/Media/img/Baraja/" + nombreCarta(player[0]));
    $("#carta1Player").attr("src", "../Statics/Media/img/Baraja/" + nombreCarta(player[1]));
    $("#bottomBottom").append(plantarse, pedir);

    //Pide cartas
    $("#pedir").click(() => {
      player.push(generarCarta());
      let cartaAdd = $("<img>");
      cartaAdd.attr("src", "../Statics/Media/img/baraja/" + nombreCarta(player[player.length - 1]));
      cartaAdd.attr("id","carta" + (player.length - 1 + "Player"))
      cartaAdd.addClass("card");
      $("#puntos").attr("value", suma(player));
      $(".cartas").append(cartaAdd);
      let total = suma(crupier);
      if (total <= 16) {
        crupier.push(generarCarta());
        cartaAddCrupier.attr("id", "carta" + (crupier.length - 1) + "Crupier");
        $("#top").append(cartaAddCrupier);
      }
    });

    //Se planta el jugador
    $("#plantarse").click(() => {
      //Se verifica que el crupier cumpla las condiciones 16/17
      let total = suma(crupier);
      while (total <= 16) { //Se verifica que crupier tenga una suma de cartas mayor a 16
        crupier.push(generarCarta());
        cartaAddCrupier.attr("id", "carta" + (crupier.length - 1) + "Crupier");
        $("#top").append(cartaAddCrupier);
        total = suma(crupier);
      }
      let puntajeCrupier = suma(crupier);
      let puntajePlayer = suma(player);
      $("#pedir").remove();
      $("#plantarse").remove();
      let mensaje = $("<h1>");
      if (puntajePlayer > 21 && puntajeCrupier > 21) {
        mensaje.text("Te has pasado de 21, pero no todo esta perdido ya que el crupier también se ha pasado. Toma tu apuesta y se más cuidadoso la próxima vez");
        mensaje.addClass("empate");
        empate();
      }
      else if (puntajePlayer > 21 || puntajeCrupier > 21) {
        if (puntajePlayer > 21) {
          mensaje.text("Te has pasado de 21, ten más cuidado para la próxima. La casa gana.");
          mensaje.addClass("casa");
        }
        else if (puntajeCrupier > 21) {
          mensaje.text("Que suerte has tenido!! El crupier se ha pasado de 21, toma tus ganancias pero no creas que siempre tendrás la misma suerte");
          mensaje.addClass("player");
          gana();
        }
      }
      else if (puntajePlayer === puntajeCrupier) {
        if (player.length > crupier.length) {
          mensaje.text("La casa gana, sigue intentando Loooooser.");
          mensaje.addClass("casa");
        }
        else if (player.length < crupier.length) {
          mensaje.text("Has ganado, estas teniendo mucha suerte. No estarás haciendo trampa verdad?");
          mensaje.addClass("player");
          gana();
        }
        else {
          mensaje.text("Has empatado, toma tu apuesta, sonríe ahora porque no podrás hacerlo después de que te deje en banca rota");
          mensaje.addClass("empate");
          empate();
        }
      }
      else {
        if (puntajePlayer > puntajeCrupier) {
          mensaje.text("Has ganado. Vaya, has tenido mucha suerte... Que casualidad (si descubro que estas haciendo trampa te cortare un dedo y sera lo único que regresara con tu familia)");
          mensaje.addClass("player");
          gana();
        }
        else if (puntajePlayer < puntajeCrupier) {
          mensaje.text("He ganado. Dame ese dinero, me encanta ganarle a los niñitos de mami como tú que no saben apostar");
          mensaje.addClass("casa");
        }
      }
      for(let cr = 1 ; cr < crupier.length ; cr++){
        $("#carta" + cr + "Crupier").attr("src", "../Statics/Media/img/Baraja/" + nombreCarta(crupier[cr]))
      }
      mensaje.addClass("mensaje");
      $("#middle").append(mensaje);
      $("#bottomBottom").append(continuar);
      $("#dinero").val(dinero);
      $("#continuar").click(() => {
        if(dinero > 0){
          $("#middle").empty();
          $("#bottomBottom").empty();
          for(let a = 2; a < player.length; a++){
            let idCarta = "#carta" + a + "Player";
            $(idCarta).remove();
          }
          jugar(dinero);
        }
        else{
          
        }
        });
    });
  });
}