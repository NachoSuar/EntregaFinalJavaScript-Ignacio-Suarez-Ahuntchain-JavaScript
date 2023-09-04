alert("Bienvenido");
const numero1 = 5000;
const numero2 = 5500;
const numero3 = 3;
const numero4 = 6;
const numero5 = 12;
let productArr = []
let carritoArr =[]
let TrueOrFalse = true;
const dbProdcutos = [
    {
        id: 1,
        name: "Avene",
        price: 800,
    },
    {
        id: 2,
        name: "Hydroboost",
        price: 850,
    },
    {
        id: 3,
        name: "Loreal",
        price: 900,
    },
    {
        id: 4,
        name: "Pronds",
        price: 1000,
    },
];
const productosArr = []

while (TrueOrFalse) {
    const nombre = prompt("Ingrese su nombre");
    const apellido = prompt("Ingrese su apellido");
    const email = prompt("Ingrese su email");
    if (nombre != "" && apellido != "" && email != "") {
        alert(`Bienvenido ${nombre} ${apellido}!`);
        const verificar = prompt("Desea Suscribirse a nuestro servicio? Y/N").toUpperCase();
        if (verificar == "N") {
            TrueOrFalse = false;
        } else {
            alert("El costo de la suscripcion anual es de $5000 en un pago y 10% de interes en cuotas");
            const cuotas = prompt("Ingrese el numero de orden de la opcion a seleccionar: \n1. Una Cuota \n2. Tres Cuotas \n3. Seis Cuotas \n4. Doce Cuotas \n5. Cancelar");
            let resultado;
            switch (cuotas) {
                case "1":
                    resultado = numero1;
                    alert(`El costo total es de : $${resultado}`);
                    alert("Muchas Gracias por su compra.");
                    initProgram();
                    break;
                case "2":
                    resultado = division(numero2, numero3);
                    alert(`Quedaria en 3 cuotas de : $${resultado}`);
                    alert("Muchas Gracias por su compra.");
                    initProgram();
                    break;
                case "3":
                    resultado = division(numero2, numero4);
                    alert(`Quedaria en 6 cuotas de : $${resultado}`);
                    alert("Muchas Gracias por su compra.");
                    initProgram();
                    break;
                case "4":
                    resultado = division(numero2, numero5);
                    alert(`Quedaria en 12 cuotas de : $${resultado}`);
                    alert("Muchas Gracias por su compra.");
                    initProgram();
                    break;
                case "5":
                    TrueOrFalse = false;
                    break;
                default:
                    alert("La operacion ingresada no es valida");
            }
        }
    } else {
        alert("Por favor complete todos los campos");
        const verificar = prompt("Quiere continuar? S/N").toUpperCase();
        if (verificar == "N") {
            TrueOrFalse = false;
        } else {
            TrueOrFalse = true;
        }
    }
}

function division(a, b) {
    return a / b;
}

initProgram();

class Producto {
    constructor({ id, name, price }) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    iva(){
        return this.price * 0.21;
    }
}
function pushProducto(){
    for (const elemento of dbProdcutos){
        productArr.push(new Producto(elemento));
        console.log(productArr);
    }
}

pushProducto();

function initProgram(){
    while(TrueOrFalse){
        let selectSection = parseInt( prompt(
            "¿Qué quieres hacer? \n 1. Añadir un producto \n 2. Ver productos seleccionados \n 3. Comprar Producto \n 4. Buscar un producto \n 5. Ver todos los productos \n 6. Salir"
        ));
    
    switch(selectSection){
        case 1:
            anadirProducto(TrueOrFalse);
            break;
        case 2:
            verProductos(TrueOrFalse);
            break;
        case 3:
            comprarProducto(TrueOrFalse);
            break;
        case 4:
            buscarProducto(TrueOrFalse);
            break;
        case 5:
            verTodosProductos(TrueOrFalse);
            break;
        case 6:
            TrueOrFalse = false;
            break;
        default:
            alert("Opción no válida. Por favor, seleccione una opción válida.");
            break;    
    }
    }
}

