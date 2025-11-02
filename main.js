import { Jugador } from "./modules/jugador.js";
import { Enemigo } from "./modules/enemigos.js";
import { mercado, aplicarDescuentoPorRareza } from "./modules/mercado.js";
import { batalla, calcularNivel } from "./modules/batalla.js";
import { rarezaRandom, descuentoRandom, mostrarArray } from './utils/utils.js';

const jugador = new Jugador('Simba');

const parametrosContainer = document.getElementById("parametros-container");
const divParametros = document.createElement("div");
divParametros.innerHTML = jugador.mostrarJugador();
divParametros.classList.add("parametros");
parametrosContainer.appendChild(divParametros);


console.log(jugador.mostrarJugador());

console.log("\n🛍 MERCADO 🛍");

mostrarArray(mercado, producto => producto.mostrarProducto());

console.log("\n🛍 MERCADO CON DESCUENTO 🛍");

const rareza = rarezaRandom();
const descuento = descuentoRandom();

const mercadoConDescuento = aplicarDescuentoPorRareza(rareza, descuento);

mostrarArray(mercadoConDescuento, producto => producto.mostrarProducto());

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