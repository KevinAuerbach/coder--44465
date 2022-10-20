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
vaciarCarrito.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
  localStorage.removeItem("carrito");
  Toastify({
    text: "Se vacio el carrito!",
    className: "toast_red",
    duration: 2500,
  }).showToast();
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
    const {
      id,
      nombre,
      precio,
      img
    } = producto;
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
const renderCards = async (productosFiltrados) => {
  if (!productosFiltrados) {
    try {
      let response = await fetch("json/productos.json");
      let data = await response.json();
      //* Le llegan los productos por parametros
      data.forEach(({
        id,
        nombre,
        precio,
        img
      }) => {
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
          agregarAlCarrito({
            id,
            nombre,
            precio,
            img,
          });
          Toastify({
            text: "Se agrego el producto al carrito!",
            className: "toast",
            duration: 2500,
          }).showToast();
        });
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    productosFiltrados.forEach(({
      id,
      nombre,
      precio,
      img
    }) => {
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
        agregarAlCarrito({
          id,
          nombre,
          precio,
          img,
        });
        Toastify({
          text: "Se agrego el producto al carrito!",
          className: "toast",
          duration: 2500,
        }).showToast();
      });
    });
  }
};

renderCards(); //* LLamo en el inicio con los productos

// Search
const buscador = async () => {
  try {
    let response = await fetch("json/productos.json");
    let data = await response.json();
    seachBar.addEventListener("keyup", (e) => {
      let filteredProductos = data.filter((product) => {
        return product.nombre.toLowerCase().match(e.target.value.toLowerCase()); //* busca en ccada producto, esta searchbar en KEY SENSITIVE
      });
      cards.innerHTML = ""; //* Borra todas las cartas
      renderCards(filteredProductos); //* Llama a la funcion render con los productos filtrados
    });
  } catch (error) {
    console.log(error);
  }
};

buscador();