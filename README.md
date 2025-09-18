# Pagina Web Seguridad

- [Pagina Web Seguridad](#pagina-web-seguridad)
  - [🚀 Tecnologías utilizadas](#-tecnologías-utilizadas)
  - [⚙️ Funcionalidades](#️-funcionalidades)
  - [🔧 Instalación y ejecución](#-instalación-y-ejecución)
  - [👥 Roles de usuario](#-roles-de-usuario)


Este proyecto es una **aplicación web desarrollada en Next.js** que implementa un sistema de **login y registro de usuarios** con dos roles principales:

- **Administrador**: Tiene privilegios de gestión dentro del sitio.  
- **Usuario**: Puede registrarse, iniciar sesión y acceder al contenido del blog.  

La idea central del proyecto es servir como un **blog guía de modding** para algunos de los juegos más populares de la comunidad.

---

## 🚀 Tecnologías utilizadas

- [Next.js](https://nextjs.org/) - Framework de React para aplicaciones web.
- [MongoDB](https://www.mongodb.com/) - Base de datos NoSQL.
- [Mongoose](https://mongoosejs.com/) - ODM para modelar la base de datos.
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Encriptación de contraseñas.
- [JSON Web Token (JWT)](https://jwt.io/) - Autenticación basada en tokens.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para estilos.
- [dotenv](https://github.com/motdotla/dotenv) - Manejo de variables de entorno.

---

## ⚙️ Funcionalidades

- Registro de nuevos usuarios con encriptación de contraseñas.
- Inicio de sesión seguro mediante JWT.
- Asignación de **roles (admin/usuario)** para controlar permisos.
- Conexión a base de datos **MongoDB** usando **Mongoose**.
- Estilos personalizados con **Tailwind CSS**.
- Despliegue en entorno **local**.

---

## 🔧 Instalación y ejecución

Clonar el repositorio:

```bash
- git clone https://github.com/Kralog2/paginaWebSeguridad.git
- cd paginaWebSegurudad
- cd front
```

Instalar dependencias:

```bash
- npm install
```

Configurar variables de entorno:
Crear un archivo .env.local en la raíz del proyecto con los siguientes valores:

```env
MONGODB_URI=tu_cadena_de_conexion_mongo
JWT_SECRET=tu_secreto_seguro
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir en el navegador:

```arduino
http://localhost:3000
```
---

## 👥 Roles de usuario

Administrador

- Acceso a gestión avanzada.

- Control sobre usuarios.

Usuario

- Registro/Login.

- Acceso al blog y guías.

---
✍️ Autor: [Kralog2]