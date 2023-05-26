var formulario = document.querySelector(".formulario-contacto");

function enviarFormulario(event) {
    event.preventDefault();
    
    var userName = document.querySelector("#userName").value;
    var correo = document.querySelector("#correo").value;
    var telefono = document.querySelector("#telefono").value;
    var mensaje = document.querySelector("#mensaje").value;

    console.log("Nombre y apellido: " + userName)
    console.log("Correo electrónico: " + correo)
    console.log("Teléfono: " + telefono)
    console.log("Consulta: " + mensaje)

    document.querySelector("#userName").value = "";
    document.querySelector("#correo").value = "";
    document.querySelector("#telefono").value = "";
    document.querySelector("#mensaje").value = "";
}
    formulario.addEventListener("submit", enviarFormulario);
