// Verifica que los datos del formulario estan completos
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.includes("contacto.html")) {
        console.log("Página de contacto detectada.");

        const form = document.querySelector(".contacto-form");
        if (form) {
            console.log("Formulario encontrado.");

            form.addEventListener("submit", function (event) {
                event.preventDefault();
                console.log("Evento submit detectado.");
                let name = document.getElementById("name").value;
                let email = document.getElementById("email").value;

                if (name && email) {
                console.log("Formulario completado con éxito.");
                this.submit();
                } else {
                console.log("Faltan campos por llenar, por favor complétalos.");
                }
            });
        } else {
            console.log("Formulario no encontrado.");
        }
    } else {
        console.log("No estás en la página de contacto.");
    }
});
