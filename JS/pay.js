const AIRTABLE_TOKEN = "patVP3N7vWgbYK2Rd.74b61e3c546bd16c69980ae469d8b350cf834ae5ba1e624e93f3b2a796c0f4f4";
const BASE_ID = "appbj6ACXLPcX3n5Q";
const TABLE_NAME = "Pedidos";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;


function mostrarCamposPago() {
    const selectorPago = document.getElementById('metodo-pago');
    const camposTarjeta = document.getElementById('campos-tarjeta');
    const camposTransferencia = document.getElementById('campos-transferencia');
    
    const seleccion = selectorPago.value;
    
    // ocultar ambos contenedores inicialmente
    camposTarjeta.style.display = 'none';
    camposTransferencia.style.display = 'none';
    
    // mostrar el contenedor correspondiente con if
    if (seleccion === 'tarjeta') {
        camposTarjeta.style.display = 'block';
    } else if (seleccion === 'transferencia') {
        camposTransferencia.style.display = 'block';
    }
}


const formFacturacion = document.querySelector('.checkout__form');
const formPago = document.getElementById('form-pago');
const btnSubmit = document.getElementById('btn-confirmar-compra'); 

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function calcularTotal() {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}


// FUNCIÓN PARA CREAR PEDIDO EN AIRTABLE

async function crearPedidoAirtable(datosPedido) {
    console.log('=== INICIANDO ENVÍO A AIRTABLE ===');
    console.log('URL:', API_URL);
    console.log('Datos a enviar:', datosPedido);
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "records": [
                    {
                        "fields": datosPedido
                    }
                ]
            })
        });

        console.log('Status de respuesta:', response.status);

        const data = await response.json();
        
        if (response.ok == false) {
            console.error('=== ERROR DE AIRTABLE ===');
            console.error('Código:', response.status);
            console.error('Respuesta completa:', data);
            
            if (data.error) {
                console.error('Mensaje de error:', data.error.message);
                console.error('Tipo de error:', data.error.type);
                alert('Error de Airtable: ' + data.error.message);
            }
            
            return null;
        }

        console.log('=== PEDIDO CREADO CON ÉXITO ===');
        console.log('Respuesta de Airtable:', data);
        return data.records[0];
    } catch (error) {
        console.error('=== ERROR EN crearPedidoAirtable ===');
        console.error('Tipo de error:', error.name);
        console.error('Mensaje:', error.message);
        console.error('Error completo:', error);
        throw error; 
    }
}





// submit del formulario de pago

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();

    // validar método de pago seleccionado
    const metodoPago = document.getElementById('metodo-pago').value;
    if (metodoPago == '') {
        alert('Por favor, selecciona un método de pago');
        return;
    }

    // validar campos de facturación
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const provincia = document.getElementById('provincia').value;
    const codigo = document.getElementById('codigo').value;

    if (nombre == '' || email == '' || direccion == '' || provincia == '' || codigo == '') {
        alert('Por favor, completa todos los campos obligatorios');
        return;
    }

    // validar campos de pago según el método seleccionado
    if (metodoPago === 'tarjeta') {
        const numeroTarjeta = document.getElementById('numero-tarjeta').value;
        const vencimiento = document.getElementById('vencimiento').value;
        const ccv = document.getElementById('ccv').value;

        if (numeroTarjeta == '' || vencimiento == '' || ccv == '') {
            alert('Por favor, completa todos los datos de la tarjeta');
            return;
        }
    }

    // desactivar el botón para evitar múltiples envíos
    btnSubmit.disabled = true;
    btnSubmit.textContent = "Procesando pedido...";
    
    // capturar datos de ambos formularios
    const facturacionData = new FormData(formFacturacion);
    const pagoData = new FormData(formPago);
    
    // crear el Detalle de la Compra
    const detalleCompra = carrito.map(p => 
        `${p.cantidad}x ${p.nombre} (Talle: ${p.talle}) - $${p.precio.toLocaleString('es-AR')}`
    ).join('; ');
    
    // crear el objeto para enviar a Airtable
    const pedidoAirtable = {
        "NombreCliente": nombre,
        "Dirección": direccion,
        "Provincia": provincia,
        "CP": Number(codigo),
        "Total": calcularTotal(),
        "MP": metodoPago,
        "Detalle": detalleCompra,
    };

    console.log('==== VERIFICACIÓN ANTES DE ENVIAR ====');
    console.log('Nombre del Cliente:', nombre);
    console.log('Dirección:', direccion);
    console.log('Provincia:', provincia);
    console.log('CP:', codigo);
    console.log('Total:', calcularTotal());
    console.log('MP:', metodoPago);
    console.log('Detalle:', detalleCompra);
    console.log('Objeto completo:', pedidoAirtable);

    console.log('Datos a enviar:', pedidoAirtable);

    // enviar a Airtable
    try {
        const resultado = await crearPedidoAirtable(pedidoAirtable);
        console.log('Pedido creado exitosamente:', resultado);
        finalizarExito();
    } catch (error) {
        console.error('Error al procesar el pedido:', error);
        btnSubmit.disabled = false;
        btnSubmit.textContent = "Confirmar compra";
    }
});


