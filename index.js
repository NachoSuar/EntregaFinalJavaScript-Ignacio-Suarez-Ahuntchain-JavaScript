const ListaProductos = [];


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
        img: 'imagenes/Perfil.jpg' 
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
        <img src="${producto.img ? producto.img : ""}" alt="">
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
        Toastify({
            text: "No hay productos en el carrito",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #5cb85c)",
            },
            onClick: function(){}
          }).showToast();
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
    Toastify({
        text: "¡Compra realizada con éxito! Gracias por tu compra.",
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #00b09b, #5cb85c)",
        },
        onClick: function(){}
    }).showToast();
    setTimeout(function () {
        arrayCarrito.length = 0;
        renderizarCarrito();
        totalCarrito();
        localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
        window.location.href = "index.html";
    }, 3000);
}

// Simulador de Pagos

function esperandoElpago(){
    return new Promise((resolve, reject) => {
        const validarPago = Math.random() < 0.5
        setTimeout(() =>{
            if (validarPago){
                resolve({
                    codigo: 200,
                    mensaje: "El pago se realizo correctamente"
                })
            } else {
                reject({
                    codigo: 400,
                    mensaje: "El pago no se pudo realizar"
                })
            }
        }, 3000)
    })
}

esperandoElpago(). then ((mensaje) =>{
    console.log(mensaje)
}).catch((error) =>{    // Evita que por consola figure error al no realizar un pago
    console.log(error)
})

// Función para cargar productos desde un archivo JSON a mi Lista de productos

function cargarProductosDesdeJSON() {
    return fetch("./productos.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON.");
            }
            return response.json();
        });
}

// Llama a la función para cargar productos desde JSON y luego asigna los datos a la Lista de Productos

cargarProductosDesdeJSON()
    .then((productos) => {
        console.log("Productos cargados desde el JSON:", productos);
        ListaProductos.push(...productos);
        rederizarSelect();
    })
    .catch((error) => {
        console.error("Error al cargar productos desde el JSON:", error);
    });
