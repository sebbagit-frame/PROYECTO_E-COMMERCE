// BOTONES SUMAR Y RESTAR PRODUCTO
const btnMinus = document.querySelector('.btn-cantidad[aria-label="Disminuir cantidad"]');
const btnMas = document.querySelector('.btn-cantidad[aria-label="Aumentar cantidad"]');
const inputCant = document.querySelector(".input-cantidad");
const precioTotal = document.querySelector(".precio-subtotal"); 

const precioUnitario = 42300;

// FUNCIÓN PARA ACTUALIZAR PRECIO
function actualizarPrecio() {
    let cantidad = parseInt(inputCant.value);
    let total = precioUnitario * cantidad;
    precioTotal.textContent = '$' + total.toLocaleString('es-AR');
}

// EVENTO BOTÓN MÁS (UNA SOLA VEZ)
btnMas.addEventListener("click", function(){
    let cantidad = parseInt(inputCant.value);
    cantidad++;
    inputCant.value = cantidad;
    actualizarPrecio();
});

// EVENTO BOTÓN MENOS (UNA SOLA VEZ)
btnMinus.addEventListener("click", function() {
    let cantidad = parseInt(inputCant.value);
    if (cantidad > 1) {
        cantidad--;
        inputCant.value = cantidad;
        actualizarPrecio();
    }
});




let parrafo = document.querySelector("#miParrafo");

function cambiarTexto() {
    parrafo.textContent = "TEXTO cambiado"
    parrafo.style.background = "none"
    parrafo.style.color = null
}

function cambiarFondo() {
    parrafo.textContent = "FONDO cambiado"
    parrafo.style.background = "red"
    parrafo.style.color = "white";
}

function cambiarColor() {
    parrafo.textContent = "COLOR cambiado"
    parrafo.style.color = "blue"
    parrafo.style.background = "none"
}

function cambiarColorFondo() {
    parrafo.textContent = "COLOR y FONDO cambiado";
    parrafo.style.color = "blue"
    parrafo.style.background = "red"
}