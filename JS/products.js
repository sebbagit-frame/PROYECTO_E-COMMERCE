// ============================================
//  PRODUCTOS - ESTRUCTURA DE DATOS
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
}

renderizarProductos(productos);

// ============================================
//  ICÓNO RESPONSIVE
// ============================================

const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector(".menu-list");

menuIcon.addEventListener('click', () => {
    menuList.classList.toggle('menu-active');
});

