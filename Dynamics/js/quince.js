let nums = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);

let body = document.getElementsByTagName("body")[0];
let divPadre = document.createElement("div");
divPadre.id = "padre";
let boton = document.createElement("button");
boton.innerText = "Jugar";

boton.onclick = (function() { //Nota mental
  boton.innerText = "Mezclar";
  $("#padre").empty();
  nums = nums.sort(function() {
    return Math.random() - 0.5
  });
  for (var i = 0; i < nums.length; i++) {
    divHijo = document.createElement("button");
    divHijo.classList.add("hijo");
    divHijo.innerText = nums[i];
    divHijo.id = i;
    divPadre.append(divHijo);
  }
  $(".hijo").click(function(){
    let id =  $(this).attr("id"); //id del boton anterior
    let idAnt = parseInt($("#" + (id - 1)).text());
    let idDesp = parseInt($("#" + parseInt(parseInt(id) + 1)).text());
    let idArr = parseInt($("#" + parseInt(id - 4)).text());
    let idAba = parseInt($("#" + parseInt(parseInt(id) + 4)).text());
    let numerito = $("#" + id).text();
    if (idAnt === 0) {
      if (id != 4 && id != 8 && id != 12){
        $("#" + id).text(0);
        $("#" + (id - 1)).text(numerito);
      }
    }
    else if (idDesp === 0) {
      if (id != 3 && id != 7 && id != 11){
        $("#" + (id)).text(0);
        $("#" + parseInt(parseInt(id) + 1)).text(numerito);
      }
    }
    else if (idArr === 0){
      $("#" + (id)).text(0);
      $("#" + parseInt(parseInt(id) - 4)).text(numerito);
    }
    else if (idAba === 0) {
      $("#" + (id)).text(0);
      $("#" + parseInt(parseInt(id) + 4)).text(numerito);
    }
    let orden = "";
    for(let fo = 0; fo < 15; fo++){
      // console.log($("#" + fo).text());
      orden += $("#" + fo).text();
    }
    if (orden === "1234567891011121314150"){
      console.log("YOU WIN");
    }
  });
});


body.append(divPadre, boton);