// SELECCIÓN E INSPECCIÓN DEL DOM
console.log("--- Selección de Elementos ---");

/*
 * Utilizamos métodos del objeto 'document' para "agarrar" los elementos del HTML
 * y guardarlos en variables de JavaScript.
 */

// Seleccionamos el INPUT por su ID
const inputNota = document.getElementById('notaInput');

// Seleccionamos el BOTÓN por su ID
const botonAgregar = document.getElementById('btnAgregar');

// Seleccionamos la LISTA (ul) por su ID
const listaNotas = document.getElementById('listaNotas');

// Verificamos en consola que los hemos encontrado
console.log("Referencia al Input:", inputNota);
console.log("Referencia al Botón:", botonAgregar);
console.log("Referencia al UL:", listaNotas);


// PERSISTENCIA (ESTADO INICIAL)
/*
 * Antes de agregar nada, verificamos si ya hay notas guardadas anteriormente.
 * localStorage.getItem('clave') devuelve el texto guardado o null si no existe.
 */
let notas = JSON.parse(localStorage.getItem('misNotas')) || []; // Si no hay nada, inicia como arreglo vacío

console.log(`--- Carga Inicial: Se recuperaron ${notas.length} notas del Local Storage ---`);

// Función auxiliar para guardar en Local Storage cada vez que hacemos cambios
function guardarEnStorage() {
    // localStorage solo guarda TEXTO (strings), por eso usamos JSON.stringify()
    localStorage.setItem('misNotas', JSON.stringify(notas));
    console.log("Cambios guardados en Local Storage.");
}

// LÓGICA DE RENDERIZADO (MOSTRAR EN PANTALLA)
/*
 * Esta función encarga de "pintar" las notas en el HTML basándose en nuestro arreglo 'notas'.
 * Se llama al iniciar y cada vez que agregamos o borramos algo.
 */
function renderizarNotas() {
    // Limpiamos la lista actual para evitar duplicados visuales
    listaNotas.innerHTML = '';

    // Recorremos el arreglo de notas
    notas.forEach((notaTexto, indice) => {
        // Crear el elemento <li> (Item de lista)
        const nuevoLi = document.createElement('li');
        nuevoLi.textContent = notaTexto; // Asignamos el texto de la nota

        // Crear el botón de "Eliminar" para esta nota
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar";

        // Asignamos el evento de eliminar a este botón específico
        botonEliminar.onclick = () => eliminarNota(indice);

        // Agregamos el botón dentro del <li>
        nuevoLi.appendChild(botonEliminar);

        // Agregamos el <li> completo a la lista <ul>
        listaNotas.appendChild(nuevoLi);
    });
}

// Llamamos a renderizar inicialmente para mostrar lo que haya guardado
renderizarNotas();


// FUNCIÓN AGREGAR NOTA
function agregarNota() {
    // Obtenemos el valor que escribió el usuario .trim() quita espacios al inicio/final
    const textoNota = inputNota.value.trim();

    // Validación: Si está vacío, no hacemos nada
    if (textoNota === "") {
        alert("Por favor, escribe una nota antes de agregar.");
        return;
    }

    // Agregamos al arreglo de datos (memoria)
    notas.push(textoNota);

    // Guardamos en Local Storage (persistencia)
    guardarEnStorage();

    // Actualizamos la vista (DOM)
    renderizarNotas();

    // Limpiamos el input y devolvemos el foco para seguir escribiendo
    inputNota.value = "";
    inputNota.focus();

    console.log(`Nota agregada: "${textoNota}"`);
}

// Asignamos el evento CLICK al botón principal
botonAgregar.addEventListener('click', agregarNota);

// Extra: Permitir agregar al presionar la tecla ENTER en el input
inputNota.addEventListener('keypress', (evento) => {
    if (evento.key === 'Enter') {
        agregarNota();
    }
});


// FUNCIÓN ELIMINAR NOTA
function eliminarNota(indice) {
    // Identificamos qué nota borrar
    const notaBorrada = notas[indice];

    // La eliminamos del arreglo usando .splice(indice, cantidad)
    notas.splice(indice, 1);

    // Actualizamos Local Storage
    guardarEnStorage();

    // Actualizamos la vista
    renderizarNotas();

    console.log(`Nota eliminada: "${notaBorrada}"`);
}
