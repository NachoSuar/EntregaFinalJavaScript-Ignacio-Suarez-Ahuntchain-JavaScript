alert("Bienvenido");
const numero1 = 5000;
const numero2 = 5500;
const numero3 = 3;
const numero4 = 6;
const numero5 = 12;
let trueOrFalse = true;

while (trueOrFalse) {
    const nombre = prompt("Ingrese su nombre");
    const apellido = prompt("Ingrese su apellido");
    const email = prompt("Ingrese su email");
    if (nombre != "" && apellido != "" && email != "") {
        alert(`Bienvenido ${nombre} ${apellido}!`);
        const verificar = prompt("Desea Suscribirse a nuestro servicio? Y/N").toUpperCase();
        if (verificar == "N") {
            trueOrFalse = false;
        } else {
            alert("El costo de la suscripcion anual es de $5000 en un pago y 10% de interes en cuotas");
            const cuotas = prompt("Ingrese el numero de orden de la opcion a seleccionar: \n1. Una Cuota \n2. Tres Cuotas \n3. Seis Cuotas \n4. Doce Cuotas \n5. Cancelar");
            let resultado;
            switch (cuotas) {
                case "1":
                    resultado = numero1;
                    alert(`El costo total es de : $${resultado}`);
                    alert("Muchas Gracias por su compra.");
                    break;
                case "2":
                    resultado = division(numero2, numero3);
                    alert(`Quedaria en 3 cuotas de : $${resultado}`);
                    alert("Muchas Gracias por su compra.");
                    break;
                case "3":
                    resultado = division(numero2, numero4);
                    alert(`Quedaria en 6 cuotas de : $${resultado}`);
                    alert("Muchas Gracias por su compra.");
                    break;
                case "4":
                    resultado = division(numero2, numero5);
                    alert(`Quedaria en 12 cuotas de : $${resultado}`);
                    alert("Muchas Gracias por su compra.");
                    break;
                case "5":
                    trueOrFalse = false;
                    break;
                default:
                    alert("La operacion ingresada no es valida");
            }
        }
    } else {
        alert("Por favor complete todos los campos");
        const verificar = prompt("Quiere continuar? S/N").toUpperCase();
        if (verificar == "N") {
            trueOrFalse = false;
        } else {
            trueOrFalse = true;
        }
    }
}

function division(a, b) {
    return a / b;
}
