<?php 
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["files"]["name"])) {
    $uploadDir = 'imagenes/';
    $numFiles = count($_FILES["files"]["name"]);
    $uploadedImages = []; // Array para almacenar las rutas de las imágenes subidas
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