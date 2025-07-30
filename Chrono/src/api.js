
// Aquí están las funciones que interactúan con el backend para tareas

// URL base de la API de tareas
const API = "http://10.0.2.2:3000/tasks";

// Obtiene todas las tareas del backend
export const getTasks = async () => {
  const res = await fetch(API);
  return await res.json();
};

// Obtiene una tarea específica por id
export const getTask = async (id) => {
  const res = await fetch(`${API}/${id}`);
  return await res.json();
};

// Envía una petición POST para guardar una nueva tarea
export const saveTask = async (newTask) => {
  // Asegura que la fecha esté en formato correcto
  let date = newTask.date;
  if (typeof date === 'string' && date.includes('T')) {
    date = date.split('T')[0];
  }
  // completed puede venir en newTask, si no, por defecto false
  const body = {
    ...newTask,
    date: date,
    priority: Number(newTask.priority) || 1,
    completed: typeof newTask.completed === 'boolean' ? newTask.completed : false,
  };
  const res = await fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

// Elimina una tarea por id
export const deleteTask = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};

// Actualiza una tarea existente por id
export const updateTask = async (id, newTask) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newTask,
      date: newTask.date || null,
      priority: Number(newTask.priority) || 1,
      completed: typeof newTask.completed === 'boolean' ? newTask.completed : false,
    }),
  });
  return res;
};

// Cambia el estado de completado de una tarea
export const toggleTaskCompleted = async (id, completed) => {
  // Solo actualiza el campo completed
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed }),
  });
  return await res.json();
};
