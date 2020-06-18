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
    let idAnt = $("#" + (id - 1)).text();
    let idDesp = $("#" + parseInt(parseInt(id) + 1)).text();
    let idArr = $("#" + parseInt(id - 4)).text();
    let idAba = $("#" + parseInt(parseInt(id) + 4)).text();
    let numerito = $("#" + id).text();
    console.log(id + 1)
    if (parseInt(idAnt) === 0) {
      $("#" + id).text(0);
      $("#" + (id - 1)).text(numerito);
    }
    // console.log(idDesp);
    else if (parseInt(idDesp) === 0) {
      $("#" + (id)).text(0);
      $("#" + parseInt(parseInt(id) + 1)).text(numerito);
    }
    else if (parseInt(idArr) === 0){
      $("#" + (id)).text(0);
      $("#" + parseInt(parseInt(id) - 4)).text(numerito);
    }
    else if (parseInt(idAba) === 0) {
      $("#" + (id)).text(0);
      $("#" + parseInt(parseInt(id) + 4)).text(numerito);
    }
    let orden = "";
    for(let fo = 0; fo < 15; fo++){
      // console.log($("#" + fo).text());
      orden += $("#" + fo).text();
    }
    if (orden === "123456789101112131415"){
      console.log("YOU WIN");
    }
  });
});


body.append(divPadre, boton);