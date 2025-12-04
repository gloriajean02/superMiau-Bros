

//Guardamos los elementos en variables
let inputNombreJugador = document.getElementById("nombre-jugador");
let inputAtaque = document.getElementById("ataque");
let inputDefensa = document.getElementById("defensa");
let inputVida = document.getElementById("vida");

// Creamos bandera para saber si el nombre es válidos
let nombreValido = false;
let cantidadTotal = false;
let formularioCorrecto = false;

// ----------------- VALIDAR JUGADOR -----------------
export function validarNombre() {
    let regexNombreJugador = /[A-Z][A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,20}$/;
    nombreValido = regexNombreJugador.test(inputNombreJugador.value);

    if (!nombreValido) {
        let nombre_invalido = "Debe empezar por mayúsculas. Máx. 20 caracteres. Sólo se permiten letras y espacios en blanco.";
        // Obtenemos la etiqueta <small> del div al que pertenece el input
        inputNombreJugador.parentNode.getElementsByTagName("small")[0].innerHTML = nombre_invalido;
    } else {
        inputNombreJugador.parentNode.getElementsByTagName("small")[0].innerHTML = "";
    }

    return nombreValido;
}

// ----------------- VALIDAR CANTIDAD TOTAL -----------------
export function validarCantidadTotal() {
    let sumaCantidades = parseInt(inputAtaque.value) + parseInt(inputDefensa.value) + parseInt(inputVida.value);
    console.log(sumaCantidades);
    if(sumaCantidades > 110 && parseInt(inputVida.value) >= 100){
        let cantidad_invalida = "Las cantidades no deben sumar más de 110, la vida debe ser como mínimo 100";
        // Obtenemos la etiqueta <small> del div al que pertenece el input
        inputVida.parentNode.getElementsByTagName("small")[0].innerHTML = cantidad_invalida;
    } else {
        inputVida.parentNode.getElementsByTagName("small")[0].innerHTML = "";
        cantidadTotal = true;

    }

    return cantidadTotal;
}

export function checkFullForm() {
    if(validarNombre() && validarCantidadTotal()) {
        formularioCorrecto = true;
    }
    return formularioCorrecto;
}
