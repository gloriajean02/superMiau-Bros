export class Enemigo {
    nombre;
    ataque;
    vidaMax;
    vida;

    /**
     * Crea una nueva instancia de Enemigo.
     * @param {string} nombre - Nombre del enemigo.
     * @param {number} ataque - Nivel de ataque del enemigo.
     */
    constructor(nombre, ataque) {
        this.nombre = nombre;
        this.ataque = ataque;
        this.vidaMax = 7;
        this.vida = this.vidaMax;
    }

    /**
     * Devuelve una presentación breve del enemigo.
     * @returns {string} Descripción del enemigo.
     */
    mostrarEnemigo() {
        return `😈 ${this.nombre} (Ataque: ${this.ataque}, Vidas: ${this.vida})`;
    }
}