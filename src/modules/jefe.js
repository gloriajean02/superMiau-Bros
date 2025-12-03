
import { Enemigo } from "./enemigos.js";
import { MULTIPLICADOR_JEFE_DEFECTO } from "../constants.js";

/**
 * Clase Jefe - Extiende Enemigo con multiplicador de daño especial.
 * Representa enemigos jefes con bonificación de puntos adicional.
 * 
 * @class
 * @extends Enemigo
 */
export class Jefe extends Enemigo {
    /**
     * Multiplicador de daño que afecta tanto al ataque del jefe como a los puntos del jugador en la victoria.
     * @type {number}
     */
    multiplicadorDmg;

    /**
     * Crea una nueva instancia de Jefe.
     * 
     * @param {string} nombre - Nombre del jefe.
     * @param {number} vida - Vida inicial del jefe.
     * @param {number} ataque - Daño de ataque del jefe.
     * @param {string} avatar - Ruta de la imagen del jefe.
     * @param {number} [multiplicadorDmg=MULTIPLICADOR_JEFE_DEFECTO] - Multiplicador de puntos (por defecto 1.25).
     */
    constructor(nombre, ataque, avatar, multiplicadorDmg = MULTIPLICADOR_JEFE_DEFECTO) {
        super(nombre, ataque * multiplicadorDmg, avatar); // aplicamos multiplicador al ataque
        this.tipo = 'Jefe';              // sobreescribimos el tipo
        this.multiplicadorDmg = multiplicadorDmg;
    }

    /**
     * Aplica el multiplicador de daño a los puntos totales.
     * 
     * @param {number} puntosTotales - Puntos base a multiplicar.
     * @returns {number} Puntos multiplicados por el factor del jefe.
     * @example
     * jefe.multiplicarDmg(100); // 125 (si multiplicadorDmg = 1.25)
     */
    multiplicarDmg(puntosTotales) {
        return puntosTotales * this.multiplicadorDmg;
    }
}
