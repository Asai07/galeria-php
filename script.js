document.addEventListener("DOMContentLoaded", function() {
    const fileUpload = document.getElementById("file-upload");
    const uploadFilesBtn = document.getElementById("upload-files-btn");
    const selectAllBtn = document.getElementById("select-all-btn");
    const gallery = document.querySelector(".gallery");
    let selectedCount = 0;
    let allSelected = false;

    // Función para agregar las imágenes seleccionadas al principio de la galería
    function addImagesToGallery(files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                const figure = document.createElement("figure");
                figure.appendChild(img);
                gallery.insertBefore(figure, gallery.firstChild);
            };
            reader.readAsDataURL(file);
        });
    }

    // Evento de cambio del input de tipo file
    fileUpload.addEventListener("change", function() {
        const files = fileUpload.files;
        addImagesToGallery(files);
    });

    

    // Evento de clic en el botón "Seleccionar todas las fotos"
    selectAllBtn.addEventListener("click", function() {
        const images = gallery.querySelectorAll("img");
        images.forEach(image => {
            if (!allSelected) {
                image.classList.add("selected");
                selectedCount = images.length;
            } else {
                image.classList.remove("selected");
                selectedCount = 0;
            }
        });
        allSelected = !allSelected;
        document.getElementById("counter").textContent = selectedCount;
    });

    // Función para cambiar el estado de selección de una imagen
    function toggleSelectImage(image) {
        image.classList.toggle("selected");
        selectedCount += image.classList.contains("selected") ? 1 : -1;
        document.getElementById("counter").textContent = selectedCount;
    }

    // Evento de clic en una imagen para seleccionar/deseleccionar
    gallery.addEventListener("click", function(event) {
        const target = event.target;
        if (target.tagName === "IMG") {
            toggleSelectImage(target);
        }
    });

    // Evento de clic en el botón "Favoritas"
    document.getElementById("favorite-selected-btn").addEventListener("click", function() {
        const allImages = document.querySelectorAll(".gallery img");
        const favoritos = document.querySelectorAll(".gallery img.selected");

        allImages.forEach(img => {
            if (favoritos.includes(img)) {
                img.style.display = "block"; // Mostrar imágenes favoritas
            } else {
                img.style.display = "none"; // Ocultar imágenes no favoritas
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los botones de corazón por su clase
    var likeButtons = document.querySelectorAll(".like-button");

    // Agrega un manejador de eventos clic a cada botón de corazón
    likeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            // Alterna la clase 'liked' para cambiar el color del corazón
            this.classList.toggle("liked");
        });
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    fetchImages().then(images => {
        images.forEach(image => {
            const imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.classList.add("gallery-image"); // Agrega la clase 'gallery-image'
            gallery.appendChild(imgElement);
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los botones de corazón dentro de la galería
    var likeButtons = document.querySelectorAll(".gallery .like-button");

    // Almacena las imágenes favoritas
    var favoriteImages = [];

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
                favoriteImages.push(image);
            } else {
                var index = favoriteImages.indexOf(image);
                if (index !== -1) {
                    favoriteImages.splice(index, 1);
                }
            }
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
        favoriteImages.forEach(function(image) {
            image.closest(".gallery-item").style.display = "block";
        });
    });
});


        document.getElementById('upload-files-btn').addEventListener('click', function() {
            document.getElementById('file-upload').click();
        });

        document.getElementById('file-upload').addEventListener('change', function() {
            var files = this.files;
            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append('files[]', files[i]);
            }
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'gallery.php', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // Recargar la galería después de la carga exitosa de imágenes
                    location.reload();
                } else {
                    console.error(xhr.statusText);
                }
            };
            xhr.onerror = function() {
                console.error('Error de red');
            };
            xhr.send(formData);
        });

 // Evento de clic en el botón "Descargar imágenes seleccionadas"
 document.getElementById("download-selected-btn").addEventListener("click", function() {
    const selectedImages = document.querySelectorAll(".gallery-item.selected .gallery-image");
    selectedImages.forEach(image => {
        const url = image.src;
        const filename = url.substring(url.lastIndexOf('/') + 1);
        downloadImage(url, filename);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Evento de clic en el botón "Descargar imágenes seleccionadas"
    document.getElementById("download-selected-btn").addEventListener("click", function() {
        // Obtener todas las imágenes seleccionadas
        const selectedImages = document.querySelectorAll(".gallery-image.selected");
        // Iterar sobre cada imagen seleccionada
        selectedImages.forEach(function(image) {
            // Obtener la URL de la imagen
            const imageURL = image.src;
            // Crear un enlace temporal para descargar la imagen
            const downloadLink = document.createElement("a");
            downloadLink.href = imageURL;
            downloadLink.download = getFilenameFromUrl(imageURL); // Obtener el nombre del archivo de la URL
            // Simular un clic en el enlace para iniciar la descarga
            downloadLink.click();
        });
    });

    // Función para obtener el nombre del archivo de una URL
    function getFilenameFromUrl(url) {
        return url.substring(url.lastIndexOf('/') + 1);
    }
});
