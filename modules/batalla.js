import { Jefe } from "./jefe.js";
import { PUNTOS_BASE_VICTORIA } from "../constants.js";

/**
 * Módulo de Batalla y Nivel
 * ----------------------------
 * Gestiona el sistema de combate entre jugador y enemigos
 * y muestra si el jugador es Rookie o Pro.
 */

/**
 * Simula una batalla entre un jugador y un enemigo.
 * Si el jugador gana, obtiene 50 puntos.
 * @param {Jugador} jugador - Jugador participante.
 * @param {Enemigo} enemigo - Enemigo a combatir.
 * @returns {string} Resultado con el nombre del ganador y los puntos ganados.
 */
export function batalla(jugador, enemigo) {
    let vidaJugador = jugador.vidaTotal;
    let vidaEnemigo = enemigo.vida;

    const dmgJugador = jugador.ataqueTotal;
    const dmgEnemigo = enemigo.ataque;

    const defensaJugador = jugador.defensaTotal;

    while (vidaJugador > 0 && vidaEnemigo > 0) {
        // turno aleatorio: 0 → jugador, 1 → enemigo
        const turno = Math.floor(Math.random() * 2);
        if (turno === 0) {
            // ataca el jugador
            vidaEnemigo = vidaEnemigo - dmgJugador;
        } else {
            // ataca el enemigo
            vidaJugador = (vidaJugador + defensaJugador) - dmgEnemigo;
        }
    }

    let ganaJugador = false;
    let puntosGanados = 0;
    //Si gana jugador
    if (vidaJugador > 0 && vidaEnemigo <= 0) {
        ganaJugador = true;
        puntosGanados = PUNTOS_BASE_VICTORIA + dmgEnemigo;
        if (enemigo instanceof Jefe) {
            puntosGanados = enemigo.multiplicarDmg(puntosGanados);
        }
        //Actualizamos los puntos y la vida del jugador
        jugador.ganarBatalla(puntosGanados);
    }

    return `Ganador: ${ganaJugador ? jugador.nombre : enemigo.nombre}, Puntos ganados: +${puntosGanados} pts`;

}



