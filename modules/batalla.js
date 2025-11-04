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
    let vidaJugador = jugador.vida;
    let vidaEnemigo = enemigo.vida;

    const dmgJugador = jugador.ataqueTotal;
    const dmgEnemigo = Math.max(1, enemigo.ataque - jugador.defensaTotal);

    while (vidaJugador > 0 && vidaEnemigo > 0) {
        // turno aleatorio: 0 → jugador, 1 → enemigo
        const turno = Math.floor(Math.random() * 2);
        if (turno === 0) {
            // ataca el jugador
            vidaEnemigo -= dmgJugador;
        } else {
            // ataca el enemigo
            vidaJugador -= dmgEnemigo;
        }
    }

    let ganaJugador = false;
    let puntosGanados = 0;
    //Si gana jugador
    if (vidaJugador > 0 && vidaEnemigo <= 0) {
        ganaJugador = true;
        puntosGanados = 40;
        //Actualizamos los puntos del jugador
        jugador.puntos += puntosGanados;
        vidaJugador += 50;
    }

    //Actualizamos la vida del jugador
    jugador.vida = Math.max(1, vidaJugador);

    return `Ganador: ${ganaJugador ? jugador.nombre : enemigo.nombre}, Puntos ganados: +${puntosGanados} pts`;

}

/**
 * Decide el nivel del jugador:
 * - "pro" si supera el umbral.
 * - "rookie" si no lo alcanza.
 *
 * @param {Jugador} jugador - Jugador participante.
 * @param {number} [umbral=150] - Puntos mínimos para ser "pro", por defecto 150.
 * @returns {string} Nivel del jugador.
 */
export function calcularNivel(jugador, umbral = 80) {
    const jugadorPro = jugador.puntos >= umbral;
    return jugadorPro ? "PRO" : "ROOKIE";
}

