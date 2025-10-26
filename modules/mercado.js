import { Producto } from "./producto"
export const mercado = [
    new Producto('Bola de lana', 20, 'comun', 'distraccion', {ataque: 1, defensa: 5}),
    new Producto('Paso sigiloso', 50, 'comun', 'estrategia', {ataque: 3, defensa:2}),
    new Producto('Trepador experto', 130, 'raro', 'estrategia', {ataque: 4, defensa: 3}),
    new Producto('Garras afiladas', 70, 'comun', 'sorpresa', {ataque:5, defensa:4}),
    new Producto('Muerdo inesperado', 180, 'raro', 'sorpresa', {ataque: 5, defensa: 3}),
    new Producto('Furia felina', 250, 'epico', 'sorpresa', {ataque: 5, defensa:5}),
]