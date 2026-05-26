

let inputNombreJugador = document.getElementById("nombre-jugador");
let inputAtaque = document.getElementById("ataque");
let inputDefensa = document.getElementById("defensa");
let inputVida = document.getElementById("vida");

let nombreValido = false;
let cantidadTotal = false;
let formularioCorrecto = false;

// Aplica los límites en tiempo real y actualiza el contador
function enforcarLimites(cambiado) {
    let ataque = Math.max(0, parseInt(inputAtaque.value) || 0);
    let defensa = Math.max(0, parseInt(inputDefensa.value) || 0);
    let vida = Math.max(100, parseInt(inputVida.value) || 100);

    if (cambiado === 'ataque') {
        ataque = Math.min(ataque, 110 - defensa - vida);
        ataque = Math.max(0, ataque);
        inputAtaque.value = ataque;
    } else if (cambiado === 'defensa') {
        defensa = Math.min(defensa, 110 - ataque - vida);
        defensa = Math.max(0, defensa);
        inputDefensa.value = defensa;
    } else if (cambiado === 'vida') {
        vida = Math.min(vida, 110 - ataque - defensa);
        vida = Math.max(100, vida);
        inputVida.value = vida;
    }

    const disponibles = 110 - ataque - defensa - vida;
    const el = document.getElementById("puntos-disponibles");
    if (el) el.textContent = `Puntos disponibles: ${disponibles}`;
}

inputAtaque.addEventListener('input', () => enforcarLimites('ataque'));
inputDefensa.addEventListener('input', () => enforcarLimites('defensa'));
inputVida.addEventListener('input', () => enforcarLimites('vida'));

// Inicializa el contador al cargar
enforcarLimites(null);

// ----------------- VALIDAR JUGADOR -----------------
export function validarNombre() {
    let regexNombreJugador = /[A-Z][A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,20}$/;
    nombreValido = regexNombreJugador.test(inputNombreJugador.value);

    const small = inputNombreJugador.parentNode.getElementsByTagName("small")[0];
    small.innerHTML = nombreValido
        ? ""
        : "Debe empezar por mayúsculas. Máx. 20 caracteres. Sólo se permiten letras y espacios en blanco.";

    return nombreValido;
}

// ----------------- VALIDAR CANTIDAD TOTAL -----------------
export function validarCantidadTotal() {
    cantidadTotal = false;
    const ataque = parseInt(inputAtaque.value) || 0;
    const defensa = parseInt(inputDefensa.value) || 0;
    const vida = parseInt(inputVida.value) || 0;
    const suma = ataque + defensa + vida;

    let error = "";
    if (vida < 100) error = "La vida debe ser como mínimo 100.";
    else if (suma > 110) error = "Las cantidades no deben sumar más de 110.";

    inputVida.parentNode.getElementsByTagName("small")[0].innerHTML = error;

    if (!error) cantidadTotal = true;
    return cantidadTotal;
}

export function checkFullForm() {
    if (validarNombre() && validarCantidadTotal()) {
        formularioCorrecto = true;
    }
    return formularioCorrecto;
}
