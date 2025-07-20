![Texto alternativo](https://i.pinimg.com/1200x/76/e6/b9/76e6b9355380c85fe9a80dddae96172c.jpg)

# 🛒 Backend E-commerce – Node.js + Sequelize + MySQL

Este repositorio contiene el backend de una aplicación de e-commerce, desarrollado con tecnologías modernas como **Node.js**, **Sequelize (ORM)**, y **MySQL** como sistema de gestión de bases de datos relacional. El entorno de desarrollo es asistido por **Nodemon** para una experiencia más fluida y rápida.

---

## 📌 About

Este proyecto representa la capa de backend de una aplicación de comercio electrónico, encargada de la gestión de productos, usuarios, carritos, órdenes y demás recursos clave. La base de datos está estructurada para soportar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre distintas entidades necesarias en un entorno de e-commerce.

El uso de Sequelize como ORM permite una abstracción poderosa para interactuar con la base de datos MySQL de manera más eficiente, segura y mantenible. Además, el entorno de desarrollo está optimizado gracias a Nodemon, lo que facilita el trabajo en caliente sin reinicios manuales del servidor.

---

## 🛠 Herramientas y Tecnologías

A continuación, las principales herramientas utilizadas en este proyecto:

- **Node.js**: Entorno de ejecución de JavaScript para el servidor.
- **Express.js**: Framework minimalista para crear la API REST.
- **Sequelize**: ORM para manejar la base de datos MySQL con sintaxis moderna y migraciones.
- **MySQL**: Sistema de base de datos relacional.
- **Nodemon**: Utilidad que reinicia automáticamente el servidor al detectar cambios.
- **dotenv**: Para gestionar variables de entorno de forma segura.
- **bcrypt / JWT**: Para autenticación y seguridad de usuarios (si aplica).

---

## 🚀 Cómo instalar y ejecutar este proyecto

Sigue estos pasos para clonar, instalar y ejecutar el backend en tu entorno local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/backend-ecommerce.git
cd backend-ecommerce
npm install
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=nombre_de_la_base_de_datos
DB_PORT=3306
PORT=3000
npx sequelize db:migrate
