const AIRTABLE_TOKEN = "pattE62aK3OsLsuoN.f371ce5fbfbb56192a6328384b9db1f5cbb2a3cb5568bb9b9320e37843144249";
const BASE_ID = "appbj6ACXLPcX3n5Q";
const TABLE_NAME = "Products";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

let productos = [];

// func get products
async function obtenerProductos() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        if (data.records) {
            return data.records;
        } else {
            throw new Error('No se pudieron obtener los productos');
        }
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

function normalizacion(response) {
    try {
        return response.map(producto => ({
            airtableId: producto.id,
            nombre: producto.fields.Name,
            imagen: producto.fields.Img || "",
            precio: producto.fields.Price,
            categoria: producto.fields.Category,
            id: producto.fields.ID,
            cuotas: producto.fields.Cuota,
            valorCuota: producto.fields.Valor,
            genero: producto.fields.Genero
        }));
    } catch (error) {
        console.error("Error al normalizar los productos:", error);
        return [];
    }
}

function renderizarProductos(arrayProductos) {
    const contenedor = document.querySelector('.sect__products');
    contenedor.innerHTML = '';
    
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

async function cargarProductos() {
    const response = await obtenerProductos();
    productos = normalizacion(response);
    console.log('Productos cargados:', productos);
    renderizarProductos(productos);
}

cargarProductos();

// ============================================
//  FILTROS
// ============================================

const categLink = document.querySelectorAll('aside ul li a');
const btn_tosee = document.querySelector('aside div #btn-ver-todos');

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


// filter gen
const li_h = document.querySelector('aside li #link-hombres');
const li_m = document.querySelector('aside li #link-mujeres');


categLink.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        categLink.forEach(l => l.style.color = "#7777");
        link.style.color = "white";
        const categClick = link.innerHTML;
    
        const productosFiltrs = productos.filter(producto => {
            return producto.genero === categClick;
        });
            
        const contenedor = document.querySelector('.sect__products');
        contenedor.innerHTML = '';
        
        renderizarProductos(productosFiltrs);
    });
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