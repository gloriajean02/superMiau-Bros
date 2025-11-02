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

    /**
     * Crea una nueva instancia de Jugador.
     * @param {string} nombre - Nombre del jugador.
     */
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0;
        this.inventario = [];
        this.vidaMax = 700;
        this.vida = this.vidaMax;
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
            if (producto.bonus.ataque > 0) {
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
            if (producto.bonus.defensa > 0) {
                total += producto.bonus.defensa;
            }
        });
        return total;
    }

    /**
     * Devuelve una presentación detallada del jugador.
     * @returns {string} Descripción del jugador.
     */
    mostrarJugador() {
        return `
        😼 <strong>Nombre:</strong> ${this.nombre}<br>
        ❤️ <strong>Vida:</strong> ${this.vida}/${this.vidaMax}<br>
        🎖 <strong>Puntos:</strong> ${this.puntos}<br>
        💅🏻 <strong>Ataque total:</strong> ${this.ataqueTotal}<br>
        😈 <strong>Defensa total:</strong> ${this.defensaTotal}<br>
        🎒 <strong>Inventario:</strong>  ${this.inventario.length > 0
            ? this.inventario.map(item => item.nombre).join(', ')
            : 'Vacío'}
        `;
    }
}