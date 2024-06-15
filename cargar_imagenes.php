<?php
$dir = 'imagenes/';
$files = scandir($dir);

// Filtra los archivos para obtener solo las imágenes
$images = array_filter($files, function($file) use ($dir) {
    return getimagesize($dir . '/' . $file);
});

// Devuelve las rutas de las imágenes en formato JSON
echo json_encode(array_map(function($image) use ($dir) {
    return $dir . '/' . $image;
}, $images));
