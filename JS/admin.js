const AIRTABLE_TOKEN = "pattE62aK3OsLsuoN.f371ce5fbfbb56192a6328384b9db1f5cbb2a3cb5568bb9b9320e37843144249";
const BASE_ID = "appbj6ACXLPcX3n5Q";
const TABLE_NAME = "Products";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;


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
        mostrarMensaje('ERROR AL CARGAR PRODUCTOS', 'error');
        return [];
    }
}

// crear product
async function crearProducto(producto) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: producto
            })
        });

        const data = await response.json();
        
        if (data.id) {
            mostrarMensaje('PRODUCTO AGREGADO EXITOSAMENTE', 'success');
            return data;
        } else {
            throw new Error('Error al crear producto');
        }
    } catch (error) {
        console.error('Error al crear producto:', error);
        mostrarMensaje('ERROR AL AGREGAR PRODUCTO', 'error');
        return null;
    }
}






// ============================================
// func dom
// ============================================

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.className = `mensaje ${tipo}`;
    mensaje.textContent = texto;
    mensaje.style.display = 'block';
    
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 4000);
}

function renderizarProductos(productos) {
    const grid = document.getElementById('productosGrid');
    const loading = document.getElementById('loading');
    
    loading.style.display = 'none';
    
    if (productos.length === 0) {
        grid.innerHTML = '<p style="text-align: center; padding: 50px; color: #9a9a9a;">NO HAY PRODUCTOS DISPONIBLES</p>';
        return;
    }

    grid.innerHTML = productos.map(producto => {
        const fields = producto.fields;
        return `
            <div class="producto-card">
                <img src="${fields.Img}" alt="${fields.Name}">
                <h3>${fields.Name}</h3>
                <p class="precio">$${fields.Price ? fields.Price.toLocaleString('es-AR') : '0'}</p>
                <div class="info">
                    <span><i class="bi bi-tag-fill"></i> ${fields.Category || 'Sin categoría'}</span>
                    <span><i class="bi bi-person-fill"></i> ${fields.Genero || 'N/A'}</span>
                </div>
                <div class="producto-actions">
                    <button class="btn btn-edit" onclick="abrirModalEditar('${producto.id}', '${fields.Name}', ${fields.Price}, '${fields.Category}', '${fields.Genero}', '${fields.Img}')">
                        <i class="bi bi-pencil-fill"></i> EDITAR
                    </button>
                    <button class="btn btn-danger" onclick="eliminarProducto('${producto.id}')">
                        <i class="bi bi-trash-fill"></i> ELIMINAR
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

async function cargarProductos() {
    document.getElementById('loading').style.display = 'block';
    const productos = await obtenerProductos();
    renderizarProductos(productos);
    console.log(productos);
    
}

function abrirModalEditar(id, nombre, precio, categoria, genero, imagen) {
    document.getElementById('editId').value = id;
    document.getElementById('editNombre').value = nombre;
    document.getElementById('editPrecio').value = precio;
    document.getElementById('editCategoria').value = categoria;
    document.getElementById('editGenero').value = genero;
    document.getElementById('editImagen').value = imagen;
    
    document.getElementById('modalEditar').classList.add('active');
}

function cerrarModal() {
    document.getElementById('modalEditar').classList.remove('active');
}

async function confirmarEliminar(id, nombre) {
    if (confirm('ESTAS SEGURO DE ELIMINAR "' + nombre + '"?')) {
        const exito = await eliminarProducto(id);
        if (exito) {
            await cargarProductos();
        }
    }
}


// ============================================
// eventos
// ============================================

// tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(tab.dataset.tab).classList.add('active');

        if (tab.dataset.tab === 'productos') {
            cargarProductos();
        }
    });
});

// add form
document.getElementById('formAgregar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const producto = {
        Name: document.getElementById('nombre').value,
        Price: parseFloat(document.getElementById('precio').value),
        Category: document.getElementById('categoria').value,
        Genero: document.getElementById('genero').value,
        Img: document.getElementById('imagen').value
    };

    const resultado = await crearProducto(producto);
    
    if (resultado) {
        e.target.reset();
        document.querySelector('[data-tab="productos"]').click();
    }
});

// form edit
document.getElementById('formEditar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editId').value;
    const producto = {
        Name: document.getElementById('editNombre').value,
        Price: parseFloat(document.getElementById('editPrecio').value),
        Category: document.getElementById('editCategoria').value,
        Genero: document.getElementById('editGenero').value,
        Img: document.getElementById('editImagen').value
    };

    const resultado = await actualizarProducto(id, producto);
    
    if (resultado) {
        cerrarModal();
        await cargarProductos();
    }
});

cargarProductos();