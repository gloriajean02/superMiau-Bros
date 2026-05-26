
import { aplicarDescuentoPorRareza, rarezaRandom, descuentoRandom, actualizarInventario, filtrarPorRarezaMercado } from "./mercado.js";
import { batalla } from "./batalla.js";
import { INVENTARIO_MAX } from "../constants.js";

/**
 * Módulo de Renderizado de UI del Juego.
 * Gestiona la visualización del jugador, mercado, enemigos y batallas en el DOM.
 */

/**
 * Actualiza la visualización de los parámetros y avatar del jugador.
 * 
 * @param {Jugador} jugador - Instancia del jugador con métodos describirJugador() y propiedad avatar.
 */
export function mostrarJugador(jugador) {
    const divParametros = document.getElementById("parametros-jugador");
    const imgJugador = document.getElementById("img-jugador");

    divParametros.innerHTML = jugador.describirJugador();
    imgJugador.src = "imagenes/" + jugador.avatar;
}

/**
 * Renderiza el mercado con productos y el sistema de compra/venta.
 * Aplica descuento aleatorio a productos de rareza específica.
 * Gestiona el inventario visual y lógico del jugador.
 * 
 * @param {Jugador} jugador - Jugador con inventario y método añadirProducto().
 */
export function mostrarMercado(jugador) {
    const escenaMercado = document.getElementById("escena-mercado-container");
    const mercadoDiv = document.getElementById("mercado");

    // Reset antes de imprimir productos
    mercadoDiv.innerHTML = "";

    // Descuento aleatorio
    const rarezaAleatoria = rarezaRandom();
    const descuentoAleatorio = descuentoRandom();
    const mercadoConDescuento = aplicarDescuentoPorRareza(rarezaAleatoria, descuentoAleatorio);

    // Montar escena
    escenaMercado.appendChild(mercadoDiv);

    const pDinero = document.getElementById("dinero");
    pDinero.innerHTML = "<em>DINERO DEL JUGADOR:</em>"+jugador.dinero;

    // INVENTARIO: casillas ya existen en HTML
    const inventario = document.getElementById("inventory-container");
    const items = inventario.querySelectorAll(".item");
    const arrayInventario = [];

    
    // --- MERCADO ---
    mercadoConDescuento.forEach(producto => {
        const productoDiv = document.createElement("div");

        productoDiv.classList.add("producto");

        // Info del producto
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("infoProducto");

        const img = document.createElement("img");
        img.src = "imagenes/" + producto.imagen;
        img.classList.add("imgProducto");

        const nombre = document.createElement("p");
        nombre.innerHTML = "<strong>" + producto.nombre + "</strong>";

        const rareza = document.createElement("p");
        rareza.innerHTML = "<em>Rareza: </em>" + producto.rareza;

        const tipo = document.createElement("p");
        tipo.innerHTML = "<em>Tipo: </em>" + producto.tipo;

        const bonus = document.createElement("p");
        bonus.innerHTML = "<em>Bonus: </em>" + producto.mostrarBonus();

        const precio = document.createElement("p");
        precio.innerHTML = producto.precioEuros;

        if (producto.rareza === rarezaAleatoria) {
            productoDiv.id = "conDescuento";
            const descuento = document.createElement("p");
            descuento.classList.add("descuento");
            descuento.innerHTML = "¡¡¡CON DESCUENTO!!! -" + descuentoAleatorio + "%";
            infoDiv.appendChild(descuento);
        }

        // Añadir productos al infoDiv
        infoDiv.append(img, nombre, rareza, tipo, bonus, precio);

        // --- BOTÓN COMPRAR ---
        const comprarDiv = document.createElement("div");
        comprarDiv.classList.add("comprarProducto");

        const botonComprar = document.createElement("button");
        botonComprar.classList.add("botonComprar");
        botonComprar.innerHTML = "Añadir";

        comprarDiv.appendChild(botonComprar);

        botonComprar.addEventListener("click", () => {
            if (jugador.dinero < producto.precio) {
                alert("No tienes suficiente dinero para comprar este producto")
            } else {
                if (arrayInventario.includes(producto)) {
                    // quitar del inventario y devolver el dinero
                    jugador.dinero += producto.precio;
                    pDinero.innerHTML = "<em>DINERO DEL JUGADOR:</em>" + jugador.dinero;
                    botonComprar.innerHTML = 'Añadir';
                    productoDiv.style.backgroundColor = "";

                    const i = arrayInventario.findIndex(p => p === producto);
                    arrayInventario.splice(i, 1);

                    const j = jugador.inventario.findIndex(p => p.nombre === producto.nombre);
                    jugador.inventario.splice(j, 1);
                } else {
                    // añadir al inventario y al jugador
                    if (arrayInventario.length >= INVENTARIO_MAX) {
                        alert("Inventario lleno");
                        return;
                    }
                    jugador.dinero -= producto.precio;
                    pDinero.innerHTML = "<em>DINERO DEL JUGADOR:</em>"+jugador.dinero;
                    botonComprar.innerHTML = 'Retirar';
                    productoDiv.style.backgroundColor = "#d4fcd4";
                    arrayInventario.push(producto);
                    jugador.añadirProducto(producto);
                    
                }
                
                //Función que actualiza las casillas de inventario
                actualizarInventario(items, arrayInventario);
            }
                
            });

        productoDiv.append(infoDiv, comprarDiv);
        mercadoDiv.appendChild(productoDiv);
    });

    escenaMercado.appendChild(inventario);
}

