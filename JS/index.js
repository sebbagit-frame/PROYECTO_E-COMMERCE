const contentItem = document.querySelector(".info-item");

const productos = ["Buzo", "Remera", "Gorra", "Pupera", "Zapatillas"];

let lista = document.createElement("ul");
lista.classList.add("lista");

for (producto of productos){
    lista.innerHTML += `<li class="item"> ${producto} </li>`
}

contentItem.append(lista);