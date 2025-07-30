
// Importa el cliente MySQL2 en modo promesa
import mysql2 from 'mysql2/promise'
// Importa la configuración de conexión
import { config } from "./config";

// Crea y exporta un pool de conexiones a la base de datos
export const pool = mysql2.createPool({
  ...config,
  waitForConnections: true, // Espera conexiones si el pool está lleno
  connectionLimit: 50,      // Máximo de conexiones simultáneas
  queueLimit: 0             // Sin límite de cola
});
