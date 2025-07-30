# Chrono: Gestor de Tareas con Racha y Calendario.

## Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando las siguientes tecnologías y librerías:

### Backend
* **Node.js**: Entorno de ejecución para JavaScript en el servidor.
* **Express**: Framework para construir la API REST.
* **MySQL**: Base de datos relacional para almacenar las tareas.
* **Swagger**: Documentación interactiva de la API.
* **dotenv**: Manejo de variables de entorno.

### Frontend (App Móvil)
* **React Native (Expo)**: Framework para crear aplicaciones móviles multiplataforma.
* **React Navigation**: Navegación entre pantallas y pestañas.
* **AsyncStorage**: Almacenamiento local para la racha de días activos.
* **Fetch API**: Comunicación con el backend.

---

## Instalación y Ejecución

Sigue estos pasos para lanzar el proyecto en tu máquina local:

### Requisitos Previos

Asegúrate de tener instalado:

* [Node.js](https://nodejs.org/es/download/) (versión LTS recomendada)
* [npm](https://www.npmjs.com/) (viene con Node.js)
* [MySQL](https://dev.mysql.com/downloads/installer/) (servidor local o remoto)
* [Expo CLI](https://docs.expo.dev/get-started/installation/) (para la app móvil)
* Un emulador Android/iOS o un dispositivo físico con la app Expo Go

---

## 1. Clona el repositorio

```bash
git clone https://github.com/iraliz/Chrono.git
cd ChronoTask
```

---
  
## 2. Configura y ejecuta el backend
### a) Instala las dependencias
```bash
cd backend
npm install
```
### b) Configura la base de datos

1. **Crea una base de datos en MySQL con el nombre que prefieras.**

2. **Ejecuta el script SQL para crear la tabla y datos de ejemplo.**

---

3. **Crea un archivo .env en la carpeta backend con el siguiente contenido (ajusta los valores):**

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSW=tu_contraseña
DB_DATABASE=tasksdb

### c) Inicia el servidor backend

```bash
npm run dev
```

## 3. Configura y ejecuta la app móvil

### a) Instala las dependencias

```bash
cd ../Chrono
npm install
```

### b) Configura la URL del backend

En el archivo Chrono/src/api.js, asegúrate de que la URL base apunte a tu backend.
Si usas un emulador Android, usa http://10.0.2.2:4000.
Si usas un dispositivo físico, pon la IP local de tu PC.

### c) Inicia la app móvil

```bash
npx expo start
```

**Escanea el QR con la app Expo Go o ejecuta en tu emulador.**

---

## Desarrollado por

* **Avila, Ariadna**
