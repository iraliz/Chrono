
// Importa el pool de conexiones a la base de datos
import { connect, pool } from "../database";


// Controlador para obtener todas las tareas
export const getTasks = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM tasks");
  // Asegura que completed sea boolean
  const tasks = rows.map(row => ({ ...row, completed: !!row.completed }));
  res.json(tasks);
};

// Controlador para obtener una tarea por id
export const getTask = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [
    req.params.id,
  ]);
  if (rows.length > 0) {
    const task = { ...rows[0], completed: !!rows[0].completed };
    res.json(task);
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
};

// Controlador para contar el total de tareas
export const getTasksCount = async (req, res) => {
  const [rows] = await pool.query("SELECT COUNT(*) FROM tasks");
  console.log(rows);
  res.json(rows[0]["COUNT(*)"]);
};

// Controlador para crear (guardar) una nueva tarea
export const saveTask = async (req, res) => {
  // Valida que la prioridad sea 1, 2 o 3
  let priority = 1;
  if ([1, 2, 3].includes(Number(req.body.priority))) {
    priority = Number(req.body.priority);
  }
  //* Formatea la fecha a YYYY-MM-DD si viene en formato ISO
  let date = req.body.date;
  if (typeof date === "string" && date.includes("T")) {
    date = date.split("T")[0];
  }
  // completed puede venir en el body, si no, por defecto false
  const completed = typeof req.body.completed === 'boolean' ? req.body.completed : false;
  // Inserta la tarea en la base de datos
  const [results] = await pool.query(
    "INSERT INTO tasks(title, description, date, priority, completed) VALUES (?, ?, ?, ?, ?)",
    [req.body.title, req.body.description, date, priority, completed]
  );
  // Devuelve la tarea creada
  res.json({
    id: results.insertId,
    title: req.body.title,
    description: req.body.description,
    date,
    priority,
    completed,
  });
};

// Controlador para eliminar una tarea por id
export const deleteTask = async (req, res) => {
  await pool.query("DELETE FROM tasks WHERE id = ?", [req.params.id]);
  res.sendStatus(204);
};

// Controlador para actualizar una tarea existente
export const updateTask = async (req, res) => {
  // Valida que la prioridad sea 1, 2 o 3
  let priority = 1;
  if ([1, 2, 3].includes(Number(req.body.priority))) {
    priority = Number(req.body.priority);
  }
  // Formatea la fecha a YYYY-MM-DD si viene en formato ISO
  let date = req.body.date || null;
  if (typeof date === "string" && date.includes("T")) {
    date = date.split("T")[0];
  }
  // completed puede venir en el body, si no, por defecto false
  const completed = typeof req.body.completed === 'boolean' ? req.body.completed : false;
  // Actualiza la tarea en la base de datos
  const [result] = await pool.query(
    "UPDATE tasks SET title = ?, description = ?, date = ?, priority = ?, completed = ? WHERE id = ?",
    [req.body.title, req.body.description, date, priority, completed, req.params.id]
  );
  // Si no se encontró la tarea, devuelve error 404
  if (result.affectedRows === 0) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }
  // Devuelve la tarea actualizada
  res.json({
    id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    date,
    priority,
    completed,
  });
};
