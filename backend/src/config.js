
// Importa dotenv para cargar variables de entorno desde .env
import {config as dotenv} from 'dotenv';
dotenv();

// Imprime una variable de entorno de ejemplo (puedes quitarlo en producción)
console.log(process.env.NICKNAME); 

// Exporta la configuración de conexión a la base de datos MySQL
export const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSW,
    database: process.env.DB_DATABASE
};

