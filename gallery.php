<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</head>
<header class="header container">
        <div class="logo">
            <img src="imagenes/logo.png" alt="Logo">
        </div>
        <div class="header-buttons">
        <input type="file" id="file-upload" accept="image/*" multiple style="display: none;">
            <button id="upload-files-btn" class="button-28">Subir archivos</button>
            <button id="download-selected-btn" class="button-28">Descargar toda la galeria</button>
            <button id="favorite-selected-btn" class="button-28">Favoritas</button>
        </div>
    </header>
<body>
    <div class="container">
        
       
        <main class="gallery">

            <?php
            $ruta = 'imagenes/';
            $uploadedImages = []; // Array para almacenar las rutas de las imágenes subidas
            if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["files"]["name"])) {
                $uploadDir = 'imagenes/';
                $numFiles = count($_FILES["files"]["name"]);
                for ($i = 0; $i < $numFiles; $i++) {
                    $fileName = $_FILES["files"]["name"][$i];
                    $filePath = $uploadDir . $fileName;
                    if (move_uploaded_file($_FILES["files"]["tmp_name"][$i], $filePath)) {
                        // Agregar la ruta de la imagen subida al array
                        $uploadedImages[] = $filePath;
                    } else {
                        // Error al subir la imagen
                    }
                }
            }

            // Recopilar todas las imágenes existentes
            $existingImages = glob($ruta . '*.{jpg,jpeg,png,gif}', GLOB_BRACE);

            // Combinar las imágenes subidas con las existentes
            $allImages = array_merge($uploadedImages, $existingImages);

            // Mostrar todas las imágenes en la galería
            foreach ($allImages as $imagen) {
                echo '<div class="gallery-item">';
                echo '<div class="image-container">';
                echo '<img src="' . $imagen . '" alt="Imagen" class="gallery-image">';
                echo '<div class="button-container">';
                echo '<button class="like-button" id="like-button"><i class="fa fa-heart"></i></button>';
                echo '<button class="share-button"><i class="fa fa-share-alt"></i></button>';
                echo '<a href="' . $imagen . '" download><button class="download-button"><i class="fa fa-download"></i></button></a>';
                echo '</div>';
                echo '</div>';
                echo '</div>';
            }
            ?>


    </div>
    <div class="favoritos-container">
        <!-- Aquí se mostrarán las imágenes marcadas como favoritas -->
    </div>
    <script src="script.js"></script>
    <script src="favoritas.js"></script>
    <script src="descargar.js"></script>
    <script src="share.js"></script>
    <script>
    document.getElementById('download-selected-btn').addEventListener('click', function () {
            // Obtener todas las imágenes de la galería
            var images = document.querySelectorAll('.gallery-image');
            // Crear un objeto FormData para almacenar las imágenes
            var formData = new FormData();

            // Agregar cada imagen al FormData
            images.forEach(function (image, index) {
                var url = image.src;
                // Agregar la imagen al FormData con un nombre único
                formData.append('image_' + index, url);
            });

            // Crear una solicitud XMLHttpRequest
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'crear_zip.php', true);
            xhr.responseType = 'blob';

            // Cuando se complete la solicitud
            xhr.onload = function () {
                if (this.status === 200) {
                    // Crear un objeto Blob con la respuesta
                    var blob = new Blob([this.response], { type: 'application/zip' });
                    // Crear un enlace <a> para descargar el archivo
                    var a = document.createElement('a');
                    a.href = window.URL.createObjectURL(blob);
                    a.download = 'galeria.zip';
                    // Hacer clic en el enlace para descargar el archivo
                    a.click();
                }
            };

            // Enviar el FormData
            xhr.send(formData);
        });
    </script>

</body>

</html>