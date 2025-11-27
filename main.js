import { Jugador } from "./modules/jugador.js";
import { Enemigo } from "./modules/enemigos.js";
import { Jefe } from "./modules/jefe.js";
import { calcularNivel } from "./modules/ranking.js";
import { mostrarMercado, mostrarJugador, mostrarEnemigos, pelear } from "./modules/escenas.js";


const escena = document.getElementsByClassName("scene")[0];

const jugador = new Jugador('Simba');

// ---------------------------------- ESCENA JUGADOR --------------------------------------- //
mostrarJugador(escena, jugador);

const continuarMercado = document.createElement("button");
continuarMercado.type = "button";
continuarMercado.id = "continuarMercado";
continuarMercado.innerHTML = "Continuar";

escena.appendChild(continuarMercado);

// ---------------------------------- ESCENA MERCADO --------------------------------------- //


const continuarCompra = document.createElement("button");
continuarCompra.type = "button";
continuarCompra.id = "continuarCompra";
continuarCompra.innerHTML = "Comprar";

continuarMercado.addEventListener("click", () => {
    escena.replaceChildren();
    mostrarMercado(escena, jugador);
    escena.appendChild(continuarCompra);
});

// ------------------------- ESCENA JUGADOR CON NUEVO INVENTARIO --------------------------- //

const continuarEnemigos = document.createElement("button");
continuarEnemigos.type = "button";
continuarEnemigos.id = "continuarEnemigos";
continuarEnemigos.innerHTML = "Continuar";

continuarCompra.addEventListener("click", () => {
    escena.replaceChildren();
    mostrarJugador(escena, jugador)
    escena.appendChild(continuarEnemigos);
});

console.log(jugador.mostrarJugador())

// ---------------------------------- ESCENA ENEMIGOS --------------------------------------- //


const continuarPelea = document.createElement("button");
continuarPelea.type = "button";
continuarPelea.id = "continuarPelea";
continuarPelea.innerHTML = "Iniciar batalla 1";

let arrayEnemigos = [];
continuarEnemigos.addEventListener("click", () => {

    const enemigoPepino = new Enemigo('Pepino', 5, 'pepino.jpg');
    const enemigoGatoMalvado = new Enemigo('Gato malvado', 3, 'gatoMalvado.jpg');
    const enemigoPerroBobo = new Enemigo('Perro bobo', 2, 'perroBobo.jpg');
    const enemigoBolaPelo = new Jefe('Bola de pelo', 1, 'bolaPelo.jpg');
    const enemigoMiReflejo = new Enemigo('Mi reflejo', jugador.ataqueTotal, 'espejo.jpg');
    const enemigoTransportin = new Enemigo('Transportín', 4, 'transportin.jpg');

    arrayEnemigos = [enemigoBolaPelo, enemigoGatoMalvado, enemigoMiReflejo, enemigoPepino, enemigoPerroBobo,enemigoTransportin];

    escena.replaceChildren();
    mostrarEnemigos(escena, arrayEnemigos);
    escena.appendChild(continuarPelea);
});

// ---------------------------------- ESCENAS PELEA --------------------------------------- //

// PELEA 1
const continuarPelea1 = document.createElement("button");
continuarPelea1.type = "button";
continuarPelea1.id = "continuarPelea1";
continuarPelea1.innerHTML = "Iniciar batalla 2";

continuarPelea.addEventListener("click", () => {
    escena.replaceChildren();
    pelear(escena, arrayEnemigos, jugador);
    escena.appendChild(continuarPelea1);
});

// PELEA 2
const continuarPelea2 = document.createElement("button");
continuarPelea2.type = "button";
continuarPelea2.id = "continuarPelea2";
continuarPelea2.innerHTML = "Iniciar batalla 3";

continuarPelea1.addEventListener("click", () => {
    escena.replaceChildren();
    pelear(escena, arrayEnemigos, jugador);
    escena.appendChild(continuarPelea2);
});

// PELEA 3
const continuarPelea3 = document.createElement("button");
continuarPelea3.type = "button";
continuarPelea3.id = "continuarPelea3";
continuarPelea3.innerHTML = "Resultados";

continuarPelea2.addEventListener("click", () => {
    escena.replaceChildren();
    pelear(escena, arrayEnemigos, jugador);
    escena.appendChild(continuarPelea3);
});

// ---------------------------------- ESCENA RESULTADO --------------------------------------- //

const botonReload = document.createElement("button");
botonReload.type = "button";
botonReload.id = "botonReload";
botonReload.innerHTML = "Volver a empezar";

continuarPelea3.addEventListener("click", () => {
    escena.replaceChildren();
    const resultado = calcularNivel(jugador);
    const pPuntos = "<em>Puntos totales: </em> +" + jugador.puntos; +"ptos."
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