/**
 * Decide el nivel del jugador:
 * - "pro" si supera el umbral.
 * - "rookie" si no lo alcanza.
 *
 * @param {Jugador} jugador - Jugador participante.
 * @param {number} [umbral=150] - Puntos mínimos para ser "pro", por defecto 150.
 * @returns {string} Nivel del jugador.
 */
export function calcularNivel(jugador, umbral = 150) {
    const jugadorPro = jugador.puntos >= umbral;
    return jugadorPro ? "VETERANO" : "NOVATO";
}