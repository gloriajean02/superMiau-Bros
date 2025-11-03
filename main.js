import { Jugador } from "./modules/jugador.js";
import { Enemigo } from "./modules/enemigos.js";
import { mercado, aplicarDescuentoPorRareza } from "./modules/mercado.js";
import { batalla, calcularNivel } from "./modules/batalla.js";
import { rarezaRandom, descuentoRandom, mostrarArray, EUR } from './utils/utils.js';


const escena = document.getElementsByClassName("scene")[0];
escena.innerHTML = "";

// ---------------------------------- ESCENA 1 --------------------------------------- //
// const escena1 = document.createElement("div");
// escena1.classList.add("scene-1-container");

// const containerPersonaje = document.createElement("div");
// containerPersonaje.classList.add("personaje");

// const pPersonaje = document.createElement("p");
// pPersonaje.innerHTML = "<em>PLAYER</em>";
// const imgPersonaje = document.createElement("img");
// imgPersonaje.src = "imagenes/prota.png";
// imgPersonaje.classList.add("prota");

// const containerParametros = document.createElement("div");
// containerParametros.classList.add("parametros-container");

// const pParametros = document.createElement("p");
// pParametros.innerHTML = "<em>PARÁMETROS</em>";

const jugador = new Jugador('Simba');

// const divParametros = document.createElement("div");
// divParametros.innerHTML = jugador.mostrarJugador();
// divParametros.classList.add("parametros");

// const botonContinuar = document.createElement("button");
// botonContinuar.innerHTML = "Continuar";

// // Primero los elementos hijos
// containerPersonaje.appendChild(pPersonaje);
// containerPersonaje.appendChild(imgPersonaje);

// containerParametros.appendChild(pParametros);
// containerParametros.appendChild(divParametros);
// // Luego los contenedores a la escena
// escena1.appendChild(containerPersonaje);
// escena1.appendChild(containerParametros);

// // Finalmente la escena al contenedor principal
// escena.appendChild(escena1);
// escena.appendChild(botonContinuar);

// ---------------------------------- ESCENA 2 --------------------------------------- //

const escena2 = document.createElement("div");
escena2.classList.add("scene-2-container");

// Contenedor del mercado
const mercadoDiv = document.createElement("div");
mercadoDiv.classList.add("mercado");

const rarezaAleatoria = rarezaRandom();
const descuentoAleatorio = descuentoRandom();

const mercadoConDescuento = aplicarDescuentoPorRareza(rarezaAleatoria, descuentoAleatorio);

// Suponiendo que tienes un array de productos llamado 'mercado'
// y que cada producto tiene un método mostrarProducto() que devuelve un string con nombre y precio
mercadoConDescuento.forEach(producto => {
    // Contenedor de cada producto
    const productoDiv = document.createElement("div");
    productoDiv.classList.add("producto");

    // Info del producto
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("infoProducto");

    const img = document.createElement("img");
    img.src = "imagenes/"+producto.imagen; // o producto.imagen si la tienes
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

    

    // infoDiv.appendChild(img);
    infoDiv.appendChild(img);
    infoDiv.appendChild(nombre);
    infoDiv.appendChild(rareza);
    infoDiv.appendChild(tipo);
    infoDiv.appendChild(bonus);
    infoDiv.appendChild(precio);

    // Botón de comprar
    const comprarDiv = document.createElement("div");
    comprarDiv.classList.add("comprarProducto");

    const boton = document.createElement("button");
    boton.classList.add("botonComprar");
    boton.textContent = "Comprar";

    comprarDiv.appendChild(boton);

    // Unir info y botón al producto
    productoDiv.appendChild(infoDiv);
    productoDiv.appendChild(comprarDiv);

    // Añadir producto al mercado
    mercadoDiv.appendChild(productoDiv);
});

// Botón continuar
const botonContinuar = document.createElement("button");
botonContinuar.textContent = "Continuar";

// Montar escena
escena2.appendChild(mercadoDiv);


// Inventario

const inventario = document.createElement("div");
inventario.id = "inventory-container";

for (let i = 0; i < 6; i++) {
    const elemento = document.createElement("div");
    elemento.classList.add("item");
    inventario.appendChild(elemento);
}

escena2.appendChild(inventario);
escena2.appendChild(botonContinuar);
escena.appendChild(escena2);

// ---------------------------------- ESCENA 3 --------------------------------------- //

console.log("\n💅🏻 "+jugador.nombre+" ha actulizado su inventario: ");
jugador.añadirProducto(mercado[3]);
console.log(jugador.mostrarJugador());

const enemigoPepino = new Enemigo ('Pepino', 5);
const enemigoGatoMalvado = new Enemigo ('Gato malvado', 3);
const enemigoPerroBobo = new Enemigo('Perro bobo', 2);
const enemigoBolaPelo = new Enemigo('Bola de pelo', 1);
const enemigoMiReflejo = new Enemigo('Mi reflejo', jugador.ataqueTotal);
const enemigoTransportin = new Enemigo('Transportín', 4);

const arrayEnemigos = [enemigoBolaPelo, enemigoGatoMalvado, enemigoMiReflejo, 
                        enemigoPepino, enemigoPerroBobo, enemigoTransportin];

mostrarArray(arrayEnemigos, enemigo => enemigo.mostrarEnemigo());

console.log("\n¡Comienzan las batallas!");
console.log("💥 RONDA 1 ");
console.log(batalla(jugador, enemigoBolaPelo));
console.log(batalla(jugador, enemigoPerroBobo));
console.log("💥 RONDA 2 ");
console.log(batalla(jugador, enemigoGatoMalvado));
console.log(batalla(jugador, enemigoTransportin));
console.log("💥 RONDA 3 ");
console.log(batalla(jugador, enemigoTransportin));
console.log(batalla(jugador, enemigoPepino));

console.log("\n🎖 Resultado final");
console.log(jugador.mostrarJugador());
const resultado = calcularNivel(jugador);
console.log(jugador.nombre + " es "+ resultado + " 🔥 ");