import { VIDA_MAX_JUGADOR, AVATAR_JUGADOR } from "../constants.js";

/**
 * Clase Jugador
 * ----------------------------
 * Construye y muestra un jugador
 */
export class Jugador {
    nombre;
    puntos;
    inventario;
    vidaMax;
    vida;
    avatar;

    /**
     * Crea una nueva instancia de Jugador.
     * @param {string} nombre - Nombre del jugador.
     */
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
        this.inventario = [];
        this.vidaMax = VIDA_MAX_JUGADOR;
        this.vida = 0;
        this.avatar = AVATAR_JUGADOR;
    }

    /**
     * Añade un objeto al inventario del jugador.
     * Se utiliza `structuredClone` para evitar modificar el objeto original.
     * @param {Object} producto - Objeto que se añadirá al inventario.
     */
    añadirProducto(producto) {
        this.inventario.push(structuredClone(producto));

    }

    /**
     * Calcula el total de ataque del jugador basado en los bonus de sus productos.
     * @returns {number} Puntos de ataque totales.
     */
    get ataqueTotal() {
        let total = 0;
        this.inventario.forEach(producto => {
            if (producto.bonus.ataque > 0 && producto.bonus.ataque != null) {
                total += producto.bonus.ataque;
            }
        });
        return total;
    }

    /**
     * Calcula el total de defensa del jugador basado en los bonus de sus productos.
     * @returns {number} Puntos de defensa totales.
     */
    get defensaTotal() {
        let total = 0;
        this.inventario.forEach(producto => {
            if (producto.bonus.defensa > 0 && producto.bonus.defensa != null) {
                total += producto.bonus.defensa;
            }
        });
        return total;
    }

    /**
     * Calcula el total de vida del jugador basado en los bonus de sus productos.
     * @returns {number} Vidas totales. Si son más de la vida máxima, se setea a la máxima.
     */
    get vidaTotal() {
        let total = 0;
        this.inventario.forEach(producto => {
            if (producto.bonus.vida > 0 && producto.bonus.vida != null) {
                total += producto.bonus.vida;
            }
        });
        return Math.min(total, this.vidaMax);;
    }

    ganarBatalla(puntos) {
        this.puntos += puntos;
        this.vida += 200;
    }

    /**
     * Devuelve una presentación detallada del jugador.
     * @returns {string} Descripción del jugador.
     */
    mostrarJugador() {
        return `
        😼 <strong>Nombre:</strong> ${this.nombre}<br>
        ❤️ <strong>Vida:</strong> ${this.vidaTotal}/${this.vidaMax}<br>
        🎖 <strong>Puntos:</strong> ${this.puntos}<br>
        💅🏻 <strong>Ataque total:</strong> ${this.ataqueTotal}<br>
        😈 <strong>Defensa total:</strong> ${this.defensaTotal}<br>
        🎒 <strong>Inventario:</strong>  ${this.inventario.length > 0
            ? this.inventario.map(item => item.nombre).join(', ')
            : 'Vacío'}
        `;
    }

}