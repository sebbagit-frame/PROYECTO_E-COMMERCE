const USUARIO_ADMIN = "admin";
const PASSWORD_ADMIN = "1234";

const formLogin = document.getElementById('form-login');
const inputUsuario = document.getElementById('usuario');
const inputPassword = document.getElementById('password');
const mensajeError = document.getElementById('mensaje-error');

formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usuario = inputUsuario.value;
    const password = inputPassword.value;
    
    // verficacion usuario y contraseña
    if (usuario === USUARIO_ADMIN && password === PASSWORD_ADMIN) {
        localStorage.setItem(usuario, password);
        
        window.location.href = 'admin.html';
    } else {
        mensajeError.style.display = 'block';
        
        setTimeout(() => {
            mensajeError.style.display = 'none';
        }, 3000);
    }
});