import { Producto } from "./producto"

/**
 * Módulo de Mercado
 * ----------------------------
 * Genera objetos de la clase Producto para
 * llenar el mercado.
 */
export const mercado = [
    new Producto('Bola de lana', 20, 'comun', 'distraccion', {ataque: 1, defensa: 5}),
    new Producto('Paso sigiloso', 50, 'comun', 'estrategia', {ataque: 3, defensa:2}),
    new Producto('Trepador experto', 130, 'raro', 'estrategia', {ataque: 4, defensa: 3}),
    new Producto('Garras afiladas', 70, 'comun', 'sorpresa', {ataque:5, defensa:4}),
    new Producto('Muerdo inesperado', 180, 'raro', 'sorpresa', {ataque: 5, defensa: 3}),
    new Producto('Furia felina', 250, 'epico', 'sorpresa', {ataque: 5, defensa:5}),
]

/**
 * Aplica descuento sobre el precio original del producto según
 * la rareza seleccionada y el porcentaje proporcionado.
 * @param {string} rareza - Nivel de rareza ("común", "raro", "épico").
 * @param {number} porcentaje - Número entero entre 0 y 100
 * @returns {Array} Nuevo array de productos con descuentos aplicados
 */
export function aplicarDescuentoPorRareza(rareza, porcentaje) {
    //Debe ser un map para poder transdormar los elementos y devolver un array con los cambios
    return mercado.map(producto =>
    producto.rareza === rareza ? producto.aplicarDescuento(porcentaje) : producto
    );
}

/**
 * Devuelve una presentación breve del producto.
 * @param {Object} producto - Producto a describir.
 * @returns {string} descripción del producto.
 */
export function describirProducto(producto) {
    return producto.mostrarProducto();
}