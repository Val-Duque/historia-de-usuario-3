// CREACIÓN DE OBJETOS

// Lista de productos, cada producto tiene un ID, nombre, precio y categoría
const productos = [
    { id: 1, nombre: "Laptop Gamer", precio: 1500, categoria: "Electrónica" },
    { id: 2, nombre: "Auriculares Bluetooth", precio: 50, categoria: "Accesorios" },
    { id: 3, nombre: "Monitor 4K", precio: 300, categoria: "Electrónica" },
    { id: 4, nombre: "Teclado Mecánico", precio: 100, categoria: "Accesorios" },
    // Este producto está incompleto intencionalmente para probar nuestras validaciones más adelante
    { id: 5, nombre: "Producto Defectuoso" }
];

console.log("--- Lista de Productos (Objetos) ---");
console.log(productos); // Mostramos la lista de productos
console.log("\n"); // Salto de línea para limpiar la consola


// USO DE SET (CONJUNTOS)
// Un SET es una estructura de datos que SOLO almacena valores únicos.
// Si intentas agregar un valor duplicado, el Set lo ignorará.
// Es ideal para eliminar duplicados de un Array.

// Se crea un Array con números repetidos
const numerosRepetidos = [10, 20, 30, 10, 40, 20, 50];

// Se crea el Set a partir del Array. Automáticamente elimina los duplicados.
const setNumeros = new Set(numerosRepetidos);

console.log("--- Uso de Set (Valores Únicos) ---");
console.log("Valores originales:", numerosRepetidos);
console.log("Set resultante (sin duplicados):", setNumeros);

// Se listan los métodos principales de un Set:

// .add(valor) -> Agrega un nuevo elemento
setNumeros.add(60);
console.log("Después de agregar 60:", setNumeros);

// .has(valor) -> Devuelve true si el valor existe, false si no
const buscarNum = 30;
const existe = setNumeros.has(buscarNum);
console.log(`¿El número ${buscarNum} está en el Set?`, existe); // true

// .delete(valor) -> Elimina un elemento específico
setNumeros.delete(10);
console.log("Después de eliminar el 10:", setNumeros);

// Recorrer un Set usando for...of (ideal para iterables)
console.log("Recorriendo el Set:");
for (const num of setNumeros) {
    console.log(` > Valor único: ${num}`);
}
console.log("\n");

// USO DE MAP (MAPAS)

/*
 * Un MAP es una colección de pares Clave-Valor.
 * A diferencia de los objetos regulares:
 * - Las claves pueden ser de cualquier tipo (objetos, funciones, etc.).
 * - Recuerda el orden de inserción.
 * - Tiene métodos específicos para obtener tamaños y gestionar datos.
 */

const mapaCategorias = new Map();

// Vamos a llenar el mapa relacionando: Categoría (Clave) -> Nombre del Producto (Valor)
productos.forEach(prod => {
    // Solo agregamos si el producto tiene categoría y nombre
    if (prod.categoria && prod.nombre) {
        // .set(clave, valor) guarda un dato en el mapa.
        // OJO: Si la clave ya existe, sobrescribe el valor anterior.
        mapaCategorias.set(prod.categoria, prod.nombre);
    }
})

console.log("--- Uso de Map (Categoría -> Producto) ---");
console.log(mapaCategorias);
/* 
 * Nota: Como las claves son únicas, si hay varios productos de "Electrónica",
 * solo quedará guardado el último que procesamos (Monitor 4K en este caso).
 */
console.log("\n");

// ITERACIÓN (BUCLES)

console.log("--- Diferentes formas de iterar ---");

// for y in -> ITERAR SOBRE PROPIEDADES DE UN OBJETO
/*
 * Se usa principalmente para recorrer las CLAVES (keys) de un objeto.
 */
const productoEjemplo = productos[0]; // Tomamos el primer producto
console.log("A) Usando for y in para ver propiedades del producto:");

for (const propiedad in productoEjemplo) {
    // propiedad: será "id", "nombre", "precio", etc.
    // productoEjemplo[propiedad]: accede al valor correspondiente.
    console.log(` - Clave: ${propiedad}, Valor: ${productoEjemplo[propiedad]}`);
}

//  for y of -> ITERAR SOBRE VALORES DE UN ITERABLE (Array, Set, Map)
/*
 * Se usa para recorrer los VALORES directamente. No sirve para objetos simples.
 */
console.log("\nB) Usando for y of para recorrer el Set de números:");
for (const valor of setNumeros) {
    console.log(` - Número: ${valor}`);
}

// forEach -> MÉTODO FUNCIONAL
/*
 * Es un método disponible en Arrays y Maps (y Sets).
 * Ejecuta una función por cada elemento.
 */
console.log("\nC) Usando forEach para recorrer el Map:");
mapaCategorias.forEach((producto, categoria) => {
    // En los Maps, el primer argumento es el VALOR y el segundo la CLAVE
    console.log(` - Categoría: "${categoria}" tiene el producto: "${producto}"`);
});
console.log("\n");

// VALIDACIONES Y PRUEBAS

console.log("--- Validación de Datos ---");

/*
 * Función para validar que un producto tenga los datos correctos.
 * Retorna true si es válido, false si no.
 */
function validarProducto(producto) {
    // Verificamos que 'id' y 'nombre' existan (no sean null/undefined/vacíos)
    // Verificamos que 'precio' sea estrictamente un número
    if (!producto.id || !producto.nombre || typeof producto.precio !== 'number') {
        return false; // Falla la validación
    }
    return true; // Pasa la validación
}

console.log("Reporte de validación de productos:");
// Recorremos todos los productos para validarlos uno por uno
productos.forEach(prod => {
    const esValido = validarProducto(prod);

    if (esValido) {
        console.log(`Producto "${prod.nombre}" es válido.`);
    } else {
        console.warn(`Error: El producto con ID ${prod.id} "${prod.nombre || 'Sin Nombre'}" tiene datos incompletos.`);
    }
});

// Extra: Demostración de métodos estáticos de Object
console.log("\nExtra: Métodos de Object en el primer producto:");
console.log("Object.keys() (Nombres de propiedades):", Object.keys(productoEjemplo));
console.log("Object.values() (Valores):", Object.values(productoEjemplo));
console.log("Object.entries() (Pares [clave, valor]):", Object.entries(productoEjemplo));