// FORMATEAR NÚMERO DE TARJETA

// agregar espacios cada 4 dígitos en el número de tarjeta
const inputTarjeta = document.getElementById('numero-tarjeta');
if (inputTarjeta) {
    inputTarjeta.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\s/g, '');
        valor = valor.replace(/\D/g, '');
        
        // 16 dígitos máximo
        if (valor.length > 16) {
            valor = valor.substring(0, 16);
        }
        
        // agregar espacios cada 4 dígitos
        let valorFormateado = '';
        for (let i = 0; i < valor.length; i++) {
            if (i > 0 && i % 4 == 0) {
                valorFormateado = valorFormateado + ' ';
            }
            valorFormateado = valorFormateado + valor[i];
        }
        
        e.target.value = valorFormateado;
    });
}


// Formatear fecha de vencimiento (MM/AA)
const inputVencimiento = document.getElementById('vencimiento');
if (inputVencimiento) {
    inputVencimiento.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        // maximo 4 dígitos
        if (valor.length > 4) {
            valor = valor.substring(0, 4);
        }
        
        // agregar barra después de 2 dígitos
        if (valor.length >= 2) {
            valor = valor.substring(0, 2) + '/' + valor.substring(2);
        }
        
        e.target.value = valor;
    });
}

// formatear CCV (3 dígitos)
const inputCCV = document.getElementById('ccv');
if (inputCCV) {
    inputCCV.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        
        // máximo 3 dígitos
        if (valor.length > 3) {
            valor = valor.substring(0, 3);
        }
        
        e.target.value = valor;
    });
}


// FUNCIÓN FINALIZAR ÉXITO

function finalizarExito() {
    // limpia el carrito
    localStorage.removeItem('carrito');
    
    // mensaje de éxito
    const mainContent = document.querySelector('main'); 
    mainContent.innerHTML = `
        <div style="text-align: center; padding: 50px;">
            <i class="bi bi-check-circle-fill" style="font-size: 3rem; color: #4CAF50;"></i>
            <h1 style="color: #4CAF50;">¡Compra Realizada con Éxito!</h1>
            <p>Tu pedido ha sido registrado. Recibirás la confirmación pronto.</p>
            <a href="products.html" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                Volver a la tienda
            </a>
        </div>
    `;
    
    // actualizar el contador global del carrito
    if (typeof actualizarContGlobal === 'function') {
        actualizarContGlobal();
    }
}








// MENÚ RESPONSIVE

const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector(".menu-list");

menuIcon.addEventListener('click', () => {
    menuList.classList.toggle('menu-active');
});


// ACTUALIZAR CONTADOR DEL CARRITO

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