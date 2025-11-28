import { Producto } from "./modules/producto.js";
import { Enemigo } from "../modules/enemigos.js";
import { Jefe } from "../modules/jefe.js";


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
 * Vida máxima que puede tener el jugador.
 * @constant
 * @type {number}
 */
export const VIDA_MAX_JUGADOR = 700;

/**
 * Vida máxima que puede tener un enemigo estándar.
 * @constant
 * @type {number}
 */
export const VIDA_MAX_ENEMIGO = 200;

/**
 * Número máximo de espacios disponibles en el inventario del jugador.
 * @constant
 * @type {number}
 */
export const INVENTARIO_MAX = 6;

/**
 * Puntos base otorgados al jugador por ganar un combate.
 * @constant
 * @type {number}
 */
export const PUNTOS_BASE_VICTORIA = 100;

/**
 * Multiplicador de puntos aplicado al derrotar a un jefe por defecto.
 * @constant
 * @type {number}
 */
export const MULTIPLICADOR_JEFE_DEFECTO = 1.25;

/**
 * Array de productos disponibles en el mercado del juego.
 * Contiene pociones, armas, armaduras con diferentes rarezas y bonificaciones.
 * 
 * @constant {Producto[]}
 */
export const PRODUCTOS_MERCADO = [
    new Producto('Poción 7 vidas', 120.50, 'epico', 'consumible', { vida: 700 }, 'bolaLana.jpg'),
    new Producto('Lata de atún legendario', 25.60, 'raro', 'consumible', { vida: 200 }, 'sigiloso.jpg'),
    new Producto('Caja de cartón', 3, 'comun', 'armadura', { defensa: 2 }, 'trepador.jpg'),
    new Producto('Garras afiladas', 20.80, 'comun', 'arma', { ataque: 5 }, 'garras.png'),
    new Producto('Colmillos tuneados', 100, 'raro', 'armadura', { defensa: 10 }, 'dientes.png'),
    new Producto('Cola-Látigo', 80.20, 'raro', 'arma', { ataque: 8 }, 'garras.png'),
];

/**
 * Array de enemigos disponibles en el juego.
 * Incluye enemigos normales y jefes con avatares específicos.
 * 
 * @constant {Enemigo[]}
 */
export const ENEMIGOS_DISPONIBLES = [
    new Enemigo('Pepino', 5, 'pepino.jpg'),
    new Enemigo('Gato malvado', 3, 'gatoMalvado.jpg'),
    new Enemigo('Perro bobo', 2, 'perroBobo.jpg'),
    new Jefe('Bola de pelo', 1, 'bolaPelo.jpg'),  // Jefe con multiplicador
    new Enemigo('Mi reflejo', 0, 'espejo.jpg'),  // Ataque dinámico en runtime
    new Enemigo('Transportín', 4, 'transportin.jpg')
];


/**
 * Nombre de archivo del avatar del jugador.
 * @constant
 * @type {string}
 */
export const AVATAR_JUGADOR = "prota.png";
