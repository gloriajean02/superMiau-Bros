import { Jugador } from "./modules/jugador.js";
import { Enemigo } from "./modules/enemigos.js";
import { calcularNivel } from "./modules/batalla.js";
import { mostrarMercado, mostrarJugador, mostrarEnemigos, pelear } from "./modules/escenas.js";


const escena = document.getElementsByClassName("scene")[0];

const jugador = new Jugador('Simba');

// ---------------------------------- ESCENA JUGADOR --------------------------------------- //
mostrarJugador(escena, jugador);

const continuarEscena2 = document.createElement("button");
continuarEscena2.type = "button";
continuarEscena2.id = "continuarEscena2";
continuarEscena2.innerHTML = "Continuar";

escena.appendChild(continuarEscena2);

// ---------------------------------- ESCENA MERCADO --------------------------------------- //


const continuarEscena3 = document.createElement("button");
continuarEscena3.type = "button";
continuarEscena3.id = "continuarEscena3";
continuarEscena3.innerHTML = "Comprar";

continuarEscena2.addEventListener("click", () => {
    escena.replaceChildren();
    mostrarMercado(escena, jugador);
    escena.appendChild(continuarEscena3);
});

// ------------------------- ESCENA JUGADOR CON NUEVO INVENTARIO --------------------------- //

const continuarEscena4 = document.createElement("button");
continuarEscena4.type = "button";
continuarEscena4.id = "continuarEscena4";
continuarEscena4.innerHTML = "Continuar";

continuarEscena3.addEventListener("click", () => {
    escena.replaceChildren();
    mostrarJugador(escena, jugador)
    escena.appendChild(continuarEscena4);
});

// ---------------------------------- ESCENA ENEMIGOS --------------------------------------- //
const enemigoPepino = new Enemigo('Pepino', 5, 'pepino.jpg');
const enemigoGatoMalvado = new Enemigo('Gato malvado', 3, 'gatoMalvado.jpg');
const enemigoPerroBobo = new Enemigo('Perro bobo', 2, 'perroBobo.jpg');
const enemigoBolaPelo = new Enemigo('Bola de pelo', 1, 'bolaPelo.jpg');
const enemigoMiReflejo = new Enemigo('Mi reflejo', jugador.ataqueTotal, 'espejo.jpg');
const enemigoTransportin = new Enemigo('Transportín', 4, 'transportin.jpg');

const arrayEnemigos = [enemigoBolaPelo, enemigoGatoMalvado, enemigoMiReflejo,
    enemigoPepino, enemigoPerroBobo, enemigoTransportin];

const continuarEscena5 = document.createElement("button");
continuarEscena5.type = "button";
continuarEscena5.id = "continuarEscena5";
continuarEscena5.innerHTML = "Iniciar pelea 1";

continuarEscena4.addEventListener("click", () => {
    escena.replaceChildren();
    mostrarEnemigos(escena, arrayEnemigos);
    escena.appendChild(continuarEscena5);
});

// ---------------------------------- ESCENAS PELEA --------------------------------------- //

// PELEA 1
const continuarEscena6 = document.createElement("button");
continuarEscena6.type = "button";
continuarEscena6.id = "continuarEscena6";
continuarEscena6.innerHTML = "Iniciar pelea 2";

continuarEscena5.addEventListener("click", () => {
    escena.replaceChildren();
    pelear(escena, arrayEnemigos, jugador);
    escena.appendChild(continuarEscena6);
});

// PELEA 2
const continuarEscena7 = document.createElement("button");
continuarEscena7.type = "button";
continuarEscena7.id = "continuarEscena7";
continuarEscena7.innerHTML = "Iniciar pelea 3";

continuarEscena6.addEventListener("click", () => {
    escena.replaceChildren();
    pelear(escena, arrayEnemigos, jugador);
    escena.appendChild(continuarEscena7);
});

// PELEA 3
const continuarEscena8 = document.createElement("button");
continuarEscena8.type = "button";
continuarEscena8.id = "continuarEscena8";
continuarEscena8.innerHTML = "Resultados";

continuarEscena7.addEventListener("click", () => {
    escena.replaceChildren();
    pelear(escena, arrayEnemigos, jugador);
    escena.appendChild(continuarEscena8);
});

// ---------------------------------- ESCENA RESULTADO --------------------------------------- //

const botonReload = document.createElement("button");
botonReload.type = "button";
botonReload.id = "botonReload";
botonReload.innerHTML = "Volver a empezar";

continuarEscena8.addEventListener("click", () => {
    escena.replaceChildren();
    const resultado = calcularNivel(jugador);
    const pPuntos = "<em>Puntos totales: </em> +"+jugador.puntos;+"ptos."
    const pResultado = jugador.nombre + " es " + resultado + " 🔥 ";
    const p = document.createElement('p');
    const h2 = document.createElement('h2');
    p.innerHTML = pPuntos;
    h2.innerHTML = pResultado;
    escena.appendChild(p);
    escena.appendChild(h2);
    escena.appendChild(botonReload);
});

// ---------------------------------- BOTÓN VOLVER --------------------------------------- //

botonReload.addEventListener("click", () => {
    location.reload();
})