/**
 * Renderiza la lista de enemigos disponibles en la escena.
 * 
 * @param {Enemigo[]} arrayEnemigos - Array de instancias de enemigos con propiedades nombre, ataque y avatar.
 */
export function mostrarEnemigos(arrayEnemigos) {
    const escenaEnemigos = document.getElementById("escena-enemigos-container");
    const enemigosDiv = document.getElementById("enemigos-container");

    // Reset enemigos antes de imprimir
    enemigosDiv.innerHTML = "";

    arrayEnemigos.forEach(enemigo => {
        // Contenedor de cada enemigo
        const enemigoDiv = document.createElement("div");
        enemigoDiv.classList.add("enemigo");

        // Info del enemigo
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("infoEnemigo");

        const img = document.createElement("img");
        img.src = "imagenes/" + enemigo.avatar;
        img.classList.add("imgEnemigo");

        const nombre = document.createElement("p");
        nombre.innerHTML = "<strong>" + enemigo.nombre + "</strong>";

        const ataque = document.createElement("p");
        ataque.innerHTML = "<em>Ataque: </em>" + enemigo.ataque;

        infoDiv.appendChild(img);
        infoDiv.appendChild(nombre);
        infoDiv.appendChild(ataque);

        enemigosDiv.appendChild(infoDiv);
    });

    // Montar escena
    escenaEnemigos.appendChild(enemigosDiv);
}

/**
 * Inicia una batalla aleatoria contra un enemigo del array.
 * Actualiza imágenes de combate y muestra resultado.
 * 
 * @param {Enemigo[]} arrayEnemigos - Lista de enemigos disponibles.
 * @param {Jugador} jugador - Jugador participante en la batalla.
 */
export function pelear(arrayEnemigos, jugador) {
    const imgJugador = document.getElementById("img-jugador-pelea");
    const imgEnemigo = document.getElementById("img-enemigo-pelea");
    const pResultado = document.getElementById("resultado-pelea");

    // enemigo aleatorio
    const i = Math.floor(Math.random() * arrayEnemigos.length);
    const enemigoAleatorio = arrayEnemigos[i];

    // imágenes
    imgJugador.src = "imagenes/" + jugador.avatar;
    imgEnemigo.src = "imagenes/" + enemigoAleatorio.avatar;

    // resultado batalla
    const resultado = batalla(jugador, enemigoAleatorio);
    pResultado.innerHTML = resultado;

}