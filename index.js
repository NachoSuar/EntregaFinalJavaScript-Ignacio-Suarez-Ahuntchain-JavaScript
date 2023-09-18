const ListaProductos = [
    {
        id: 1,
        nombre: "Avene",
        precio: 1800,
        imagen: "imagenes/Avene.jpg",
    },
    {
        id: 2,
        nombre: "Loreal",
        precio: 2000,
        imagen: "imagenes/Loreal.jpg",
    },
    {
        id: 3,
        nombre: "Hydroboost",
        precio: 3200,
        imagen: "imagenes/Hydroboost.jpg",
    },
    {
        id: 4,
        nombre: "Pond",
        precio: 3800,
        imagen: "imagenes/Pond.jpg",
    },
];


const formulario = document.querySelector("#formulario");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const btnAddProduct = document.querySelector("#btnAddProduct");
const productSelect = document.querySelector("#productSelect");
const sellProduct = document.querySelector("#sellProduct");
const productList = document.querySelector("#productList");
const total = document.querySelector("#total");
const arrayCarrito = [];

// Agrega un producto Nuevo

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const producto = {
        id: Date.now(),
        nombre: name.value,
        precio: price.value,
        description: description.value,
        imagen: 'imagenes/Perfil.jpg' 
    };

    ListaProductos.push(producto);
    rederizarSelect();
    renderizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
});

// Renderiza un producto seleccionado

function rederizarSelect() {
    productSelect.innerHTML =
        '<option value="" disabled selected>Seleccione un producto</option>';
    ListaProductos.forEach((producto) => {
        productSelect.innerHTML += `<option value="${producto.id}">${producto.nombre}</option>`;
    });
}

document.addEventListener("click", (e) => {
    const btnBorrar = document.querySelectorAll(".btnBorrar");
    btnBorrar.forEach((btn) => {
        if (e.target == btn) {
            const id = e.target.id;
            borrarProducto(id)
            totalCarrito()
        }
    });
});


// Vender un producto

sellProduct.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = productSelect.value;
    const producto = buscarProducto(id, ListaProductos);
    agregarProducto(producto);
    renderizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
});

function buscarProducto(id, array) {
    const producto = array.find((producto) => producto.id == id);
    return producto;
}

// Agrega productos 

function agregarProducto(producto) {
    if (producto) {
        const productoEncontrado = buscarProducto(producto.id, arrayCarrito);
        if (productoEncontrado) {
            productoEncontrado.cantidad++;
            console.log(arrayCarrito);
        } else {
            arrayCarrito.push({
                ...producto,
                cantidad: 1,
            });

        }
        renderizarCarrito();
        totalCarrito()
        localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
    }
}

// Renderiza el carrito actual

function renderizarCarrito() {
    productList.innerHTML = "";
    arrayCarrito.forEach((producto) => {
        productList.innerHTML += `
        <div class="card">
        <img src="${producto.imagen ? producto.imagen : "No hay"}" alt="">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre ? producto.nombre : "No hay"}</h5>
                <p class="card-text">${producto.precio ? producto.precio : "No hay"}</p>
                <p class="card-text">${producto.cantidad ? producto.cantidad : 0}</p>
                <button class="btn btn-danger btnBorrar" id="${producto.id}">Eliminar</button>
            </div>
        </div>
        `;
    });
}

// Borra los productos seleccionados

function borrarProducto(id) {
    const producto = buscarProducto(id, arrayCarrito);
    if (producto.cantidad > 1) {
        producto.cantidad--;
    } else {
        const index = arrayCarrito.indexOf(producto);
        arrayCarrito.splice(index, 1);
    }
    renderizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
}

document.addEventListener("click", (e) => {
    const btnBorrar = document.querySelectorAll(".btnBorrar");
    btnBorrar.forEach((btn) => {
        if (e.target == btn) {
            const id = e.target.id;
            borrarProducto(id)
            totalCarrito()
        }
    });
});

// Total del carrito

function totalCarrito() {
    const totalFinal = arrayCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
    total.innerHTML = totalFinal
}

document.addEventListener("DOMContentLoaded", () => {
    rederizarSelect();
    const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || []
    if (carritoStorage.length > 0) {
        carritoStorage.forEach(producto => {
            arrayCarrito.push(producto)
        })
        renderizarCarrito()
        totalCarrito()
    } else {
        alert("No hay productos en el carrito")
    }

});

const concretarCompraButton = document.querySelector("#concretarCompra");
concretarCompraButton.addEventListener("click", () => {
    if (arrayCarrito.length === 0) {
        alert("No hay artículos seleccionados");
    } else {
        concretarCompra();
    }
});

//funcion para Finalizar Compra

function concretarCompra() {
    alert("¡Compra realizada con éxito! Gracias por tu compra.");
    arrayCarrito.length = 0;
    renderizarCarrito();
    totalCarrito();
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
    window.location.href = "index.html";
}
