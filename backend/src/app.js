
// Importa las dependencias principales
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Importa Swagger para documentación de la API
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerIU from 'swagger-ui-express'
import {options} from './swaggerOp'

// Genera la especificación Swagger a partir de las opciones
const specs = swaggerJSDoc(options);

// Importa las rutas de tareas
import tasksRoutes from './routes/tasks'

// Crea la aplicación Express
const app = express();

// Middlewares globales
app.use(cors()); // Permite peticiones desde otros orígenes
app.use(morgan()); // Muestra logs de las peticiones en consola
app.use(express.json()); // Permite recibir JSON en las peticiones

// Usa las rutas de tareas
app.use(tasksRoutes);

// Ruta para la documentación Swagger
app.use('/docs', swaggerIU.serve, swaggerIU.setup(specs));

// Exporta la app para ser usada en index.js
export default app;