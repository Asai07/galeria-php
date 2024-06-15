document.addEventListener("DOMContentLoaded", function() {
    // Almacena las imágenes favoritas en el local storage
   

    // Agrega un manejador de eventos clic a cada botón de corazón
    likeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            // Busca el elemento <i> dentro del botón
            var heartIcon = this.querySelector("i");
            // Toggle clase 'liked' para cambiar el color del corazón
            heartIcon.classList.toggle("liked");

            // Verifica si la imagen está marcada como favorita y la agrega o elimina del array de imágenes favoritas
            var image = this.closest(".gallery-item").querySelector(".gallery-image");
            if (heartIcon.classList.contains("liked")) {
                favoriteImages.push(image.src);
            } else {
                var index = favoriteImages.indexOf(image.src);
                if (index !== -1) {
                    favoriteImages.splice(index, 1);
                }
            }
            // Actualiza el almacenamiento local
            updateFavoriteImagesStorage();
        });
    });

    // Evento de clic en el botón "Favoritas"
    var favoriteButton = document.getElementById("favorite-selected-btn");
    favoriteButton.addEventListener("click", function() {
        // Oculta todas las imágenes
        document.querySelectorAll(".gallery-item").forEach(function(imageContainer) {
            imageContainer.style.display = "none";
        });
        // Muestra solo las imágenes favoritas
        favoriteImages.forEach(function(imageSrc) {
            document.querySelectorAll(".gallery-item").forEach(function(imageContainer) {
                var image = imageContainer.querySelector(".gallery-image");
                if (image.src === imageSrc) {
                    imageContainer.style.display = "block";
                }
            });
        });
    });

    
});
