// Variables globales
let marcaInicio = null;
let marcaFin = null;
let gridNodos = []; // Matriz de nodos

// Configuración de la cuadrícula
const FILAS = 5;
const COLUMNAS = 5;

// Obtener el contenedor
const nodoElemento = document.getElementById('nodo');

class Nodo {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.muro = false;
        this.g = Infinity;
        this.h = 0;
        this.f = Infinity;
        this.NodoPadre = null;
    }
}

// Crear la cuadrícula visual
function crearPanel() {
    for (let i = 0; i < FILAS; i++) {
        gridNodos[i] = [];
        for (let j = 0; j < COLUMNAS; j++) {
            
            // Crear nodo lógico
            const nodo = new Nodo(i, j);
            gridNodos[i][j] = nodo;
            
            // Crear celda visual
            const celda = document.createElement('div');
            celda.classList.add('card');
            celda.dataset.fila = i;
            celda.dataset.columna = j;
            
            // Event listeners
            celda.addEventListener('click', (e) => {
                const fila = parseInt(celda.dataset.fila);
                const columna = parseInt(celda.dataset.columna);
                const nodoSeleccionado = gridNodos[fila][columna];
                
                // Lógica: primer click = inicio, segundo click = fin
                if (!marcaInicio) {
                    seleccionaCeldaInicio(nodoSeleccionado, celda);
                } else if (!marcaFin) {
                    seleccionaCeldaFinal(nodoSeleccionado, celda);
                } else {
                    // Toggle muro
                    toggleMuro(nodoSeleccionado, celda);
                }
            });
            
            nodoElemento.appendChild(celda);
        }
    }
}

function seleccionaCeldaInicio(nodo, celda) {
    if (!marcaInicio) {
        marcaInicio = nodo;
        celda.classList.add('inicio');

        console.log(`Inicio marcado en [${nodo.filas}, ${nodo.columnas}]`);
    }
}

function seleccionaCeldaFinal(nodo, celda) {
    if (!marcaFin) {
        // Verificar que no sea la misma celda que inicio
        if (nodo !== marcaInicio) {
            marcaFin = nodo;
            celda.classList.add('fin');
            console.log(`Fin marcado en [${nodo.filas}, ${nodo.columnas}]`);
        } else {
            console.log('El fin no puede ser igual al inicio');
        }
    }
}

function toggleMuro(nodo, celda) {
    // No permitir muros en inicio o fin
    if (nodo === marcaInicio || nodo === marcaFin) {
        return;
    }
    
    nodo.muro = !nodo.muro;
    celda.classList.toggle('activa');
}

// Función que llama el botón
function iniciaRecorrido() {
    if (!marcaInicio || !marcaFin) {
        alert('Marca un punto de inicio y uno de fin primero');
        return;
    }
    
    console.log('Inicio:', marcaInicio.filas, marcaInicio.columnas);
    console.log('Fin:', marcaFin.filas, marcaFin.columnas);
    console.log('¡Funciona! Ahora podemos implementar A*');
    
    // Aquí irá el algoritmo A* más adelante


    // Reiniciar valores de los nodos
    for(let i=0;i< FILAS; i++){
        for(let j=0; j<COLUMNAS; j++){
            gridNodos[i][j].g = Infinity;
            gridNodos[i][j].h = 0;
            gridNodos[i][j].f = Infinity;
            gridNodos[i][j].NodoPadre = null;
        }
    }
}

const listaTemporal = [];
const recorridoFinal = [];

//Configuracion d inicio

marcaInicio.g = 0;
marcaInicio.h = calcularHeuristica(marcaInicio, marcaFin);
marcaInicio.f = marcaInicio.h;

listaTemporal.push(marcaInicio);

while(listaTemporal.length > 0){
    //para buscar el nodo con menor -F-
    let nodoActual = listaTemporal [0];
    let indiceActual = 0;
    
    //verificamos
    
    for(let i=0; i<listaTemporal.length; i++){
        if(listaTemporal[i].f < nodoActual.f){
            nodoActual = listaTemporal[i];
            indiceActual = i;
        }
    }

    // Si existte un camino entonces
    if(nodoActual === marcaFin){
        reconstruirCamino(nodoActual);
        // para pruebas
        console.log('Si hay camino... Encontrado');
        return;
    }

    // Si si llegamos al nodo final tenemos que mover el de menor carga
    // ok deepseek me recomienda splice https://www.freecodecamp.org/espanol/news/javascript-splice-como-ulitizar-el-metodo-splice-de-arreglo-en-js/
    // hacer ejercicios con splice()
    //let meses = ["enero", "febrero", "lunes", "martes"];
    //let dias = meses.splice(2);
    //console.log(dias); // ["lunes", "martes"]
    
    listaAbierta.splice(indiceActual,1);
    listaCerrada.push(nodoActual);

    //obtener vecinos
    const vecinos = obtenerVecinos(nodoActual);

    for(const vecino of vecinos){
        //colicion/comprobacion si es que encontramos un muro 
        if(vecino.muro || listaCerrada.includes(vecino)){
            continue;
        }
        //mejor camino
        vecino.NodoPadre = nodoActual;
        vecino.g = gTentativa;
        vecino.h = calcularHeuristica(vecino, marcaFin);
        vecino.f = vecino.g * vecino.h;
    }
}

    console.log('no hay caminos posible');
    alert('no se encontro camino');

    //deepseek
    // no me funcionaba el mio, la formula D = |X1-X2|+|Y1-Y2|

    function calcularHeuristica(nodoA, nodoB) {
    // Distancia Manhattan
    return Math.abs(nodoA.filas - nodoB.filas) + Math.abs(nodoA.columnas - nodoB.columnas);
    }


// Función para resetear
function limpiaMuro() {
    location.reload();
}

// Inicializar
crearPanel();