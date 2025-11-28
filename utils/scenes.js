/**
 * Muestra una escena específica ocultando todas las demás.
 * Oculta todas las escenas con clase 'scene' agregando la clase 'hidden'
 * y muestra la escena con el ID especificado removiendo la clase 'hidden'.
 * 
 * @param {string} id - El ID de la escena a mostrar.
 * @example
 * showScene('batalla'); // Muestra la escena con id="batalla"
 */
export function showScene(id) {
    document.querySelectorAll('.scene').forEach(element => element.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}