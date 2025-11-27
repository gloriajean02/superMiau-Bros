
import { Enemigo } from "./enemigos.js";
import { MULTIPLICADOR_JEFE_DEFECTO } from "../constants.js";

export class Jefe extends Enemigo {
    multiplicadorDmg;

    /**
     * @param {string} nombre
     * @param {number} ataque
     * @param {string} avatar
     * @param {number} [multiplicadorDmg=1.25]
     */
    constructor(nombre, ataque, avatar, multiplicadorDmg = MULTIPLICADOR_JEFE_DEFECTO) {
        super(nombre, ataque, avatar);
        this.tipo = 'Jefe';              // sobreescribimos el tipo
        this.multiplicadorDmg = multiplicadorDmg;
    }

    multiplicarDmg(puntosTotales) {
        return puntosTotales * this.multiplicadorDmg;
    }
}
