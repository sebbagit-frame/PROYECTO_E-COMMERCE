                    // BOTONES SUMAR Y RESTAR PRODUCTO
const btnMinus = document.querySelector('.btn-cantidad[aria-label="Disminuir cantidad"]');
const btnMas = document.querySelector('.btn-cantidad[aria-label="Aumentar cantidad"]');
const inputCant = document.querySelector(".input-cantidad");

btnMas.addEventListener("click", function(){
    let cantidad = parseInt(inputCant.value);
    cantidad++;
    inputCant.value = cantidad
});

btnMinus.addEventListener("click", function() {
    let cantidad = parseInt(inputCant.value);
    if (cantidad > 1) {
        cantidad --;
        inputCant.value = cantidad;
    }
});