
// Importa React y componentes de React Native
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { toggleTaskCompleted } from "../src/api";
// Hook para navegación entre pantallas
import { useNavigation } from "@react-navigation/native";


// Componente que representa un ítem/tarea individual
const TaskItem = ({ task, handleDelete, onTaskUpdate }) => {
  const navigation = useNavigation();
  // Estado local para completed
  const [completed, setCompleted] = useState(task.completed);

  // Maneja el click en el círculo para marcar como completada/no completada
  const handleToggleCompleted = async () => {
    setCompleted((prev) => !prev); // Cambio visual inmediato
    // Sincroniza con backend
    const updated = await toggleTaskCompleted(task.id, !completed);
    if (onTaskUpdate) {
      onTaskUpdate({ ...task, completed: !completed });
    }
  };

  return (
    <View style={[styles.itemContainer, completed && styles.itemContainerCompleted]}>
      {/* Círculo clickable a la izquierda */}
      <TouchableOpacity
        style={styles.circleContainer}
        onPress={handleToggleCompleted}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.circle,
            completed ? styles.circleChecked : styles.circleUnchecked,
          ]}
        />
      </TouchableOpacity>

      {/* Contenido de la tarea */}
      <TouchableOpacity
        style={{ flex: 1, marginLeft: 10 }}
        onPress={() => navigation.navigate("TaskFormScreen", { id: task.id })}
      >
        <Text
          style={[styles.itemTitle, styles.itemTitleMain, completed && { textDecorationLine: 'line-through' }]}
        >
          {task.title}
        </Text>
        <Text style={[styles.itemDescription, completed && { textDecorationLine: 'line-through' }]}>{task.description}</Text>
        {task.date && (
          <Text style={[styles.itemTitle, completed && { textDecorationLine: 'line-through' }]}>Fecha: {formatDate(task.date)}</Text>
        )}
        {typeof task.priority !== 'undefined' && (
          <Text style={[styles.itemTitle, getPriorityStyle(task.priority), completed && { textDecorationLine: 'line-through' }]}>
            Prioridad: {priorityText(task.priority)}
          </Text>
        )}
      </TouchableOpacity>

      {/* Botón para eliminar la tarea */}
      <TouchableOpacity
        style={{ backgroundColor: "#799bb8", padding: 7, borderRadius: 5, marginLeft: 10 }}
        onPress={() => handleDelete(task.id)}
      >
        <Text style={{ color: "#f2f9ec" }}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  function priorityText(priority) {
    switch (priority) {
      case 1:
        return 'De baja urgencia';
      case 2:
        return 'De media urgencia';
      case 3:
        return 'De alta urgencia';
      default:
        return 'De baja urgencia';
    }
  }
  function getPriorityStyle(priority) {
    switch (priority) {
      case 1:
        return { color: '#3a7d4e' };
      case 2:
        return { color: '#bfa100' };
      case 3:
        return { color: '#b30000' };
      default:
        return { color: '#3a7d4e' };
    }
  }
};


// Formatea la fecha a YYYY-MM-DD
function formatDate(dateString) {
  if (!dateString) return "";
  // Si ya está en formato YYYY-MM-DD, regresa igual
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  // Si viene con hora, la recorta
  return dateString.split("T")[0];
}


// Estilos para el componente de tarea
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#6787a9",
    padding: 20,
    marginVertical: 8,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainerCompleted: {
    backgroundColor: "#bec4c7",
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#b6cdda', 
    backgroundColor: 'transparent',
  },
  circleChecked: {
    backgroundColor: '#bec4c7', 
    borderColor: '#799bb8',
  },
  circleUnchecked: {
    backgroundColor: 'transparent',
    borderColor: '#b6cdda',
  },
  itemTitle: {
    color: "#f2f9ec",
  },
  itemTitleMain: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f2f9ec",
    marginBottom: 2,
  },
  itemDescription: {
    color: "#e0e7ef",
    fontSize: 14,
    marginBottom: 2,
  },
});


// Exporta el componente para su uso en la lista de tareas
export default TaskItem;
