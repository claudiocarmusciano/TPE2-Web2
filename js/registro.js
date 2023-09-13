
document.querySelector(".btn-hamburguesa").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.querySelector(".navigation").classList.toggle("show");
}


// JS para botón Validar del formulario Registro
document.getElementById("botonValidar").addEventListener("click",function(event) {
    event.preventDefault();
    validar();
});

function validar() {
    let captcha = document.getElementById("captcha");
    let valor = captcha.value;

    if (valor == "24") {
        let nodoBoton = document.getElementById("botonRegistro");
        nodoBoton.removeAttribute ('disabled');
        let nodoError = document.getElementById ("mensajeCaptcha");
        nodoError.innerHTML = " ";
    }
    else {
        let nodoError = document.getElementById ("mensajeCaptcha");
        document.getElementById ("mensajeCaptcha").classList.add("error");
        nodoError.innerHTML = "ERROR INGRESO CAPTCHA";
    }
}