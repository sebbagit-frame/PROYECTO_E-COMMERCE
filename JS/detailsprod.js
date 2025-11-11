const productoDetalle = {
    id: 1,
    nombre: "Buzo BRUCS",
    precio: 44999,
    imagen: "IMG/models/modelBrucs_marc_frente.jpeg",
    talle: null 
};

const sectDescrip = document.querySelector(".sect-descrip");

const tittleLink = document.createElement('a');
tittleLink.classList.add('a-continue-products');
tittleLink.textContent = "¡Seguir comprando!";
tittleLink.href = "products.html"
tittleLink.title = "Volver a Productos";

sectDescrip.appendChild(tittleLink);




let talleSeleccionado = null;

// func's seleccionar talle
function clickTalle_S() {
    talleSeleccionado = "S";
    talleMarcado();
}

function clickTalle_M() {
    talleSeleccionado = "M";
    talleMarcado();
}

function clickTalle_L() {
    talleSeleccionado = "L";
    talleMarcado();
}

function clickTalle_XL() {
    talleSeleccionado = "XL";
    talleMarcado();
}


function talleMarcado() {
    const botonesTalle = document.querySelectorAll('.btn-sizes');
    botonesTalle.forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
        btn.style.border = 'none';
    });
    
    
    event.target.style.backgroundColor = 'white';
    event.target.style.color = 'black';
}


const btnCarrito = document.querySelector('.btn-carrito');

btnCarrito.addEventListener('click', () => {
    
    if (!talleSeleccionado) {
        alert('Por favor, seleccioná un talle');
        return;
    }
    
    productoDetalle.talle = talleSeleccionado;
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    

    const productoExistente = carrito.find(item => 
        item.id === productoDetalle.id && item.talle === talleSeleccionado
    );
    
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            ...productoDetalle,
            cantidad: 1
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // estilo boton clickeado
    btnCarrito.style.backgroundColor = '#4CAF50';
    btnCarrito.style.color = '#ffff';
    btnCarrito.innerHTML = '¡Agregado al carrito! ✓';
    
    // time al estilo clickeado
    setTimeout(() => {
        btnCarrito.style.backgroundColor = '';
        btnCarrito.style.color = '';
        btnCarrito.innerHTML = 'Agregar al carrito <i class="bi bi-cart4"></i>';
    }, 2000);
    
    console.log(productoDetalle);
    console.log(carrito);
});