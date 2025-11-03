import { Producto } from "./producto.js";
import { EUR } from "../utils/utils.js"

/**
 * Módulo de Mercado
 * ----------------------------
 * Genera objetos de la clase Producto para
 * llenar el mercado.
 */
export const mercado = [
    new Producto('Bola de lana', 20, 'comun', 'distraccion', {ataque: 1, defensa: 5}, 'bolaLana.jpg'),
    new Producto('Paso sigiloso', 50, 'comun', 'estrategia', {ataque: 3, defensa:2}, 'sigiloso.jpg'),
    new Producto('Trepador experto', 130, 'raro', 'estrategia', {ataque: 4, defensa: 3},'trepador.jpg'),
    new Producto('Garras afiladas', 70, 'comun', 'sorpresa', {ataque:5, defensa:4}, 'garras.png'),
    new Producto('Muerdo inesperado', 180, 'raro', 'sorpresa', {ataque: 5, defensa: 3}, 'dientes.png'),
    new Producto('Furia felina', 250, 'epico', 'sorpresa', {ataque: 5, defensa:5}, 'furia.jpg'),
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

export function mostrarProductosMercado(mercado, mercadoDiv, rarezaAleatoria, descuentoAleatorio, arrayInventario, jugador) {
    mercado.forEach(producto => {
        // Contenedor de cada producto
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
    
        // Info del producto
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("infoProducto");
    
        const img = document.createElement("img");
        img.src = "imagenes/"+producto.imagen;
        img.classList.add("imgProducto");
    
        const nombre = document.createElement("p");
        nombre.innerHTML = "<strong>"+producto.nombre+"</strong>";
    
        const rareza = document.createElement("p");
        rareza.innerHTML = "<em>Rareza: </em>"+producto.rareza;
    
        const tipo = document.createElement("p");
        tipo.innerHTML = "<em>Tipo: </em>"+producto.tipo;
    
        const bonus = document.createElement("p");
        bonus.innerHTML = "<em>Bonus: </em>"+producto.mostrarBonus();
    
        const precio = document.createElement("p");
        precio.innerHTML = EUR.format(producto.precio);
    
        if (producto.rareza === rarezaAleatoria) {
            productoDiv.id="conDescuento";
            const descuento = document.createElement("p");
            descuento.classList.add("descuento");
            descuento.innerHTML = "¡¡¡CON DESCUENTO!!! -"+descuentoAleatorio+"%";
            infoDiv.appendChild(descuento);
        }
    
        infoDiv.appendChild(img);
        infoDiv.appendChild(nombre);
        infoDiv.appendChild(rareza);
        infoDiv.appendChild(tipo);
        infoDiv.appendChild(bonus);
        infoDiv.appendChild(precio);
    
        // Botón de comprar
        const comprarDiv = document.createElement("div");
        comprarDiv.classList.add("comprarProducto");
    
        const botonComprar = document.createElement("button");
        botonComprar.classList.add("botonComprar");
        botonComprar.innerHTML = "Añadir";
    
        comprarDiv.appendChild(botonComprar);

        // Listener para la compra
        botonComprar.addEventListener("click", () => {
            if (arrayInventario.includes(producto)) {
                botonComprar.innerHTML = 'Añadir';
                productoDiv.style.backgroundColor = "rgba(255, 252, 249, 0.649)";

                const i = arrayInventario.findIndex(p => p === producto);
                arrayInventario.splice(i, 1);

                const j = jugador.inventario.findIndex(p => p === producto);
                jugador.inventario.splice(j, 1);

            } else {
                botonComprar.innerHTML = 'Añadido';
                productoDiv.style.backgroundColor = "#d4fcd4";
                arrayInventario.push(producto);
                jugador.añadirProducto(producto);
            }
        });
    
        // Unir info y botón al producto
        productoDiv.appendChild(infoDiv);
        productoDiv.appendChild(comprarDiv);
    
        // Añadir producto al mercado
        mercadoDiv.appendChild(productoDiv);
        
    });
}