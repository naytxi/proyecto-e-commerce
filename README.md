# Proyecto E-Commerce
### Primer proyecto BackEnd BBK The Bridge.
![E-Commerce](https://i.pinimg.com/736x/b9/2e/bc/b92ebc78de16082ff371d4fa3ed27da6.jpg)

## ❓About

Este proyecto es una aplicación backend para un sistema de comercio electrónico (e-commerce). Permite gestionar productos, categorías, pedidos, usuarios y reseñas, utilizando una API REST construida con Node.js y Sequelize para manejar la base de datos. También implementa autenticación mediante JSON Web Tokens (JWT) para seguridad y control de acceso.

## ⚙️ Tecnologías y Herramientas utilizadas

- **Node.js**: Plataforma de ejecución para JavaScript en el servidor.
- **Express.js**: Framework para construir APIs REST.
- **Sequelize**: ORM para manejar bases de datos SQL de forma sencilla.
- **MySQL** : Base de datos relacional para almacenar la información.
- **JWT (JSON Web Token)**: Para autenticación y autorización segura.
- **bcrypt**: Para hashear contraseñas de usuario.
- **Multer**: Middleware para subir y manejar imágenes de productos.
- **Nodemon**: Para reiniciar el servidor automáticamente en desarrollo.
- **Git**: Control de versiones y colaboración.
- **Postman**: Para probar endpoints de la API.

## 👀 Descripción del proyecto

Este proyecto fue desarrollado en colaboración entre dos desarrolladores mediante el uso de ramas (branching) en Git para gestionar las diferentes funcionalidades y mantener el código organizado. Cada colaborador trabajó en distintas partes del proyecto, como la gestión de productos, usuarios, pedidos y reseñas, integrando sus cambios mediante merges controlados para evitar conflictos (aunque han surgido algunos claro) y asegurar la estabilidad del código.

La API proporciona endpoints para:

- Crear, actualizar, eliminar y listar productos con categorías.
- Gestionar usuarios y autenticación segura.
- Realizar pedidos y asociar productos a los mismos.
- Añadir y consultar reseñas de productos.
- Subir imágenes para los productos usando Multer.

## 🚀 Cómo ejecutar el proyecto localmente

Sigue estos pasos para clonar y correr el proyecto en tu máquina local:

1. Clonar el repositorio:
   
   git clone 
   cd proyecto-e-commerce
   
2. Instalar dependencias:
    npm install

3. Configurar variables de entorno.

    Crea un archivo .env (si usas dotenv) con las variables necesarias, por ejemplo:

    DB_USER=tu_usuario
  
    DB_PASSWORD=tu_contraseña
  
    DB_NAME=nombre_de_la_base_de_datos
  
    JWT_SECRET=tu_secreto_jwt

  4. Ejecutar migraciones para crear las tablas en la base de datos:

     npx sequelize-cli db:migrate

  5. Inicia servidor:

     npm start

## 👥 Colaboradores
Elida

Nay
