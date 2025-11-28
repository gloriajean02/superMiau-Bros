import { Jugador } from "./modules/jugador.js";
import { ENEMIGOS_DISPONIBLES } from "./constants.js";
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

const selectRareza = document.getElementById("rareza");

// Mostrar mercado completo la primera vez
boton_ir_mercado.addEventListener("click", () => {
    mostrarMercado(jugador);
    showScene("escena-mercado");
});

// Filtrar mercado al cambiar la rareza
selectRareza.addEventListener("change", () => {
    mostrarMercado(jugador, selectRareza.value);
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


boton_conocer_enemigos.addEventListener("click", () => {
    showScene("escena-enemigos");
    
    // Mi reflejo copia ataque del jugador en runtime
    ENEMIGOS_DISPONIBLES[4].ataque = jugador.ataqueTotal;
    
    mostrarEnemigos(ENEMIGOS_DISPONIBLES);
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
    pelear(ENEMIGOS_DISPONIBLES, jugador);
    escenaPelea.appendChild(boton_inciar_pelea2);
});

// PELEA 2

boton_inciar_pelea2.addEventListener("click", () => {
    boton_inciar_pelea2.remove();
    showScene("escena-pelea");
    pelear(ENEMIGOS_DISPONIBLES, jugador);
    escenaPelea.appendChild(boton_inciar_pelea3);
});

// PELEA 3

boton_inciar_pelea3.addEventListener("click", () => {
    boton_inciar_pelea3.remove();
    showScene("escena-pelea");
    pelear(ENEMIGOS_DISPONIBLES, jugador);
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