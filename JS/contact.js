const AIRTABLE_TOKEN = "pat2ku4aYoLPDthCF.e892725e82b2cebbb565c5961a5268870aada40096a1200aeab94d5ba1d5c8eb";
const BASE_ID = "appbj6ACXLPcX3n5Q";
const TABLE_NAME = "Contactos";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

const formulario = document.getElementById('contact-form');
const btnEnviar = document.getElementById('btn-send');



async function enviarContactoAirtable(datosContacto) {
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
                        "fields": datosContacto
                    }
                ]
            })
        });

        const data = await response.json();
        
        if (response.ok == false) {
            console.error('Error de Airtable:', data);
            alert('Error al enviar el mensaje: ' + data.error.message);
            return null;
        }

        console.log('Mensaje enviado correctamente:', data);
        return data.records[0];
    } catch (error) {
        console.error('Error al enviar:', error);
        alert('Hubo un error al enviar tu mensaje. Intenta nuevamente.');
        return null;
    }
}


// EVENTO SUBMIT DEL FORMULARIO

formulario.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('input__name').value;
    const telefono = document.getElementById('input__tel').value;
    const email = document.getElementById('input__email').value;
    const motivo = document.getElementById('pais').value;
    const comentarios = document.getElementById('comentarios').value;
    const acepto = document.getElementById('check-aceptar').checked;
    
    // checkbox de términos y condiciones
    if (acepto == false) {
        console.log('Debes aceptar los términos y condiciones');
        return;
    }
    
    // validar campos obligatorios
    if (nombre == '' || email == '' || motivo == '' || comentarios == '') {
        console.log('Por favor completa todos los campos obligatorios');
        return;
    }
    
    // desactivar botón y cambiar texto
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'Enviando...';
    
    const datosContacto = {
        "Nombre": nombre,
        "Telefono": telefono,
        "Email": email,
        "Motivo": motivo,
        "Mensaje": comentarios
    };
    
    console.log('Enviando datos:', datosContacto);
    
    const resultado = await enviarContactoAirtable(datosContacto);
    
    if (resultado) {
        mostrarMensajeExito();
    } else {
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'Enviar';
    }
});


// FUNCIÓN PARA MOSTRAR MENSAJE DE ÉXITO

function mostrarMensajeExito() {
    const seccionForm = document.querySelector('.sect-formGLOBAL');
    seccionForm.innerHTML = `
        <div class="mensaje-exito-contacto">
            <i class="bi bi-check-circle-fill"></i>
            <h2>¡Mensaje Enviado!</h2>
            <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
            <a href="index.html" class="btn-volver-inicio">Volver al inicio</a>
        </div>
    `;
}


// MENÚ RESPONSIVE
const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector(".menu-list");

menuIcon.addEventListener('click', function() {
    menuList.classList.toggle('menu-active');
});


// CONTADOR DEL CARRITO

function actualizarContGlobal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    let totalProductos = 0;
    carrito.forEach(function(producto) {
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