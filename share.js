document.addEventListener("DOMContentLoaded", function() {
    const shareButtons = document.querySelectorAll(".share-button");

    shareButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            // Encuentra la imagen asociada al botón
            const imageContainer = this.closest(".gallery-item");
            const image = imageContainer.querySelector(".gallery-image");

            if (image) {
                // Obtiene la URL de la imagen
                const imageUrl = image.src;

                // URL de WhatsApp con la imagen como mensaje
                const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent("¡Mira esta imagen: " + imageUrl);

                // Intenta abrir WhatsApp
                window.open(whatsappUrl);
            } else {
                console.error("No se encontró la imagen asociada al botón de compartir.");
            }
        });
    });
});
