// Credenciales (usuario y contraseña)
const USUARIO_ADMIN = "admin";
const PASSWORD_ADMIN = "1234";

// Seleccionar elementos
const formLogin = document.getElementById('form-login');
const inputUsuario = document.getElementById('usuario');
const inputPassword = document.getElementById('password');
const mensajeError = document.getElementById('mensaje-error');

// Evento submit del formulario
formLogin.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que recargue la página
    
    // Obtener valores de los inputs
    const usuario = inputUsuario.value;
    const password = inputPassword.value;
    
    // Verificar credenciales
    if (usuario === USUARIO_ADMIN && password === PASSWORD_ADMIN) {
        // Login correcto
        localStorage.setItem('adminLogueado', 'true');
        
        // Redirigir a la página de admin
        window.location.href = 'admin.html';
    } else {
        // Login incorrecto
        mensajeError.style.display = 'block';
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
            mensajeError.style.display = 'none';
        }, 3000);
    }
});