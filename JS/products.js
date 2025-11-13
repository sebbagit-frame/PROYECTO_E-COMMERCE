// ============================================
//  PRODUCTOS
// ============================================

const productos = [

    {
        id: 1,
        nombre: "Buzo de algodón suave con capucha ajustable.",
        precio: 44999,
        categoria: "Buzos",
        genero: "Unisex",
        imagen: "IMG/productos/abrigos/buzoBrucs_ok.png",
        cuotas: 3,
        valorCuota: 14999.66
    },
    {
        id: 2,
        nombre: "Pupera Convoy eslastizado",
        precio: 23200,
        categoria: "Puperas",
        genero: "Mujer",
        imagen: "IMG/productos/puperas/pupera-convoy.png",
        cuotas: 3,
        valorCuota: 7733.33
    },
    {
        id: 3,
        nombre: "Remera clásica de manga corta, 100% algodón.",
        precio: 42300,
        categoria: "Remeras",
        genero: "Unisex",
        imagen: "IMG/productos/remeras/remera_front-brucs.png",
        cuotas: 3,
        valorCuota: 14100
    },
    {
        id: 4,
        nombre: "Zapatillas con suela de goma antideslizante.",
        precio: 40500,
        categoria: "Zapatillas",
        genero: "Unisex",
        imagen: "IMG/productos/zapatillas/zapt-brucs.jpg",
        cuotas: 3,
        valorCuota: 13500
    },
    {
        id: 5,
        nombre: "Buzo Oversize holgado y de corte moderno.",
        precio: 40500,
        categoria: "Buzos",
        genero: "Unisex",
        imagen: "IMG/productos/abrigos/buzo-over-essential_ok.png",
        cuotas: 3,
        valorCuota: 13500 
    },
    {
        id: 6,
        nombre: "Cargo Algodon diseño con bolsillos de gran capacidad",
        precio: 40500,
        categoria: "Pantalones",
        genero: "Unisex",
        imagen: "IMG/productos/pantalones/cargoAlgodon-Brucs.jpg",
        cuotas: 3,
        valorCuota: 13500 
    },
    {
        id: 7,
        nombre: "Gorra con visera curva, ajustable.",
        precio: 31200,
        categoria: "Gorras",
        genero: "Unisex",
        imagen: "IMG/productos/gorras/gorra_brucs.png",
        cuotas: 3,
        valorCuota: 10400
    },
    {
        id: 8,
        nombre: "Buzo Carmel liviano confeccionado en rústico.",
        precio: 44999,
        categoria: "Buzos",
        genero: "Unisex",
        imagen: "IMG/productos/abrigos/buzo-carmel_ok.png",
        cuotas: 3,
        valorCuota: 14999.66
    },
    {
        id: 9,
        nombre: "Pupera confeccionada en algodón con elastano.",
        precio: 23200,
        categoria: "Puperas",
        genero: "Mujer",
        imagen: "IMG/productos/puperas/pupera-mujer-oversize_ok.png",
        cuotas: 3,
        valorCuota: 7733.33
    },
    {
        id: 10,
        nombre: "Cargo con múltiples bolsillos.",
        precio: 40500,
        categoria: "Pantalones",
        genero: "Hombre",
        imagen: "IMG/productos/pantalones/cargoGabardina-Comdecevis.png",
        cuotas: 3,
        valorCuota: 13500
    },
    {
        id: 11,
        nombre: "Remera Nevada confeccionada en jersey nevado ",
        precio: 18300,
        categoria: "Remeras",
        genero: "Hombre",
        imagen: "IMG/productos/remeras/remera-nevada_ok.png",
        cuotas: 3,
        valorCuota: 6100
    },
    {
        id: 12,
        nombre: "Gorra Cap GOOD, ajustable.",
        precio: 31200,
        categoria: "Gorras",
        genero: "Unisex",
        imagen: "IMG/productos/gorras/gorra_cap-good.png",
        cuotas: 3,
        valorCuota: 10400
    }
];


function renderizarProductos(arrayProductos) {
    const contenedor = document.querySelector('.sect__products');
    
    arrayProductos.forEach(producto => {
        
        const productoHTML = `
            <div class="container__img-products">
                <a href="detailsproduct.html">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    
                    <section class="sect__tittle-price-caract__products">
                        <p class="text-name__product"><strong>${producto.nombre}</strong></p>
                        <p class="product-value">$${producto.precio.toLocaleString('es-AR')}</p>
                    </section>

                    <section class="sect-cuotas">
                        <p><strong>${producto.cuotas}</strong> cuotas sin interés de <strong>$${producto.valorCuota.toLocaleString('es-AR')}</strong></p>
                    </section>
                </a>
            </div>
        `;
        
        contenedor.innerHTML += productoHTML;
    });
};

renderizarProductos(productos);



// ============================================
//  FILTROS
// ============================================

const categLink = document.querySelectorAll('aside ul li a');
const selectOrdenar = document.querySelector('aside select');
const btn_tosee = document.querySelector('aside div #btn-ver-todos');

// agregar evento a botón de "ver todos" para cambiar de color


categLink.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        categLink.forEach(l => l.style.color = "#7777");
        link.style.color = "white";
        const categClick = link.innerHTML;
    
        const productosFiltrs = productos.filter(producto => {
            return producto.categoria === categClick;
        });
            
        const contenedor = document.querySelector('.sect__products');
        contenedor.innerHTML = '';
        
        renderizarProductos(productosFiltrs);

    });
});

const btnVerTodos = document.getElementById('btn-ver-todos');

btnVerTodos.addEventListener('click', () => {
    const contenedor = document.querySelector('.sect__products');
    contenedor.innerHTML = '';
    renderizarProductos(productos);
});






// ============================================
//  ICONO RESPONSIVE
// ============================================

const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector(".menu-list");

menuIcon.addEventListener('click', () => {
    menuList.classList.toggle('menu-active');
});



// func global para actualizar el contador -> products - details - carrito
function actualizarContGlobal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
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
        if (contaierCarrito) {
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
}

actualizarContGlobal();