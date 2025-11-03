/**
 * Clase Enemigo
 * ----------------------------
 * Construye y muestra un enemigo
 */
export class Enemigo {
    nombre;
    ataque;
    vidaMax;
    vida;
    imagen;

    /**
     * Crea una nueva instancia de Enemigo.
     * @param {string} nombre - Nombre del enemigo.
     * @param {number} ataque - Nivel de ataque del enemigo.
     */
    constructor(nombre, ataque, imagen) {
        this.nombre = nombre;
        this.ataque = ataque;
        this.vidaMax = 700;
        this.vida = this.vidaMax;
        this.imagen = imagen;
    }

    /**
     * Devuelve una presentación breve del enemigo.
     * @returns {string} Descripción del enemigo.
     */
    mostrarEnemigo() {
        return `😈 ${this.nombre} (Ataque: ${this.ataque}, Vidas: ${this.vida})`;
    }
}