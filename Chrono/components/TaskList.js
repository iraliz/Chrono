// Importa componentes de React Native para listas y refresco
import { FlatList, RefreshControl } from "react-native";
// Importa React y hooks para estado y efectos
import React, { useState, useEffect } from "react";
// Hook para saber si la pantalla está enfocada
import { useIsFocused } from "@react-navigation/native";

// Importa el componente de ítem de tarea
import TaskItem from "./TaskItem";
// Importa funciones para obtener y eliminar tareas
import { getTasks, deleteTask } from "../src/api";


// Componente que muestra la lista de tareas
const TaskList = ({ tasks, setTasks }) => {
  // Estado para controlar el refresco de la lista
  const [refreshing, setRefreshing] = useState(false);
  // Saber si la pantalla está enfocada (útil para recargar datos al volver)
  const isFocused = useIsFocused();

  // Función para cargar las tareas desde el backend
  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  // useEffect para recargar tareas cuando la pantalla está enfocada
  useEffect(() => {
    loadTasks();
  }, [isFocused]);

  // Maneja la eliminación de una tarea y recarga la lista
  const handleDelete = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  // Actualiza una tarea en el estado
  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task))
    );
  };

  // Renderiza cada ítem de la lista usando TaskItem
  const renderItem = ({ item }) => {
    return (
      <TaskItem
        task={item}
        handleDelete={handleDelete}
        onTaskUpdate={handleTaskUpdate}
      />
    );
  };

  // Función para refrescar la lista manualmente (pull to refresh)
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  });

  // FlatList recorre el arreglo de tareas y las muestra
  // item.id + '' asegura que la key sea string
  return (
    <FlatList
      style={{ width: "100%" }}
      data={tasks}
      keyExtractor={(item) => item.id + ""}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["#f4f8fa"]}
          onRefresh={onRefresh}
          progressBackgroundColor={"#b6cdda"}
        />
      }
    />
  );
};


// Exporta el componente para su uso en HomeScreen
export default TaskList;
