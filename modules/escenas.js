import { rarezaRandom, descuentoRandom, EUR } from '../utils/utils.js';
import { aplicarDescuentoPorRareza, actualizarInventario } from "./mercado.js";
import { batalla } from "./batalla.js";



export function mostrarJugador(escena, jugador) {
    const escena1 = document.createElement("div");
    escena1.classList.add("scene-1-container");

    const containerPersonaje = document.createElement("div");
    containerPersonaje.classList.add("personaje");

    const pPersonaje = document.createElement("p");
    pPersonaje.innerHTML = "<em>PLAYER</em>";
    const imgPersonaje = document.createElement("img");
    imgPersonaje.src = "imagenes/prota.png";
    imgPersonaje.classList.add("prota");

    const containerParametros = document.createElement("div");
    containerParametros.classList.add("parametros-container");

    const pParametros = document.createElement("p");
    pParametros.innerHTML = "<em>PARÁMETROS</em>";

    const divParametros = document.createElement("div");
    divParametros.innerHTML = jugador.mostrarJugador();
    divParametros.classList.add("parametros");

    // Primero los elementos hijos
    containerPersonaje.appendChild(pPersonaje);
    containerPersonaje.appendChild(imgPersonaje);

    containerParametros.appendChild(pParametros);
    containerParametros.appendChild(divParametros);

    // Luego los contenedores a la escena
    escena1.appendChild(containerPersonaje);
    escena1.appendChild(containerParametros);

    // Finalmente la escena al contenedor principal
    escena.appendChild(escena1);

}

export function mostrarMercado(escena, jugador) {
    const escena2 = document.createElement("div");
    escena2.classList.add("scene-2-container");

    // Contenedor del mercado
    const mercadoDiv = document.createElement("div");
    mercadoDiv.classList.add("mercado");

    // Descuento aleatorio
    const rarezaAleatoria = rarezaRandom();
    const descuentoAleatorio = descuentoRandom();
    const mercadoConDescuento = aplicarDescuentoPorRareza(rarezaAleatoria, descuentoAleatorio);

    // Montar escena
    escena2.appendChild(mercadoDiv);

    // --- INVENTARIO ---
    const inventario = document.createElement("div"); 
    inventario.id = "inventory-container";

    //Crear 6 items para el inventario
    for (let i = 0; i < 6; i++) { 
        const elemento = document.createElement("div"); 
        elemento.classList.add("item"); 
        inventario.appendChild(elemento); 
    }

    // Guardamos items en un array e inicializamos arrayInventario
    // para pasarlo en el bucle a la función "actualizarInventario" disponible en mercado.js
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
        precio.innerHTML = EUR.format(producto.precio);

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
            if (arrayInventario.includes(producto)) {
                // quitar del inventario y del jugador
                botonComprar.innerHTML = 'Añadir';
                productoDiv.style.backgroundColor = "";

                const i = arrayInventario.findIndex(p => p === producto);
                arrayInventario.splice(i, 1);

                const j = jugador.inventario.findIndex(p => p === producto);
                jugador.inventario.splice(j, 1);
            } else {
                // añadir al inventario y al jugador
                if (arrayInventario.length >= 6) {
                    alert("Inventario lleno");
                    return;
                }

                botonComprar.innerHTML = 'Añadido';
                productoDiv.style.backgroundColor = "#d4fcd4";
                arrayInventario.push(producto);
                jugador.añadirProducto(producto);
            }

            //Función que actualiza las casillas de inventario
            actualizarInventario(items, arrayInventario);
        });

        productoDiv.append(infoDiv, comprarDiv);
        mercadoDiv.appendChild(productoDiv);
    });

    escena2.appendChild(inventario);
    escena.appendChild(escena2);
}

export function mostrarEnemigos(escena, arrayEnemigos) {
    const escena4 = document.createElement("div");
    escena4.classList.add("scene-4-container");

    const pEnemigos = document.createElement('p');
    pEnemigos.innerHTML = "<em>ENEMIGOS</em>";
    escena4.appendChild(pEnemigos);

    // Contenedor de enemigos
    const enemigosDiv = document.createElement("div");
    enemigosDiv.classList.add("enemigos");

    arrayEnemigos.forEach(enemigo => {
        // Contenedor de cada enemigo
        const enemigoDiv = document.createElement("div");
        enemigoDiv.classList.add("enemigo");

        // Info del enemigo
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("infoEnemigo");

        const img = document.createElement("img");
        img.src = "imagenes/" + enemigo.imagen;
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
    escena4.appendChild(enemigosDiv);
    escena.appendChild(escena4);
}

export function pelear(escena, arrayEnemigos, jugador) {
    const escena5 = document.createElement("div");
    escena5.classList.add("scene-5-container");

    // Contenedor de pelea
    const peleaDiv = document.createElement("div");
    peleaDiv.classList.add("pelea");

    // Busca un enemigoAleatorio al que enfrentarse
    const i = Math.floor(Math.random() * arrayEnemigos.length);
    const enemigoAleatorio = arrayEnemigos[i];

    const enemigoDiv = document.createElement("div");
    enemigoDiv.classList.add("enemigoPeleaDiv");

    const personajeDiv = document.createElement("div");
    personajeDiv.classList.add("personajePeleaDiv");

    const imgEnemigo = document.createElement("img");
    imgEnemigo.src = "imagenes/" + enemigoAleatorio.imagen;
    imgEnemigo.classList.add("imgEnemigo");

    const imgPersonaje = document.createElement("img");
    imgPersonaje.src = "imagenes/prota.png";
    imgPersonaje.classList.add("prota");

    personajeDiv.appendChild(imgPersonaje);
    enemigoDiv.appendChild(imgEnemigo);
    peleaDiv.appendChild(personajeDiv);
    peleaDiv.appendChild(enemigoDiv);

    const resultado = batalla(jugador, enemigoAleatorio);
    const pResultado = document.createElement("h2");
    pResultado.classList.add('resultado');
    pResultado.innerHTML = resultado;

    escena5.appendChild(pResultado);
    escena5.appendChild(peleaDiv);
    escena.appendChild(escena5);

}