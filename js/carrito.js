// Arreglo para almacenar los productos en el carrito
let carrito = [];

// Elementos del DOM

const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const carritoCantidad = document.getElementById('carrito-cantidad');
const detalleCarrito = document.getElementById('detalle-carrito');
const botonPagar = document.querySelector('.carrito-pagar');
const carritoDatosContainer = document.getElementById('carrito-datos');
const carritoGuardado = localStorage.getItem('carrito');

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
    for (const producto of carrito) {
        const { nombre, precio } = producto;
        const itemCarrito = document.createElement('li');
        itemCarrito.textContent = `${nombre} - $${precio}`;
        carritoLista.appendChild(itemCarrito);
        total += precio;
    }

    carritoTotal.textContent = `Total: $${total}`;
    carritoCantidad.textContent = carrito.length;

    detalleCarrito.classList.toggle('visible', carrito.length > 0);
    botonPagar.disabled = carrito.length === 0;

    guardarCarritoEnLocalStorage();
}

// Función botón para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
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
    carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
    mostrarCarrito();
}

// Cargar el carrito al cargar la página
window.addEventListener('load', cargarCarritoDesdeLocalStorage);


// Cargar carrito en página de pago
function cargarDatosCarrito() {
    carritoDatosContainer.innerHTML = '';

    for (const producto of carrito) {
        const itemProducto = document.createElement('li');
        itemProducto.textContent = `${producto.nombre} - $${producto.precio}`;
        carritoDatosContainer.appendChild(itemProducto);
    }

    const total = document.createElement('p');
    total.textContent = `Total: $${calcularTotal()}`;
    carritoDatosContainer.appendChild(total);
}

// Calcular el total del carrito
function calcularTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

// Cargar los datos del carrito al cargar la página de pago
window.addEventListener('load', cargarDatosCarrito);