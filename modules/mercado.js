import { PRODUCTOS_MERCADO } from "../constants.js";

/**
 * Módulo de Mercado
 * ----------------------------
 * Genera objetos de la clase Producto para
 * llenar el mercado.
 */

/**
 * Filtra un array de productos por rareza.
 * 
 * @param {Producto[]} mercado - Array de productos mercado
 * @param {string} rarezaFiltro - Rareza: "comun", "raro", "epico" o "" (todos).
 * @returns {Producto[]} Array de productos filtrados.
 */
export function filtrarPorRarezaMercado(mercado, rarezaFiltro = "") {
    return rarezaFiltro === "" 
        ? mercado 
        : mercado.filter(producto => producto.rareza === rarezaFiltro);
}

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
 * Aplica descuento sobre el precio original del producto según
 * la rareza seleccionada y el porcentaje proporcionado.
 * @param {string} rareza - Nivel de rareza ("común", "raro", "épico").
 * @param {number} porcentaje - Número entero entre 0 y 100
 * @returns {Array} Nuevo array de productos con descuentos aplicados
 */
export function aplicarDescuentoPorRareza(rareza, porcentaje) {
    //Debe ser un map para poder transdormar los elementos y devolver un array con los cambios
    return PRODUCTOS_MERCADO.map(producto =>
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

/**
 * Actualiza visualmente las casillas del inventario con los productos actuales.
 * 
 * @param {NodeListOf<HTMLElement>} items - Nodos DOM de las casillas del inventario.
 * @param {Producto[]} arrayInventario - Array de productos actuales en inventario.
 */
export function actualizarInventario(items, arrayInventario) {
        items.forEach((hueco, i) => {
            hueco.innerHTML = ""; 
            const producto = arrayInventario[i];
            if (producto) {
                const img = document.createElement("img");
                img.src = "imagenes/" + producto.imagen;
                img.title = producto.mostrarBonus();
                hueco.appendChild(img);
            }
        });
    }

