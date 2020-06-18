var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
}






var nombre = document.getElementById('nombre');
var error = document.getElementById('error');
error.style.color = 'red';

var form = document.getElementById('formulario');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    var mensajesError = [];
    if (nombre.value === null || nombre.value === '') {
        mensajesError.push('Ingresa tu nombre');
    } else {
        var recu = nombre.value;
        window.location = "principal.html";
        var dato = new FormData()
        dato.append('nombre', nombre)
        var param = {
            method: 'post',
            body: dato,
        }

        fetch("../dynamics/usuarios.php", param)
            .then(function(respuesta) {
                if (respuesta.ok) {
                    return respuesta.text()
                } else {
                    throw 'error en la llamada al servidor'
                }
            })
            .then(function(mensaje) {
                alert("Todo bien")
            })
            .catch(function(error) {
                error.innerHTML = "Algo ha salido mal"
            })
    }

    error.innerHTML = mensajesError.join(',');

});