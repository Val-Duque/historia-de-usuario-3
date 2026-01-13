// CONFIGURACIÓN INICIAL

// URL de nuestra API (Si no tienes JSON Server corriendo, fetch fallará pero la app seguirá funcionando con Local Storage)
const API_URL = 'http://localhost:3000/productos';

// Estado global de la aplicación (Lista de productos)
let productos = [];

// SELECCIÓN DE ELEMENTOS DEL DOM 
const inputNombre = document.getElementById('nombreProducto');
const inputPrecio = document.getElementById('precioProducto');
const btnAgregar = document.getElementById('btnAgregar');
const listaProductos = document.getElementById('listaProductos');


// FUNCIONES AUXILIARES (PERSISTENCIA LOCAL)

// Guardar en Local Storage 
function guardarEnLocalStorage() {
    localStorage.setItem('inventarioProductos', JSON.stringify(productos));
}

// Cargar desde Local Storage
function cargarDeLocalStorage() {
    const datos = localStorage.getItem('inventarioProductos');
    return datos ? JSON.parse(datos) : [];
}


// FUNCIÓN PRINCIPAL: OBTENER DATOS (GET) 
async function obtenerProductos() {
    try {
        console.log("Intentando obtener datos del servidor...");
        // Intentamos pedir los datos a la API
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) throw new Error('Error en la respuesta del servidor');

        // Si responde bien, convertimos a JSON
        const datosServidor = await respuesta.json();
        console.log("Datos recibidos del servidor:", datosServidor);

        // Actualizamos nuestro estado con lo que vino del servidor
        productos = datosServidor;

    } catch (error) {
        console.warn("No se pudo conectar con la API (Posiblemente JSON Server no esté corriendo).");
        console.log("Cargando datos desde Local Storage...");

        // Si falla la API, usamos Local Storage como respaldo (Fallback)
        productos = cargarDeLocalStorage();
    }

    // Sea cual sea la fuente, renderizamos en pantalla
    renderizarProductos();
}


// LÓGICA DE RENDERIZADO 

function renderizarProductos() {
    listaProductos.innerHTML = ''; // Limpiar lista

    productos.forEach(producto => {
        // Crear elemento LI
        const li = document.createElement('li');

        // Contenido del LI: Nombre - Precio
        // Usamos un <span> para el texto para separarlo del botón
        const texto = document.createElement('span');
        // Validamos que precio exista, si no ponemos 0
        texto.textContent = `${producto.nombre} - $${producto.precio || 0}`;

        // Botón Eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('delete'); // Clase para estilos CSS

        // Evento Eliminar
        // Pasamos el ID si existe, o usamos el índice del array como respaldo
        btnEliminar.onclick = () => eliminarProducto(producto.id);

        // Armar el HTML
        li.appendChild(texto);
        li.appendChild(btnEliminar);
        listaProductos.appendChild(li);
    });
}

// AGREGAR PRODUCTO (POST)

async function agregarProducto() {
    const nombre = inputNombre.value.trim();
    const precio = parseFloat(inputPrecio.value);

    // Validación básica
    if (!nombre || isNaN(precio)) {
        alert("Por favor ingresa un nombre y un precio válido.");
        return;
    }

    // Objeto del nuevo producto
    // Generamos un ID temporal (Date.now()) por si la API no funciona
    const nuevoProducto = {
        id: Date.now().toString(),
        nombre: nombre,
        precio: precio
    };

    // Actualización Optimista: Agregamos a la lista local y pantalla INMEDIATAMENTE
    productos.push(nuevoProducto);
    guardarEnLocalStorage();
    renderizarProductos();

    // Limpiamos formulario
    inputNombre.value = '';
    inputPrecio.value = '';
    inputNombre.focus();

    // Sincronización con API (Segundo plano)
    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio }) // OJO: No mandamos ID, el servidor suele crearlo
        });

        if (respuesta.ok) {
            const productoCreado = await respuesta.json();
            console.log("Producto guardado en servidor:", productoCreado);
            // Opcional: Podríamos actualizar el ID local con el real del servidor si fuera crítico
        } else {
            throw new Error('Servidor rechazó el guardado');
        }
    } catch (error) {
        console.error("Error al guardar en API (Se mantiene en Local Storage):", error);
    }
}


// ELIMINAR PRODUCTO (DELETE)
async function eliminarProducto(id) {
    // Eliminar del estado local y Storage (Actualización Optimista)
    // Filtramos para crear un nuevo array SIN el producto que tenga ese ID
    const estadoAnterior = [...productos]; // Copia de respaldo por si falla (avanzado)
    productos = productos.filter(prod => prod.id !== id);

    guardarEnLocalStorage();
    renderizarProductos();

    console.log(`Eliminando producto ID: ${id} localmente...`);

    // Eliminar del Servidor
    try {
        // La URL para borrar suele ser .../productos/ID
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            console.log("Producto eliminado del servidor.");
        } else {
            throw new Error('No se encontró en servidor o error interno');
        }
    } catch (error) {
        console.warn("No se pudo eliminar de la API (Solo se borró localmente):", error);
        // Nota: En una app real, podrías decidir deshacer el cambio local si falla el servidor,
        // pero para esta experiencia de usuario "offline-first", está bien dejarlo borrado localmente.
    }
}


// INICIALIZACIÓ

// Asignar evento al botón
btnAgregar.addEventListener('click', agregarProducto);

// Cargar datos al iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos();
});

// Extra: Enter para enviar
inputPrecio.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarProducto();
});
