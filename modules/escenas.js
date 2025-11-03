import { rarezaRandom, descuentoRandom } from '../utils/utils.js';
import { aplicarDescuentoPorRareza, mostrarMercado } from "./mercado.js";
import { Enemigo } from "./enemigos.js";

export function mostrarEscena1(escena, jugador) {
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

export function mostrarEscena2(escena, jugador) {
    const escena2 = document.createElement("div");
    escena2.classList.add("scene-2-container");

    // Contenedor del mercado
    const mercadoDiv = document.createElement("div");
    mercadoDiv.classList.add("mercado");

    const rarezaAleatoria = rarezaRandom();
    const descuentoAleatorio = descuentoRandom();

    const mercadoConDescuento = aplicarDescuentoPorRareza(rarezaAleatoria, descuentoAleatorio);

    // Montar escena
    escena2.appendChild(mercadoDiv);

    // Inventario

    const inventario = document.createElement("div");
    inventario.id = "inventory-container";

    const arrayInventario = [];

    //Función mostrarMercado de la clase mercado.js
    mostrarMercado(mercadoConDescuento, mercadoDiv, rarezaAleatoria, descuentoAleatorio, arrayInventario, jugador);

    for (let i = 0; i < 6; i++) {
        const elemento = document.createElement("div");
        elemento.classList.add("item");
        inventario.appendChild(elemento);
    }

    escena2.appendChild(inventario);
    escena.appendChild(escena2);
}

export function mostrarEscena4(escena, jugador) {
    const escena4 = document.createElement("div");
    escena4.classList.add("scene-4-container");

    // Contenedor del mercado
    const enemigosDiv = document.createElement("div");
    enemigosDiv.classList.add("enemigos");

    const enemigoPepino = new Enemigo('Pepino', 5, 'pepino.jpg');
    const enemigoGatoMalvado = new Enemigo('Gato malvado', 3, 'gatoMalvado.jpg');
    const enemigoPerroBobo = new Enemigo('Perro bobo', 2, 'perroBobo.jpg');
    const enemigoBolaPelo = new Enemigo('Bola de pelo', 1, 'bolaPelo.jpg');
    const enemigoMiReflejo = new Enemigo('Mi reflejo', jugador.ataqueTotal, 'espejo.jpg');
    const enemigoTransportin = new Enemigo('Transportín', 4, 'transportin.jpg');

    const arrayEnemigos = [enemigoBolaPelo, enemigoGatoMalvado, enemigoMiReflejo,
        enemigoPepino, enemigoPerroBobo, enemigoTransportin];

    arrayEnemigos.forEach(enemigo => {
        // Contenedor de cada enemigo
        const enemigoDiv = document.createElement("div");
        enemigoDiv.classList.add("enemigo");

        // Info del producto
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