let quinceGame = () => {
  let nums = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
  $("#padre").empty();
  $("#jugar").remove();
  nums = nums.sort(function () {
    return Math.random() - 0.5
  });
  for (var i = 0; i < nums.length; i++) {
    divHijo = $("<button>");
    divHijo.addClass("hijo");
    divHijo.text(nums[i]);
    divHijo.attr("id",i);
    $("#padre").append(divHijo);
  }

  //Evento cuando presionas cualquier tecla
  $(".hijo").click(function () {
    let id = $(this).attr("id"); //id del boton anterior
    let idAnt = parseInt($("#" + (id - 1)).text());
    let idDesp = parseInt($("#" + parseInt(parseInt(id) + 1)).text());
    let idArr = parseInt($("#" + parseInt(id - 4)).text());
    let idAba = parseInt($("#" + parseInt(parseInt(id) + 4)).text());
    let numerito = $("#" + id).text();
    //Verifica si esta a un lado de un 0
    if (idAnt === 0) {
      //Verifica que no este en una orilla
      if (id != 4 && id != 8 && id != 12) {
        //Cambia los números
        $("#" + id).text(0);
        $("#" + (id - 1)).text(numerito);
      }
    }
    else if (idDesp === 0) {
      //Verifica que no este en una orilla
      if (id != 3 && id != 7 && id != 11) {
        //Cambia los números
        $("#" + (id)).text(0);
        $("#" + parseInt(parseInt(id) + 1)).text(numerito);
      }
    }
    else if (idArr === 0) {
      //Cambia los números
      $("#" + (id)).text(0);
      $("#" + parseInt(parseInt(id) - 4)).text(numerito);
    }
    else if (idAba === 0) {
      //Cambia los números
      $("#" + (id)).text(0);
      $("#" + parseInt(parseInt(id) + 4)).text(numerito);
    }
    let orden = "";

    //Une todos los números en una cadena
    for (let fo = 0; fo < 15; fo++) {
      // console.log($("#" + fo).text());
      orden += $("#" + fo).text();
    }
    //Compara la cadena de números
    if (orden === "1234567891011121314150") {
      let h3 = $("<h3>");
      h3.text("YOU WIN");
    }
  });
  $("#quince_container").append($("#padre"));
}
