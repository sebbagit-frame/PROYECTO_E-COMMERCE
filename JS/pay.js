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





