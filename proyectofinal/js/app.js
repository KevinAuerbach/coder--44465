//DOM
const carritoBtn = document.getElementById("carrito");
const modal = document.getElementById("modal_overlay");
const cerrarModal = document.querySelector(".modal_close");
const vaciarCarrito = document.getElementById("vaciar_carrito");
const modalContainer = document.querySelector(".modal_container");
const span = document.querySelector(".contador");
const cards = document.querySelector(".cards");
const carritoCards = document.getElementById("cards_carrito");
const precioFinal = document.querySelector(".total");
const seachBar = document.querySelector(".search");

//Evento para vaciar el carrito
vaciarCarrito.addEventListener("", () => {
  carrito.length = 0;
  actualizarCarrito();
  localStorage.removeItem("carrito");
  Toastify({
    text: "Se vacio el carrito!",
    className: "toast_red",
    duration: 2500,
  }).showToast();
});

// Search
seachBar.addEventListener("keyup", (e) => {
  let filteredProductos = productos.filter((product) => {
    return product.nombre.match(e.target.value); //* busca en ccada producto, esta searchbar en KEY SENSITIVE
  });
  cards.innerHTML = null; //* Borra todas las cartas
  renderCards(filteredProductos); //* Llama a la funcion render con los productos filtrados
});

//Modal
carritoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("modal_show");
});
cerrarModal.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("modal_show");
});

//Declaracion de variables
let carrito = [];
let productos = [];

//Construccion de objetos
class producto {
  constructor(id, nombre, precio, stock, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.img = img;
  }
  sumarIva() {
    return (this.precio = this.precio * 1), 21;
  }
}

const producto1 = new producto(
  1,
  "camiseta titular",
  15000,
  3,
  "img/camiseta titular.webp",
);
const producto2 = new producto(
  2,
  "camiseta suplente",
  15000,
  4,
  "img/camiseta suplente.webp",
);
const producto3 = new producto(3, "short titular", 9000, 6, "img/short.webp");
const producto4 = new producto(
  4,
  "short suplente",
  9000,
  2,
  "img/short suplente.webp",
);
const producto5 = new producto(
  5,
  "camiseta de arquero",
  15000,
  2,
  "img/camiseta arquero.webp",
);
const producto6 = new producto(6, "gorra", 3000, 3, "img/gorra.webp");
const producto7 = new producto(7, "medias titular", 3500, 4, "img/medias.webp");
const producto8 = new producto(
  8,
  "medias suplente",
  3500,
  2,
  "img/medias sup.webp",
);
const producto9 = new producto(
  9,
  "short arquero",
  9500,
  5,
  "img/short arquero.webp",
);
productos.push(
  producto1,
  producto2,
  producto3,
  producto4,
  producto5,
  producto6,
  producto7,
  producto8,
  producto9,
);

//Obtengo el localstorage al inciar
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

//Funciones
function agregarAlCarrito(producto) {
  let buscarProducto = carrito.find((item) => item.id === producto.id);
  if (buscarProducto !== undefined) {
    buscarProducto.precio = buscarProducto.precio + producto.precio;
    buscarProducto.cantidad = buscarProducto.cantidad + 1;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  carritoCards.innerHTML = "";
  carrito.forEach((producto) => {
    const { id, nombre, precio, img } = producto;
    let div = document.createElement("div");
    div.innerHTML = `
      <img src="${img}">
      <h3>${nombre}</h3>
      <p>Cantidad:${producto.cantidad}</p>
      <p>$${precio}</p>
      <button id="eliminar${id}" class="btn eliminar">Eliminar</button>
      `;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    carritoCards.append(div);
    div.className = "card";

    const btnEliminar = document.getElementById(`eliminar${producto.id}`);
    btnEliminar.addEventListener("click", (e) => eliminarDelCarrito(producto));
  });
  span.innerHTML = carrito.length;
  precioFinal.innerHTML = carrito.reduce((acc, prod) => acc + prod.precio, 0);
}

function eliminarDelCarrito(producto) {
  let buscado = carrito.find((prod) => prod.id === producto.id);
  let indice = carrito.indexOf(buscado);
  carrito.splice(indice, 1);
  actualizarCarrito();
  Toastify({
    text: "Se elimino el producto del carrito!",
    className: "toast_red",
    duration: 2500,
  }).showToast();
}

//DOM renderizo productos
function renderCards(productos) {
  //* Le llegan los productos por parametros
  productos.forEach(({ id, nombre, precio, img }) => {
    //* destructuring dentro de la arrow
    let div = document.createElement("div");
    div.innerHTML = `
  <img src="${img}">
  <h3>${nombre}</h3>
  <p>$${precio}</p>
  <button id=${id} class="btn">Agregar al Carrito</button>
  `;
    div.className = "card";
    cards.append(div);

    const boton = document.getElementById(id);
    boton.addEventListener("click", (e) => {
      agregarAlCarrito({ id, nombre, precio, img });
      Toastify({
        text: "Se agrego el producto al carrito!",
        className: "toast",
        duration: 2500,
      }).showToast();
    });
  });
}

renderCards(productos); //* LLamo en el inicio con los productos
