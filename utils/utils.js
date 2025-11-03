/**
 * Formateador de números a euros según la convención española.
 * Intl.NumberFormat() clase de JS para formatear números
 * @example
 * EUR.format(1500); // "1.500,00 €"
 */
export const EUR = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
});

/**
 * Genera una rareza aleatoria de producto.
 * Se usa para determinar qué tipo de productos recibirán descuentos o ventajas aleatorias.
 * Los valores posibles son:
 *  - "comun"
 *  - "raro"
 *  - "epico"
 * @returns {string} Rareza aleatoria.
 */
export function rarezaRandom() {
    const random = Math.floor(Math.random() * 3);
    if (random === 0) {
        return "comun";
    } else if (random === 1) {
        return "raro";
    } else return "epico";
};

/**
 * Genera un porcentaje de descuento aleatorio para el mercado.
 * Solo puede devolver numeros de 10 en 10.
 * Se utiliza para simular ofertas aleatorias en los productos del mercado.
 * @example
 * descuentoRandom(); // 30 (por ejemplo)
 * @returns {number} Descuento entero entre 10 y 100.
 */
export function descuentoRandom() {
    return Math.floor(Math.random() * 10) *10 + 10;
};

/**
 * Muestra en consola cada elemento de un array usando una función de presentación.
 * @param {Array} array - Array de objetos a mostrar.
 * @param {function} mostrarFunc - Función que devuelve un string representando cada elemento.
 */
export function mostrarArray(array, mostrarFunc) {
    array.forEach(item => console.log(mostrarFunc(item)));
}

