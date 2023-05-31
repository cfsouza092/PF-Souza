// Arreglo para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function contratar(nombre, precio) {
    const producto = { nombre, precio };
    carrito.push(producto);
    mostrarCarrito();
}

// Función para mostrar el detalle del carrito
function mostrarDetalleCarrito() {
    const detalleCarrito = document.getElementById('detalle-carrito');
    detalleCarrito.classList.toggle('show');
}

// Función para mostrar el carrito en la interfaz de usuario
function mostrarCarrito() {
    const carritoLista = document.getElementById('carrito-lista');
    const carritoTotal = document.getElementById('carrito-total');
    const carritoCantidad = document.getElementById('carrito-cantidad');
    const botonPagar = document.querySelector('.carrito-pagar');

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

    const detalleCarrito = document.getElementById('detalle-carrito');
    if (carrito.length > 0) {
        detalleCarrito.classList.add('visible');
        botonPagar.disabled = false; // Habilitar el botón de pagar
    } else {
        detalleCarrito.classList.remove('visible');
        botonPagar.disabled = true; // Deshabilitar el botón de pagar
    }
    guardarCarritoEnLocalStorage ()
}
// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    mostrarDetalleCarrito();
}

// Función para realizar el pago
function pagar() {
    alert('Serás redirigido a la plataforma de pago');
    window.location.href = './pago.html';
}

// Función para guardar el carrito en el almacenamiento local
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde el almacenamiento local
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
    }
}

// Cargar el carrito al cargar la página
window.addEventListener('load', cargarCarritoDesdeLocalStorage);

// Función para cargar los datos del carrito en la página de pago
function cargarDatosCarrito() {
    // Obtener el carrito almacenado en el LocalStorage
    const carritoGuardado = localStorage.getItem('carrito');

    if (carritoGuardado) {
        const carrito = JSON.parse(carritoGuardado);

        // Crear elementos en el DOM para mostrar los datos del carrito
        const carritoDatosContainer = document.getElementById('carrito-datos');

        const listaProductos = document.createElement('ul');
        carrito.forEach((producto) => {
            const itemProducto = document.createElement('li');
            itemProducto.textContent = `${producto.nombre} - $${producto.precio}`;
            listaProductos.appendChild(itemProducto);
        });

        const total = document.createElement('p');
        total.textContent = `Total: $${calcularTotal(carrito)}`;

        carritoDatosContainer.appendChild(listaProductos);
        carritoDatosContainer.appendChild(total);
    }
}

// Función para calcular el total del carrito
function calcularTotal(carrito) {
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.precio;
    });
    return total;
}

// Cargar los datos del carrito al cargar la página
window.addEventListener('load', cargarDatosCarrito);