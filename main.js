const filas = 5;
const columnas = 5;

let marcaInicio = 0;
let marcaFin = 0;

const listaTemporal = [];
const recorridoFinal = [];


const Elemento = document.getElementById('grid');

class Nodo {
    constructor (filas,columnas){
        this.filas = filas;
        this.columnas = columnas;

        this.muro = false;
        this.g = Infinity;
        this.h = 0;
        this.f = Infinity;
        this.NodoPadre = null;
        
    }
}


const cards = document.querySelectorAll('.card');
cards.forEach(card => {
card.addEventListener('click', () => {
    card.classList.toggle('activa');
    });
});


const mapa = Array(filas)
    .fill()
    .map(() => Array(columnas).fill(0));


function limpiaMuro(){
    
}