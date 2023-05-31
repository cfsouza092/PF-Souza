// Arreglo para almacenar los productos en el carrito
let carrito = [];

// Elementos del DOM

const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const carritoCantidad = document.getElementById('carrito-cantidad');
const detalleCarrito = document.getElementById('detalle-carrito');
const botonPagar = document.querySelector('.carrito-pagar');

// Función para agregar un producto al carrito
function contratar(nombre, precio) {
    const producto = { nombre, precio };
    carrito.push(producto);
    mostrarCarrito();
}

// Función para mostrar el detalle del carrito
function mostrarDetalleCarrito() {
    detalleCarrito.classList.toggle('show');
}

// Función para mostrar el carrito en la interfaz de usuario
function mostrarCarrito() {
    carritoLista.innerHTML = '';
    let total = 0;
    carrito.forEach((producto) => {
        const { nombre, precio } = producto;
        const itemCarrito = document.createElement('li');
        itemCarrito.innerText = `${nombre} - $${precio}`;
        carritoLista.appendChild(itemCarrito);
        total += precio;
    });

    carritoTotal.innerText = `Total: $${total}`;
    carritoCantidad.innerText = carrito.length.toString();

    if (carrito.length > 0) {
        detalleCarrito.classList.add('visible');
        botonPagar.disabled = false; // Habilitar el botón de pagar
    } else {
        detalleCarrito.classList.remove('visible');
        botonPagar.disabled = true; // Deshabilitar el botón de pagar
    }
    guardarCarritoEnLocalStorage ()
}

// Función botón para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    mostrarDetalleCarrito();
}

// Función botón para realizar el pago
function pagar() {
    alert('Serás redirigido a la plataforma de pago');
    window.location.href = './pago.html';
}

// Guardar carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar carrito guardado en localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

// Cargar el carrito al cargar la página
window.addEventListener('load', cargarCarritoDesdeLocalStorage);


// Cargar carrito en página de pago
function cargarDatosCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');

    if (carritoGuardado) {
        const carrito = JSON.parse(carritoGuardado);
        const carritoDatosContainer = document.getElementById('carrito-datos');
        const listaProductos = document.createElement('ul');

        carrito.forEach((producto) => {
            const itemProducto = document.createElement('li');
            itemProducto.textContent = `${producto.nombre} - $${producto.precio}`;
            listaProductos.appendChild(itemProducto);
        });

        const total = document.createElement('p');
        total.textContent = `Total: $${calcularTotal(carrito)}`;
        carritoDatosContainer.innerHTML = '';
        carritoDatosContainer.appendChild(listaProductos);
        carritoDatosContainer.appendChild(total);
    }
}

// Calcular el total del carrito
function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio;
    });
    return total;
}

// Cargar los datos del carrito al cargar la página de pago
window.addEventListener('load', cargarDatosCarrito);