export class Producto {

    /**
   * Crea una nueva instancia de Producto.
   * @param {string} nombre - Nombre del producto.
   * @param {number} precio - Precio base del producto.
   * @param {string} rareza - Nivel de rareza ("común", "raro", "épico").
   * @param {string} tipo - Tipo de producto ("distracción", "sorpresa", "estrategia").
   * @param {Object} bonus - Objeto con los bonus del producto, por ejemplo { ataque: 5, defensa: 2 }.
   */
    constructor(nombre, precio, rareza, tipo, bonus) {
    this.nombre = nombre;
    this.precio = precio;
    this.rareza = rareza;
    this.tipo = tipo;
    this.bonus = bonus;
    }
    
}

