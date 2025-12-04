import { VIDA_MAX_ENEMIGO } from "../constants.js";

/**
 * Clase Enemigo
 * ----------------------------
 * Construye y muestra un enemigo
 */
export class Enemigo {
    tipo;
    nombre;
    ataque;
    vidaMax;
    vida;
    avatar;

    /**
     * Crea una nueva instancia de Enemigo.
     * @param {string} nombre - Nombre del enemigo.
     * @param {number} ataque - Nivel de ataque del enemigo.
     * @param {string} avatar - URL o ruta del avatar del enemigo.
     */
    constructor(nombre, ataque, avatar) {
        this.tipo = 'Enemigo';
        this.nombre = nombre;
        this.ataque = ataque;
        this.vidaMax = VIDA_MAX_ENEMIGO;
        this.vida = this.vidaMax;
        this.avatar = avatar;
    }

    /**
     * Devuelve una presentación breve del enemigo.
     * @returns {string} Descripción del enemigo.
     */
    mostrarEnemigo() {
        return `😈 ${this.nombre} (Tipo: ${this.tipo}, Ataque: ${this.ataque}, Vidas: ${this.vida})`;
    }
}