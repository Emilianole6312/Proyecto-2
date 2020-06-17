let blackjackgame = () => {
  $("#inicio").remove();
  jugar();
};

function jugar(dinero = 1000){

  //------Crear la pantalla para apostar------
  //Crear top y su contenido
  let manosCrupier = $("<img>");
  manosCrupier.attr("src", "../Statics/media/img/crupier.png");
  manosCrupier.attr("id", "manosCrupier");
  let top = $("<div>");
  top.attr("class", "top");
  top.append(manosCrupier);

  // Generar el middle
  let middle = $("<div>");
  middle.attr("class", "middle");

  // Genera el bottom y su contenido

  // Cartas
  let carta1 = $("<img>");
  carta1.attr("src", "../Statics/Media/img/backcard.jpg");
  carta1.attr("class", "card");
  carta1.attr("id", "carta1Player");
  let carta2 = $("<img>");
  carta2.attr("src", "../Statics/Media/img/backcard.jpg");
  carta2.attr("class", "card");
  carta2.attr("id", "carta2Player");
  let cartasDiv = $("<div>");
  cartasDiv.attr("class", "cartas");
  cartasDiv.prepend(carta1, carta2);

  // //Dinero
  // let money = $("h4");
  // money.attr("id","money");
  // let cash = $("h3");
  // cash.attr("id","cash");
  // cash.text("Tu dinero");
  // let dineroDiv = $("<div>");
  // dineroDiv.attr("id","div-dinero");
  // dineroDiv.append(cash,money);

  // //Apuesta
  // let totalDiv = $("<div>");
  // apuestaDiv.attr("id","apuestaDiv");
  // 

  // Botones
  let apuesta = $("<input readonly></input>");
  apuesta.attr("type", "number");
  apuesta.attr("id", "apuesta");
  apuesta.addClass("button apuesta");
  apuesta.attr("step", "50");
  apuesta.attr("value", "100");
  apuesta.attr("name", "apuesta");
  let apostar = $("<button>");
  apostar.text("Apostar");
  apostar.addClass("button apostar");
  apostar.attr("id", "apostar");
  let buttons = $("<div>");
  buttons.attr("class", "buttons");
  buttons.prepend(apuesta, apostar);

  $("body").keydown(function (event) {
    apuesta = parseInt($("#apuesta").val());
    switch (event.keyCode) {
      case 38:
        apuesta += (apuesta + 50 <= dinero) ? 50 : 0;
        break;
      case 40:
        apuesta -= (apuesta - 50 >= 50) ? 50 : 0;
        break;
    }
    $("#apuesta").val(apuesta);
  });

  let bottom = $("<div>");
  bottom.prepend(cartasDiv, buttons);

  //Meto los tres niveles (top, middle, bottom) en gamezone
  let gamezone = $("<div>");
  gamezone.attr("class", "gamezone");
  gamezone.prepend(top, middle, bottom);
  $("#contenedorJuego #blackjack_container").prepend(gamezone);

  //Evento del botón Apostar
  $("#apostar").click(() => {
    var cartas = new Array();
    let apuesta = $("#apuesta").val();
    dinero -= apuesta;
    //-----FUNCIONES------
    //Sumar los punto acumulados
    function suma(jugador) {
      let suma = 0;
      let ases = 0;
      for (carta in jugador) {  //carta es el índice
        suma += (jugador[carta].numero > 10) ? 10 : jugador[carta].numero;
        ases += (jugador[carta].numero === 1) ? 1 : 0;
      }
      for (let fo = 0; fo < ases; fo++) {
        suma = (suma + 10 < 21) ? suma + 10 : suma;
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
      dinero += apuesta;
      console.log(dinero)
    }

    function gana() {
      dinero += apuesta * 2;
      console.log(dinero)
    }
    //------FUNCIONES------
    var crupier = new Array(generarCarta(), generarCarta());
    var player = new Array(generarCarta(), generarCarta());
    $("#apostar").remove();
    $("#apuesta").remove();
    let plantarse = $("<button>PLANTARSE</button>");
    plantarse.attr("id", "plantarse");
    plantarse.addClass("button apostar");
    let pedir = $("<button>PEDIR</button>");
    pedir.attr("id", "pedir");
    pedir.addClass("button apostar");
    $("#carta1Player").attr("src", "../Statics/Media/img/Baraja/" + nombreCarta(player[0]));
    $("#carta2Player").attr("src", "../Statics/Media/img/Baraja/" + nombreCarta(player[1]));

    $(".buttons").append(plantarse, pedir);

    //Pide cartas
    $("#pedir").click(() => {
      player.push(generarCarta());
      let cartaAdd = $("<img>");
      cartaAdd.attr("src", "../Statics/Media/img/Baraja/" + nombreCarta(player[player.length - 1]));
      cartaAdd.addClass("card");
      $(".cartas").append(cartaAdd);
      let total = suma(crupier);
      if (total <= 16) {
        crupier.push(generarCarta());
      }
    });

    //Se planta el jugador
    $("#plantarse").click(() => {
      //Se verifica que el crupier cumpla las condiciones 16/17
      let total = suma(crupier);
      while (total <= 16) { //Se verifica que crupier tenga una suma de cartas mayor a 16
        crupier.push(generarCarta());
        total = suma(crupier);
      }
      let puntajeCrupier = suma(crupier);
      let puntajePlayer = suma(player);
      $("#pedir").remove();
      $("#plantarse").remove();
      mensaje = $("<h1>");
      console.log(crupier);
      console.log(player);
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
      mensaje.addClass("mensaje");
      $(".middle").append(mensaje);
      let continuar = $("<button>");
      if(dinero > 0){
        continuar.attr("id", "continuar");
        continuar.text("Continuar");
        $(".buttons").append(continuar);
        $("#continuar").click(() => {
          $("#blackjack_container").empty();
          jugar(dinero);
        });
      }
    });
  });
}