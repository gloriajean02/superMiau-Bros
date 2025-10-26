export class Jugador {
    nombre;
    puntos;
    inventario;
    vidaMax;
    vida;


    /**
     * Crea una nueva instancia de Jugador.
     * @param {string} nombre - Nombre del jugador.
     */
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
        this.inventario = [];
        this.vidaMax = 7;
        this.vida = this.vidaMax;
    }

    /**
     * Devuelve una presentación detallada del jugador.
     * @returns {Object} Descripción del jugador.
     */
    mostrarJugador() {
        return `
        🐈‍⬛ ${this.nombre}
        ❤️ Vida: ${this.vida}/${this.vidaMax}
        ⭐ Puntos: ${this.puntos}
        💅🏻 Ataque total: ${this.ataqueTotal}
        😈 Defensa total: ${this.defensaTotal}
        🎒 Inventario: 
        `;
    }
}