<?php
// Ruta donde se guardarán las imágenes temporales antes de agregarlas al archivo zip
$tempDir = 'temp/';

// Crear directorio temporal si no existe
if (!file_exists($tempDir)) {
    mkdir($tempDir, 0777, true);
}

// Obtener las imágenes del FormData
$images = $_FILES;

// Recorrer todas las imágenes
foreach ($images as $key => $image) {
    $tempFile = $tempDir . basename($image['name']);

    // Mover la imagen al directorio temporal
    if (!move_uploaded_file($image['tmp_name'], $tempFile)) {
        die("Error al mover el archivo {$image['name']} al directorio temporal");
    }
}

// Nombre del archivo zip
$zipFile = 'galeria.zip';

// Crear un nuevo objeto ZipArchive
$zip = new ZipArchive();
if ($zip->open($zipFile, ZipArchive::CREATE) === TRUE) {
    // Agregar todas las imágenes al archivo zip
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($tempDir));
    foreach ($files as $name => $file) {
        // Agregar solo archivos, no directorios
        if (!$file->isDir()) {
            $filePath = $file->getRealPath();
            $relativePath = substr($filePath, strlen($tempDir));
            $zip->addFile($filePath, $relativePath);
        }
    }
    $zip->close();

    // Enviar el archivo zip al cliente
    header('Content-Type: application/zip');
    header('Content-disposition: attachment; filename=' . $zipFile);
    readfile($zipFile);

    // Eliminar directorio temporal y su contenido
    array_map('unlink', glob("$tempDir/*.*"));
    rmdir($tempDir);

    // Eliminar el archivo zip después de descargar
    unlink($zipFile);
} else {
    echo 'Error al crear el archivo ZIP';
}