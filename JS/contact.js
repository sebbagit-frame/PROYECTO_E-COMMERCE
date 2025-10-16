const colorModeButton = document.querySelector("#btn-changec");
const main = document.querySelector(".main");

colorModeButton.addEventListener("click", changeColor);


function changeColor() {
    main.classList.toggle("light-mode");
}


const tituloC = document.querySelector(".tittle__contact h1");
tituloC.innerHTML = "Tittle Contact";



const alertaForm = document.querySelector("#contact-form");
const alertaInput = document.querySelector("#input__name");

console.log(alertaForm);
console.log(alertaInput);
