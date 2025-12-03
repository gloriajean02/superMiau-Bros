import { Jefe } from "./jefe.js";
import { PUNTOS_BASE_VICTORIA } from "../constants.js";

/**
 * Módulo de Batalla
 * ----------------------------
 * Gestiona el sistema de combate entre jugador y enemigos
 */

/**
 * Simula una batalla por turnos entre un jugador y un enemigo.
 * Cada turno se decide aleatoriamente quién ataca primero.
 * El jugador gana puntos base más daño del enemigo recibido.
 * Si es un jefe, aplica multiplicador de puntos adicional.
  * 
 * @param {Jugador} jugador - Instancia del jugador con vidaTotal, ataqueTotal, defensaTotal y métodos ganarBatalla().
 * @param {Enemigo|Jefe} enemigo - Instancia del enemigo con vida y ataque, o Jefe con multiplicarDmg().
 * @returns {string} Mensaje con el ganador y puntos obtenidos en formato "Ganador: [nombre], Puntos ganados: +[pts] pts".
 * @example
 * batalla(jugador, enemigo); // "Ganador: Simba, Puntos ganados: +125 pts"
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

//Activa la animación
export function iniciarPelea() { 
        const pelea = document.querySelector('.pelea');
        pelea.classList.remove('activa');
        pelea.classList.add('activa');
}




