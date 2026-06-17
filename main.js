const filas = 5;
const comlumnas = 5;

let marcaInicio = 0;
let marcaFin = null;

const listaTemporal = [];
const recorridoFinal = [];


const Elemento = document.getElementById('grid');

class Nodo {
    constructor (filas,comlumnas){
        this.filas = filas;
        this.comlumnas = comlumnas;
        
    }
}


const card = document.querySelector('.card');

card.addEventListener('click', () => {
    card.classList.toggle('activa');
})