function anadirProducto(TrueOrFalse){
    let productosSeleccionados = [];
    while (TrueOrFalse){
        let selectProduct = parseInt(prompt(
            "¿Qué productos desea seleccionar? \n 1. Avene \n 2. Hydroboost \n 3. Loreal \n 4. Ponds \n 5. Finalizar Selección"
        ));
            switch(selectProduct){
                case 1:
                    productosSeleccionados.push("Avene");
                    alert("Producto Avene seleccionado")
                    break;
                case 2:
                    productosSeleccionados.push("Hydroboost");
                    alert("Producto Hydroboost seleccionado")
                    break;
                case 3:
                    productosSeleccionados.push("Loreal");
                    alert("Producto Loreal seleccionado")
                    break;
                case 4:
                    productosSeleccionados.push("Ponds");
                    alert("Producto Ponds seleccionado")
                    break;
                case 5:
                    TrueOrFalse = false
                    break;
                default:
                    alert("Opción no válida. Por favor, seleccione una opción válida.");
                break;
        }
        if (productosSeleccionados.length === 5) {
            alert("Ha seleccionado la opción n°5. La operación ha sido cancelada.");
            break;
        }
    }
    productosArr.push(...productosSeleccionados)
    console.log("Productos seleccionados: " + productosSeleccionados.join(", "));
}

function verProductos(){
    let prod = "";
    productosArr.forEach((elemento) => {
        prod += elemento + "\n";
    }); 
    alert(prod);
}

function buscarProducto(){
    const nombreProducto = prompt("Introduce el nombre del producto que desea buscar");
    const productoEncontrado = productosArr.map((producto) => producto)
    .indexOf(nombreProducto);
    if(productoEncontrado == -1){
        alert("No se encontro el producto")
    }else{
        alert("Se encontro el producto" + "\n" + productosArr[productoEncontrado]);
    }
}

function showProducts(arr){
    let produc = "";
    for (const elemento of arr) {
        produc += `- ${elemento.name}\n`;
    }
    return produc;
}

function verTodosProductos() {
    const productos = showProducts(dbProdcutos);
    alert(productos);
    alert("Fin");
    initProgram();
}

function comprarProducto(){
    let productoABuscar = prompt("Ingrese el nombre del producto a buscar (o escriba 'salir' para volver atrás o 'finalizar' para terminar la compra)");
    if (productoABuscar.toLowerCase() === "salir") {
        return;
    }else if (productoABuscar.toLowerCase() === "finalizar") {
        finalizarCompra();
        return;
    }

    let productoEncontrad = dbProdcutos.some ((elm) => {
        return elm.name === productoABuscar;
    });

    if(productoEncontrad){
        alert("El producto existe");
        addToCart(productoABuscar)
    }else{
        alert("El producto no existe");
    }
}

function finalizarCompra() {
    if (carritoArr.length === 0) {
        alert("El carrito de compras está vacío. No se puede finalizar la compra.");
    } else {
        sumarPrecioTotal();
        eliminarTodosLosProductos();
    }
}

function addToCart(productoABuscar){
    let produc = dbProdcutos.find((elm) =>{
        return elm.name === productoABuscar;
    });
    if(produc){
        carritoArr.push(produc)
        let confirmar = prompt("Desea agregar otro producto? SI/NO")
        if(confirmar === "SI"){
            comprarProducto();
        }else{
            sumarPrecioTotal();
            eliminarTodosLosProductos();
        }
    }
}

function sumarPrecioTotal(){
    let precioTotal = carritoArr.reduce((a,b) => a + b.price, 0); //"A = acumulador y B = producto"
    alert("El precio total es " + precioTotal);
}
function eliminarTodosLosProductos(){
    carritoArr.splice(0, carritoArr.length);
}

initProgram();