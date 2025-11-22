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
            precio: producto.fields.Price || 0,
            categoria: producto.fields.Category || 'Otros',
            id: producto.fields.ID,
            cuotas: producto.fields.Cuota || 0,
            valorCuota: producto.fields.Valor || 0,
            genero: producto.fields.Genero || 'Unisex'
        }));
    } catch (error) {
        console.error("Error al normalizar los productos:", error);
        return [];
    }
}

function renderizarProductos(arrayProductos) {
    const contenedor = document.querySelector('.sect__products');
    contenedor.innerHTML = '';

    const loading = document.getElementById('loading');
    loading.style.display = 'none';
    
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
    document.getElementById('loading').style.display = 'block';
    const response = await obtenerProductos();
    productos = normalizacion(response);
    renderizarProductos(productos);
    // console.log('Productos cargados:', productos);
}

cargarProductos();

// ============================================
//  FILTROS
// ============================================
const categLink = document.querySelectorAll('aside ul:nth-of-type(1) li a'); 

categLink.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const categClick = link.innerHTML.trim().toUpperCase(); 
        
        categLink.forEach(l => l.style.color = "#7777");
        link.style.color = "white";
        
        const productosFiltrs = productos.filter(producto => {
            return producto.categoria && producto.categoria.trim().toUpperCase() === categClick;
        });
            
        renderizarProductos(productosFiltrs);
    });
});

const btnVerTodos = document.getElementById('btn-ver-todos');

btnVerTodos.addEventListener('click', () => {
    const allLinks = document.querySelectorAll('aside ul a'); 
    allLinks.forEach(l => l.style.color = "#7777");
    
    renderizarProductos(productos);
});


// filter gen
const generoLink = document.querySelectorAll('aside ul:nth-of-type(2) li a'); 

generoLink.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const generoClick = link.innerHTML.trim().toUpperCase(); 
        
        generoLink.forEach(l => l.style.color = "#7777");
        link.style.color = "white";

        const productosFiltrs = productos.filter(producto => {
            return producto.genero && producto.genero.trim().toUpperCase() === generoClick;
        });

        renderizarProductos(productosFiltrs);
    });
});



// order for price
const selectOrdenar = document.querySelector('#select-ordenar');

selectOrdenar.addEventListener('change', () => {
    const opcionSelec = selectOrdenar.value;
    let productosOrdenados = [...productos];

    if (opcionSelec === 'precio-asc') {
        productosOrdenados.sort((a, b) => a.precio - b.precio);
    } else if (opcionSelec === 'precio-desc') {
        productosOrdenados.sort((a, b) => b.precio - a.precio);
    }
    renderizarProductos(productosOrdenados);
});


// buscador
const inputBuscar = document.getElementById('input-buscar');

inputBuscar.addEventListener('input', () => {
    const textoBuscar = inputBuscar.value.toLowerCase();
    
    if (textoBuscar === '') {
        productosActuales = productos;
        renderizarProductos(productos);
        actualizarTitulo('Todos los productos');
        return;
    }
    
    const productosFiltrados = productos.filter(producto => {
        return producto.nombre.toLowerCase().includes(textoBuscar);
    });
    
    productosActuales = productosFiltrados;
    renderizarProductos(productosFiltrados);
    actualizarTitulo(`Resultados para: "${inputBuscar.value}"`);
});



// agregando titulo filtro
function actualizarTitulo(texto) {
    const titulo = document.getElementById('titulo-filtro');
    if (titulo) {
        titulo.textContent = texto;
    }
}


// filter for category
categLink.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const categClick = link.innerHTML.trim();
        
        categLink.forEach(l => l.style.color = "#7777");
        link.style.color = "white";
        
        const productosFiltrs = productos.filter(producto => {
            return producto.categoria && producto.categoria.trim().toUpperCase() === categClick.toUpperCase();
        });
        
        productosActuales = productosFiltrs;
        renderizarProductos(productosFiltrs);
        actualizarTitulo(categClick);
    });
});

// btn todos
btnVerTodos.addEventListener('click', () => {
    const allLinks = document.querySelectorAll('aside ul a'); 
    allLinks.forEach(l => l.style.color = "#7777");
    
    selectOrdenar.value = 'relevancia';
    
    productosActuales = [...productos];
    renderizarProductos(productosActuales);
    actualizarTitulo('Todos los productos');
});

// filter for genro
generoLink.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const generoClick = link.innerHTML.trim();
        
        generoLink.forEach(l => l.style.color = "#7777");
        link.style.color = "white";

        const productosFiltrs = productos.filter(producto => {
            return producto.genero && producto.genero.trim().toUpperCase() === generoClick.toUpperCase();
        });

        productosActuales = productosFiltrs;
        renderizarProductos(productosFiltrs);
        actualizarTitulo(`Productos para ${generoClick}`);
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