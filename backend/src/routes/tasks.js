
// Importa Router de Express y los controladores de tareas
import { Router } from "express";
import {
  deleteTask,
  getTask,
  getTasks,
  getTasksCount,
  saveTask,
  updateTask,
} from "../controllers/tasks";

// Crea una instancia de router
const router = Router();




/**
 * Ruta para obtener todas las tareas
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     responses:
 *       200:
 *         description: Lista de tareas
 */
router.get("/tasks", getTasks); // permite obtener todas las tareas



/**
 * Ruta para obtener el conteo total de tareas
 * @swagger
 * /tasks/count:
 *   get:
 *     summary: Obtiene el total de tareas
 *     responses:
 *       200:
 *         description: Total de tareas
 */
router.get("/tasks/count", getTasksCount); // conteo de tareas



/**
 * Ruta para obtener una tarea específica por id
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Muestra una tarea específica por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarea encontrada
 */
router.get("/tasks/:id", getTask); // única tarea siempre que se le pase una id



/**
 * Ruta para crear y guardar una nueva tarea
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crea y guarda una tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *                 description: 1 = bajo, 2 = medio, 3 = alto
 *     responses:
 *       200:
 *         description: Tarea creada
 */
router.post("/tasks", saveTask); // intentar crear una tarea



/**
 * Ruta para eliminar una tarea por id
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea en específico por su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarea eliminada exitosamente
 */
router.delete("/tasks/:id", deleteTask); // eliminar una tarea por id



/**
 * Ruta para actualizar una tarea existente por id
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualiza la info de una tarea a partir de su id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               priority:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *                 description: 1 = bajo, 2 = medio, 3 = alto
 *     responses:
 *       200:
 *         description: Tarea actualizada
 */
router.put("/tasks/:id", updateTask); // actualizar tarea


// Exporta el router para ser usado en la app principal
export default router;
