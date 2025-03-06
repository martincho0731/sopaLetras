// Sopa de Letras - PWA

// Configuración del tablero
const filas = 10;
const columnas = 10;
const categorias = {
    animales: ["PERRO", "GATO", "ELEFANTE", "TIGRE", "LEON", "OSO", "SERPIENTE", "AGUILA", "LOBO", "CEBRA", "JIRAFA", "PANDA", "COCODRILO", "CANGURO", "CABALLO", "ARDILLA", "CASTOR", "BALLENA", "TORTUGA", "RINOCERONTE"],
    colores: ["ROJO", "AZUL", "VERDE", "AMARILLO", "NARANJA", "MORADO", "NEGRO", "BLANCO", "GRIS", "ROSADO", "TURQUESA", "VIOLETA", "DORADO", "PLATEADO", "CELESTE", "LAVANDA", "BEIGE", "CORAL", "MELON", "LIMA"],
    paises: ["URUGUAY", "ARGENTINA", "BRASIL", "CHILE", "MEXICO", "PERU", "COLOMBIA", "ESPAÑA", "FRANCIA", "ALEMANIA", "ITALIA", "PORTUGAL", "HOLANDA", "SUIZA", "AUSTRALIA", "JAPON", "CHINA", "INDIA", "RUSIA", "CANADA"],
    cosas: ["MESA", "SILLA", "LAPIZ", "COMPUTADORA", "RELOJ", "TELEFONO", "VENTANA", "PUERTA", "CARTERA", "BOLSA", "CINTURON", "ZAPATO", "SOMBRERO", "GAFAS", "CHAQUETA", "PANTALON", "CAMISA", "SACO", "BOTELLA", "TASA"]
};
let palabras = [];
let tablero = [];
let palabrasEncontradas = 0;
let seleccionando = false;
let seleccion = [];
let tiempo = 0;
let cronometro;

// Seleccionar 15 palabras aleatorias
function seleccionarPalabras() {
    let todasPalabras = Object.values(categorias).flat();
    palabras = todasPalabras.sort(() => 0.5 - Math.random()).slice(0, 15);
    document.getElementById("contador").textContent = `Palabras restantes: ${palabras.length}`;
}

// Inicializar el tablero
function inicializarTablero() {
    tablero = Array.from({ length: filas }, () => Array(columnas).fill(""));
}

// Insertar palabras en la sopa de letras
function colocarPalabras() {
    palabras.forEach(palabra => {
        let colocada = false;
        while (!colocada) {
            let fila = Math.floor(Math.random() * filas);
            let columna = Math.floor(Math.random() * columnas);
            let direccion = Math.random() > 0.5 ? "H" : "V"; // Horizontal o Vertical

            if (puedeColocarse(palabra, fila, columna, direccion)) {
                for (let i = 0; i < palabra.length; i++) {
                    if (direccion === "H") tablero[fila][columna + i] = palabra[i];
                    else tablero[fila + i][columna] = palabra[i];
                }
                colocada = true;
            }
        }
    });
}

// Verificar si una palabra cabe en la posición elegida
function puedeColocarse(palabra, fila, columna, direccion) {
    if (direccion === "H" && columna + palabra.length > columnas) return false;
    if (direccion === "V" && fila + palabra.length > filas) return false;
    
    for (let i = 0; i < palabra.length; i++) {
        if (direccion === "H" && tablero[fila][columna + i] !== "") return false;
        if (direccion === "V" && tablero[fila + i][columna] !== "") return false;
    }
    return true;
}

// Rellenar espacios vacíos con letras aleatorias
function rellenarTablero() {
    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            if (tablero[i][j] === "") {
                tablero[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
}

// Generar el tablero en el DOM
function renderizarTablero() {
    const contenedor = document.getElementById("tablero");
    contenedor.innerHTML = "";
    for (let i = 0; i < filas; i++) {
        let fila = document.createElement("div");
        fila.classList.add("fila");
        for (let j = 0; j < columnas; j++) {
            let celda = document.createElement("div");
            celda.classList.add("celda");
            celda.textContent = tablero[i][j];
            fila.appendChild(celda);
        }
        contenedor.appendChild(fila);
    }
}

// Iniciar el cronómetro
function iniciarCronometro() {
    cronometro = setInterval(() => {
        tiempo++;
        document.getElementById("tiempo").textContent = `Tiempo: ${tiempo} s`;
    }, 1000);
}

// Reiniciar el juego
function reiniciarJuego() {
    clearInterval(cronometro);
    tiempo = 0;
    palabrasEncontradas = 0;
    document.getElementById("tiempo").textContent = "Tiempo: 0 s";
    seleccionarPalabras();
    inicializarTablero();
    colocarPalabras();
    rellenarTablero();
    renderizarTablero();
    iniciarCronometro();
}

// Inicialización del juego
window.onload = function () {
    seleccionarPalabras();
    inicializarTablero();
    colocarPalabras();
    rellenarTablero();
    renderizarTablero();
    iniciarCronometro();
    document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
};