import { Jugador } from "./modules/jugador.js";
import { Enemigo } from "./modules/enemigos.js";
import { Jefe } from "./modules/jefe.js";
import { calcularNivel } from "./modules/ranking.js";
import { mostrarMercado, mostrarJugador, mostrarEnemigos, pelear } from "./modules/escenas.js";
import { showScene } from "./utils/scenes.js";

const jugador = new Jugador('Simba');

showScene("escena-jugador");
// ---------------------------------- ESCENA JUGADOR --------------------------------------- //
mostrarJugador(jugador);

// Crear botón para ir a mercado
const escenaJugador = document.getElementById("escena-jugador");
const boton_ir_mercado = document.createElement("button");
boton_ir_mercado.id = "continuarMercado";
boton_ir_mercado.type = "button";
boton_ir_mercado.textContent = "Ir al mercado";

// Añadir botón al final de la escena
escenaJugador.appendChild(boton_ir_mercado);

// ---------------------------------- ESCENA MERCADO --------------------------------------- //

boton_ir_mercado.addEventListener("click", () => {
    showScene("escena-mercado");
    mostrarMercado(jugador);
});

// ------------------------- ESCENA JUGADOR CON NUEVO INVENTARIO --------------------------- //
const boton_comprar_productos = document.getElementById("comprarProductos");
const boton_conocer_enemigos = document.createElement("button");

boton_comprar_productos.addEventListener("click", () => {
    showScene("escena-jugador");
    mostrarJugador(jugador);

    // Cambiar botón para ir a enemigos
    boton_ir_mercado.remove();
    boton_conocer_enemigos.id = "continuarEnemigos";
    boton_conocer_enemigos.type = "button";
    boton_conocer_enemigos.textContent = "Conocer enemigos";

    // Añadir botón al final de la escena
    escenaJugador.appendChild(boton_conocer_enemigos);
});

// ---------------------------------- ESCENA ENEMIGOS --------------------------------------- //


let arrayEnemigos = [];
boton_conocer_enemigos.addEventListener("click", () => {
    showScene("escena-enemigos");
    const enemigoPepino = new Enemigo('Pepino', 5, 'pepino.jpg');
    const enemigoGatoMalvado = new Enemigo('Gato malvado', 3, 'gatoMalvado.jpg');
    const enemigoPerroBobo = new Enemigo('Perro bobo', 2, 'perroBobo.jpg');
    const enemigoBolaPelo = new Jefe('Bola de pelo', 1, 'bolaPelo.jpg');
    const enemigoMiReflejo = new Enemigo('Mi reflejo', jugador.ataqueTotal, 'espejo.jpg');
    const enemigoTransportin = new Enemigo('Transportín', 4, 'transportin.jpg');

    arrayEnemigos = [enemigoBolaPelo, enemigoGatoMalvado, enemigoMiReflejo, enemigoPepino, 
        enemigoPerroBobo, enemigoTransportin];

    mostrarEnemigos(arrayEnemigos);
});

// ---------------------------------- ESCENAS PELEA --------------------------------------- //

//BOTON INICIAR PELEA 1
const boton_inciar_pelea = document.getElementById("iniciarPelea");

// CREAR BOTONES DEL RESTO DE PELEAS
const escenaPelea = document.getElementById("escena-pelea");

// -------PELEA 2
const boton_inciar_pelea2 = document.createElement("button");
boton_inciar_pelea2.type = "button";
boton_inciar_pelea2.id = "continuarPelea2";
boton_inciar_pelea2.innerHTML = "Iniciar batalla 2";

// -------PELEA 3
const boton_inciar_pelea3 = document.createElement("button");
boton_inciar_pelea3.type = "button";
boton_inciar_pelea3.id = "continuarPelea3";
boton_inciar_pelea3.innerHTML = "Iniciar batalla 3";

// -------VER RESULTADOS
const boton_ver_resultados = document.createElement("button");
boton_ver_resultados.type = "button";
boton_ver_resultados.id = "resultados";
boton_ver_resultados.innerHTML = "Resultados";

//================================ EVENTOS BOTONES PELEA ============================//

// PELEA 1

boton_inciar_pelea.addEventListener("click", () => {
    showScene("escena-pelea");
    pelear(arrayEnemigos, jugador);
    escenaPelea.appendChild(boton_inciar_pelea2);
});

// PELEA 2

boton_inciar_pelea2.addEventListener("click", () => {
    boton_inciar_pelea2.remove();
    showScene("escena-pelea");
    pelear(arrayEnemigos, jugador);
    escenaPelea.appendChild(boton_inciar_pelea3);
});

// PELEA 3

boton_inciar_pelea3.addEventListener("click", () => {
    boton_inciar_pelea3.remove();
    showScene("escena-pelea");
    pelear(arrayEnemigos, jugador);
    escenaPelea.appendChild(boton_ver_resultados);
});

// ---------------------------------- ESCENA RESULTADO --------------------------------------- //

boton_ver_resultados.addEventListener("click", () => {
    showScene("escena-ranking");    
    const resultado = calcularNivel(jugador);
    const p = document.getElementById("p-puntos");
    p.innerHTML = `<em>Puntos totales: </em> +${jugador.puntos} ptos.`;
    const h2 = document.getElementById("p-resultado");
    h2.innerHTML = resultado;
});

// ---------------------------------- BOTÓN VOLVER --------------------------------------- //
const botonReload = document.getElementById("botonReload");
botonReload.addEventListener("click", () => {
    location.reload();
})