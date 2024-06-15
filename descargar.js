document.addEventListener("DOMContentLoaded", function() {
    // Evento de clic en el botón "Descargar imagen seleccionada"
    document.getElementById("download-selected-btn").addEventListener("click", function() {
        // Obtener la imagen seleccionada
        const selectedImage = document.querySelector(".gallery-image.selected");
        if (selectedImage) {
            // Obtener la URL de la imagen
            const imageURL = selectedImage.src;
            // Obtener el enlace de descarga
            const downloadLink = document.getElementById("download-link");
            // Actualizar el atributo href del enlace
            downloadLink.href = imageURL;
            // Simular un clic en el enlace para iniciar la descarga
            downloadLink.click();
        }
    });
});

