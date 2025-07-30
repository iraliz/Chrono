
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
// Importa el input de texto compatible con gestos
import { TextInput } from "react-native-gesture-handler";
// Importa React y hooks para estado y efectos
import React, { useState, useEffect } from "react";

// Importa el layout general y las funciones de la API
import Layout from "../components/Layout";
import { saveTask, getTask, updateTask } from "../src/api";
import { calculateStreak } from "../utils/streak";


// Pantalla para crear o editar una tarea
const TaskFormScreen = ({ navigation, route }) => {
  // Estado para los datos de la tarea
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    priority: 1,
  });

  // Estado para saber si se está editando una tarea existente
  const [editing, setEditing] = useState(false);

  // Actualiza el estado de la tarea cuando cambia un campo
  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  // Estado y función para mostrar el selector de fecha
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Maneja el cambio de fecha desde el calendario
  const handleDateChange = (event) => {
    // Siempre guardar la fecha en formato YYYY-MM-DD
    setTask({ ...task, date: event.dateString });
    setShowDatePicker(false);
  };

  // Maneja el guardado o actualización de la tarea
  const handleSubmit = async () => {
    try {
      let taskToSend = { ...task };
      if (editing) {
        // Valida que se haya seleccionado una fecha SOLO al actualizar
        if (!task.date) {
          alert("Por favor selecciona una fecha para la tarea.");
          return;
        }
        // Formatea la fecha a YYYY-MM-DD si viene en formato ISO
        let date = task.date;
        if (typeof date === 'string' && date.includes('T')) {
          date = date.split('T')[0];
        }
        // Asegura que la prioridad sea un número
        let priority = typeof task.priority !== 'undefined' ? Number(task.priority) : 1;
        taskToSend = { ...task, date, priority };
        await updateTask(route.params.id, taskToSend);
      } else {
        // En modo creación, NO validar ni enviar prioridad ni fecha
        const { date, priority, ...taskWithoutDatePriority } = task;
        await saveTask(taskWithoutDatePriority);
        // Solo al crear una tarea nueva, actualiza la racha
        await calculateStreak();
      }
      navigation.navigate("MainTabs", { screen: "Home" });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect para cargar los datos si se está editando una tarea
  useEffect(() => {
    if (route.params && route.params.id) {
      // Cambia el título del header
      navigation.setOptions({ headerTitle: "Actualizando la actividad" });
      setEditing(true);
      // Obtiene la tarea y actualiza el estado
      (async () => {
        const task = await getTask(route.params.id);
        setTask({
          title: task.title,
          description: task.description,
          date: task.date,
          priority: typeof task.priority !== 'undefined' ? Number(task.priority) : 1,
        });
      })();
    }
  }, [route.params]);

  return (
    <Layout>
      {/* Campo para el título de la tarea */}
      <TextInput
        style={styles.input}
        placeholder="Agregar título para la actividad"
        placeholderTextColor="#94b3c7"
        onChangeText={(text) => handleChange("title", text)}
        value={task.title}
      />
      {/* Campo para la descripción de la tarea */}
      <TextInput
        style={styles.input}
        placeholder="Agregar descripcion para la actividad"
        placeholderTextColor="#94b3c7"
        onChangeText={(text) => handleChange("description", text)}
        value={task.description}
      />
      {/* Mostrar prioridad y fecha solo en modo edición */}
      {editing && (
        <>
          {/* Selector de prioridad visual */}
          <View style={styles.priorityContainer}>
            <Text style={styles.priorityLabel}>Prioridad:</Text>
            {/* Botón para prioridad baja */}
            <TouchableOpacity
              style={[styles.priorityButton, task.priority === 1 && styles.prioritySelectedLow]}
              onPress={() => handleChange("priority", 1)}
            >
              <Text style={styles.priorityText}>Baja</Text>
            </TouchableOpacity>
            {/* Botón para prioridad media */}
            <TouchableOpacity
              style={[styles.priorityButton, task.priority === 2 && styles.prioritySelectedMedium]}
              onPress={() => handleChange("priority", 2)}
            >
              <Text style={styles.priorityText}>Media</Text>
            </TouchableOpacity>
            {/* Botón para prioridad alta */}
            <TouchableOpacity
              style={[styles.priorityButton, task.priority === 3 && styles.prioritySelectedHigh]}
              onPress={() => handleChange("priority", 3)}
            >
              <Text style={styles.priorityText}>Alta</Text>
            </TouchableOpacity>
          </View>
          {/* Selector de fecha */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.buttonDate}>
              {task.date ? `Fecha: ${task.date}` : "Seleccionar fecha"}
            </Text>
          </TouchableOpacity>
          {/* Muestra el calendario si showDatePicker es true */}
          {showDatePicker && (
            <View style={{ marginVertical: 60 }}>
              <Calendar
                onDayPress={handleDateChange}
                markedDates={task.date ? { [task.date]: { selected: true } } : {}}
              />
            </View>
          )}
        </>
      )}
      {/* Botón para guardar o actualizar la tarea */}
      <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {editing ? "Actualizar" : "Guardar"}
        </Text>
      </TouchableOpacity>
    </Layout>
  );
};

// Estilos para los campos, botones y contenedores
const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#425166",
    height: 39,
    color: "#b6cdda",
    textAlign: "center",
    paddingHorizontal: 7,
    borderRadius: 7,
  },
  priorityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
    justifyContent: "space-between",
  },
  priorityLabel: {
    color: "#425166",
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 14,
  },
  priorityButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#425166",
    marginHorizontal: 2,
    backgroundColor: "#f4f8fa",
  },
  prioritySelectedLow: {
    backgroundColor: "#b6e3c6",
    borderColor: "#3a7d4e",
  },
  prioritySelectedMedium: {
    backgroundColor: "#ffe9a7",
    borderColor: "#bfa100",
  },
  prioritySelectedHigh: {
    backgroundColor: "#ffb3b3",
    borderColor: "#b30000",
  },
  priorityText: {
    color: "#425166",
    fontWeight: "bold",
    fontSize: 13,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: "#425166",
    width: "90%",
  },
  buttonText: {
    color: "#f2f9ec",
    textAlign: "center",
  },
  buttonUpdate: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: "#425166",
    width: "90%",
  },
  buttonDate: {
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom: 7,
    fontSize: 14,
    height: 35,
    textAlign: "center",
    color: "#94b3c7",
    borderRadius: 7,
  },
});


// Exporta el componente para su uso en la navegación
export default TaskFormScreen;
