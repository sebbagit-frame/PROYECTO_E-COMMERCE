// btns para sumar y restar producs
const btnMinus = document.querySelector('.btn-cantidad[aria-label="Disminuir cantidad"]');
const btnMas = document.querySelector('.btn-cantidad[aria-label="Aumentar cantidad"]');
const inputCant = document.querySelector(".input-cantidad");
const precioTotal = document.querySelector(".precio-subtotal"); 

const precioUnitario = 42300;

// actualizar precio
function actualizarPrecio() {
    let cantidad = parseInt(inputCant.value);
    let total = precioUnitario * cantidad;
    precioTotal.textContent = '$' + total.toLocaleString('es-AR');
}

// (boton +)
btnMas.addEventListener("click", function(){
    let cantidad = parseInt(inputCant.value);
    cantidad++;
    inputCant.value = cantidad;
    actualizarPrecio();
});

// (boton -)
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


// carrito desde el local
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedorProductos = document.querySelector('.sect__cart-items');

// mostrar productos
function mostrarProductos() {
    contenedorProductos.innerHTML = '';
    
    if (carrito.length === 0) {
        contenedorProductos.innerHTML = '<p>Tu carrito está vacío</p>';
        return;
    }
    
    carrito.forEach((producto, index) => {
        
        const productoHTML = `
            <div class="cont__cart-item">
                <img src="${producto.imagen}" class="product_buzo-clothe" alt="${producto.nombre}">
                
                <section class="sect__text-descrip">
                    <h2>${producto.nombre}</h2>
                    <p>Talle: ${producto.talle}</p>
                </section>

                <div class="container-flex-price-cant-delete">
                    <section class="sect__item-info">
                        <p class="precio-producto">$${producto.precio.toLocaleString('es-AR')}</p>
                        
                        <div class="cont__item-actions">
                            <div class="cantidad-control">
                                <button class="btn-cantidad" onclick="restarCantidad(${index})">-</button>
                                <input type="number" class="input-cantidad" value="${producto.cantidad}" readonly>
                                <button class="btn-cantidad" onclick="sumarCantidad(${index})">+</button>
                            </div>
                        </div>
                    </section>

                    <section class="sect__icon-delete">
                        <button class="btn-delete-product" onclick="eliminarProducto(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </section>
                </div>
            </div>
        `;
        
        contenedorProductos.innerHTML += productoHTML;

        if (carrito.length === 0) {
        contenedorProductos.innerHTML = '<p>Tu carrito está vacío</p>';
        
        document.querySelector('.precio-subtotal span').textContent = '$0';
        document.querySelector('.precio-total span').textContent = '$2.000';
        
        return;
    }
    });
    
    calcularTotal();
}

// (+) cant
function sumarCantidad(index) {
    carrito[index].cantidad = carrito[index].cantidad + 1;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductos();
}

// (-) cant
function restarCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad = carrito[index].cantidad - 1;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarProductos();
    }
}

// eliminar producto
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductos();
}

// calcular total
function calcularTotal() {
    let subtotal = 0;
    
    carrito.forEach(producto => {
        subtotal = subtotal + (producto.precio * producto.cantidad);
    });
    
    const envio = 2000;
    const total = subtotal + envio;
    
    // actualización html
    document.querySelector('.precio-subtotal span').textContent = '$' + subtotal.toLocaleString('es-AR');
    document.querySelector('.precio-total span').textContent = '$' + total.toLocaleString('es-AR');
}

mostrarProductos();


// func: actualizar el contador del carrito
function actualizarContador() {
    let totalProductos = 0;
    
    carrito.forEach(producto => {
        totalProductos = totalProductos + producto.cantidad;
    });
    
    const contadorExistente = document.querySelector('.carrito-contador');
    
    if (contadorExistente) {
        contadorExistente.remove();
    }
    
    if (totalProductos > 0) {
        const contaierCarrito = document.querySelector('.contaier__bi-cart4');
        const contador = document.createElement('span');
        contador.className = 'carrito-contador';
        contador.textContent = totalProductos;
        contador.style.cssText = `
            position: absolute;
            top: 20px;
            right: 105px;
            background-color: #ff0000;
            color: white;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
        `;
        contaierCarrito.appendChild(contador);
    }
}


// en la función sumarCantidad
function sumarCantidad(index) {
    carrito[index].cantidad = carrito[index].cantidad + 1;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductos();
    actualizarContador(); 
}

// en la función restarCantidad
function restarCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad = carrito[index].cantidad - 1;
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarProductos();
        actualizarContador(); 
    }
}

// en la función eliminarProducto
function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarProductos();
    actualizarContador(); 
}

mostrarProductos();
actualizarContador(); 