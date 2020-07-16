# Base de TSOA
Esta plantilla sirve para crear una API que conecta con mongodb de forma rápida, tiene un ejemplo con ping

[Documentación](https://tsoa-community.github.io/docs/introduction.html#goal)

## Variables de entorno:

- MONGODB -> Ruta de conexión a la base de datos (mongodb://127.0.0.1:27017/test)
- SWAGGER -> Mostrar o no la documentación autogenerada en swagger (true)
- ENVIRONMENT -> Entorno, no tiene efecto (dev)

## Docker
Cuenta con un archivo docker para preparar y lanzar el contenedor de la API.

## Gitlab CI
Archivo configurado para subir la imagen de docker al registro de gitlab cada vez que se haga un push de una etiqueta (v.0.5).