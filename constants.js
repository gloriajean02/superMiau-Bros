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


export const VIDA_MAX_JUGADOR = 700;
export const VIDA_MAX_ENEMIGO = 200;
export const INVENTARIO_MAX = 6;

export const PUNTOS_BASE_VICTORIA = 100;
export const MULTIPLICADOR_JEFE_DEFECTO = 1.25;

export const AVATAR_JUGADOR = "prota.png";
