$(document).ready(() => {
    var cartas = new Array;

    //Genarar Carta aleatoria
    function cartaRandom() {
        numero = Math.round(Math.random() * 13) + 1;
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
            if (carta.numero === prueba.numero && carta.palo === prueba.palo)
                existencia += 1;
        }
        if (existencia === 0) {
            return carta;
        }
        else {
            carta = generarCarta();
        }
    }

    //Suma los punto acumulados
    function suma(jugador) {
        // console.log(jugador);
        var suma = 0;
        for (carta in jugador) { //carta es el índice
            suma += jugador[carta].numero;
        }
        return suma;
    }

    //Empieza a apostar
    $("#apostar").click(() => {
        var crupier = new Array(generarCarta(), generarCarta());
        var player = new Array(generarCarta(), generarCarta());
        $("#apostar").remove();
        // console.log(cartas); ///
        // console.log("\n"); ///
        var pedir = $("<button>PEDIR</button>");
        pedir.attr("id", "pedir");
        var plantarse = $("<button>PLANTARSE</button>");
        plantarse.attr("id", "plantarse");
        $("body").append(pedir, plantarse);
        // console.log(player); ///
        // console.log(crupier); ///
        // console.log("\n") ///

        //Pide cartas
        $("#pedir").click(() => {
            player.push(generarCarta());
            crupier.push(generarCarta());
            // console.log("player");
            // console.log(player);
            // console.log("\n crupier");
            // console.log(crupier);
            // console.log("\n");
            suma = suma(crupier);
            if (suma <= 16)
                crupier.push(generarCarta());
        });

        //Se planta el jugador 
        $("#plantarse").click(() => {
            //Se verifica que el crupier cumpla las condiciones 16/17
            // console.log("pofavo");
            let total = suma(crupier);
            while (total <= 16) { //Se verifica que crupier tenga una suma de cartas mayor a 16
                crupier.push(generarCarta());
                total = suma(crupier);
            }
            // console.log(suma(crupier));

            let puntajeCrupier = suma(crupier);
            let puntajePlayer = suma(player);
            console.log("cartas Crupier:");
            console.log(crupier);
            console.log("Puntaje Crupier: " + puntajeCrupier);
            console.log("cartas Player");
            console.log(player);
            console.log("Puntaje player: " + puntajePlayer);
            $("#pedir").remove();
            $("#plantarse").remove();
            if (puntajePlayer > 21 && puntajeCrupier > 21) {
                console.log("Crupier y Player perdieron....Losers");
            }
            else if (puntajePlayer > 21 || puntajeCrupier > 21) {
                if (puntajePlayer > 21) {
                    console.log("Te pasaste player");
                }
                else if (puntajeCrupier > 21) {
                    console.log("Se paso la casa");
                }
            }
            else if (puntajePlayer === puntajeCrupier) {
                if (player.length > crupier.length) {
                    console.log("Crupier gana");
                }
                else {
                    console.log("Player gana");
                }
                console.log("iguales");
            }
            else {
                if (puntajePlayer > puntajeCrupier) {
                    console.log("gane");
                }
                else if (puntajePlayer < puntajeCrupier) {
                    console.log("soy manco");
                }
            }
        });

    });//Apostar


}); //document.ready
