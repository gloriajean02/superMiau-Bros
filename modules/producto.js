import { EUR } from '../constants.js';

/**
 * Clase Producto
 * ----------------------------
 * Construye un producto para vender en el mercado,
 * muestra el producto y aplica descuento sobre él.
 */
export class Producto {
    nombre;
    precio;
    rareza;
    tipo;
    bonus;
    imagen;

    /**
   * Crea una nueva instancia de Producto.
   * @param {string} nombre - Nombre del producto.
   * @param {number} precio - Precio base del producto.
   * @param {string} rareza - Nivel de rareza ("común", "raro", "épico").
   * @param {string} tipo - Tipo de producto ("arma", "armadura", "consumible").
   * @param {Object} bonus - Objeto con los bonus del producto, por ejemplo { ataque: 5, defensa: 2 }.
   * @param {string} imagen - Nombre de la imagen de producto, es el mismo que el nombre del producto pero con _
   */
    constructor(nombre, precio, rareza, tipo, bonus, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.rareza = rareza;
    this.tipo = tipo;
    this.bonus = bonus;
    this.imagen = imagen;
    }

    get precioEuros(){
        return EUR.format(this.precio);
    }
    
    /**
     * Devuelve una representación en texto del producto.
     * @returns {string} Descripción del producto.
     */
    mostrarProducto(){
        //Para convertir el array bonus (formado por ataque y defensa) en String
        let bonusStr = '';
        for (const clave in this.bonus) {
            bonusStr += `${clave}+${this.bonus[clave]}, `;
        }

        // Quita la última coma y espacio
        bonusStr = bonusStr.slice(0, -2);

        return `${this.nombre} [${this.rareza}] (${this.tipo}) — ${this.precioEuros} — ${bonusStr} — ${this.imagen}`;
    }

    /**
     * Devuelve una representación en texto del bonus.
     * @returns {string} Descripción del bonus.
     */
    mostrarBonus(){
        let bonusStr = '';
        for (const clave in this.bonus) {
            bonusStr += `${clave}+${this.bonus[clave]}, `;
        }

        // Quita la última coma y espacio
        bonusStr = bonusStr.slice(0, -2);

        return `${bonusStr}`;
    }

    /**
     * Aplica un descuento al producto y devuelve una nueva instancia con el precio actualizado.
     * @param {number} porcentaje - Porcentaje de descuento (0–100).
     * @returns {Producto} Un nuevo producto con el precio reducido.
     */
    aplicarDescuento(porcentaje) {
        // Limita el porcentaje entre 0 y 100
        if (porcentaje < 0) porcentaje = 0;
        if (porcentaje > 100) porcentaje = 100;

        // Calcula el nuevo precio (Ejemplo: 200 * (1 - 0.25))
        const nuevoPrecio = Math.round(this.precio * (1 - porcentaje / 100));

        return new Producto(this.nombre, nuevoPrecio, this.rareza, this.tipo, this.bonus, this.imagen);
    }
}


