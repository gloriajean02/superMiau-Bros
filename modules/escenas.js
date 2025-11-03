import { rarezaRandom, descuentoRandom} from '../utils/utils.js';
import {aplicarDescuentoPorRareza, mostrarMercado } from "./mercado.js";

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


    // Botón continuar
    const botonContinuar = document.createElement("button");
    botonContinuar.textContent = "Continuar";

    // Montar escena
    escena2.appendChild(mercadoDiv);

    // Inventario

    const inventario = document.createElement("div");
    inventario.id = "inventory-container";

    //Función mostrarMercado de la clase mercado.js
    mostrarMercado(mercadoConDescuento, mercadoDiv, rarezaAleatoria, descuentoAleatorio, inventario, jugador);
    
    escena2.appendChild(inventario);
    escena2.appendChild(botonContinuar);
    escena.appendChild(escena2);
}