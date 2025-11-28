/**
 * Decide el nivel del jugador:
 * - "VETERANO" si supera el umbral.
 * - "NOVATO" si no lo alcanza.
 *
 * @param {Jugador} jugador - Jugador participante.
 * @param {number} [umbral=250] - Puntos mínimos para ser "pro", por defecto 250.
 * @returns {string} Nivel del jugador.
 */
export function calcularNivel(jugador, umbral = 250) {
    const jugadorPro = jugador.puntos >= umbral;
    return jugadorPro ? "VETERANO" : "NOVATO";
}