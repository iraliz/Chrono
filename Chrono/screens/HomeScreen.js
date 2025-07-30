
// Importa React y hooks para manejar estado y efectos secundarios
import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/Layout";
import TaskList from "../components/TaskList";
import PriorityDropdown from "../components/PriorityDropdown";
import { getTasks } from "../src/api";


// Pantalla principal de la app
const HomeScreen = () => {
  // Estado para almacenar la lista de tareas
  const [tasks, setTasks] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = mayor prioridad primero
  const navigation = useNavigation();

  // useEffect para cargar las tareas al montar el componente
  useEffect(() => {
    // Función asíncrona para obtener las tareas del backend
    const fetchTasks = async () => {
      const data = await getTasks(); // Llama a la API y obtiene las tareas
      setTasks(data);
    };
    fetchTasks();
  }, []); // Solo se ejecuta una vez al montar

  // Ordena las tareas según la prioridad y el orden seleccionado
  const getSortedTasks = () => {
    if (!tasks) return [];
    return [...tasks].sort((a, b) => {
      if (sortOrder === 'desc') {
        return (b.priority || 1) - (a.priority || 1);
      } else {
        return (a.priority || 1) - (b.priority || 1);
      }
    });
  };

  // Renderiza solo la lista de tareas y el FAB
  return (
    <Layout>
      {/* Dropdown para ordenar por prioridad */}
      <PriorityDropdown onChange={setSortOrder} />

      {/* Muestra la lista de tareas ordenadas y permite actualizar el estado */}
      <TaskList tasks={getSortedTasks()} setTasks={setTasks} />

      {/* FAB para agregar nueva tarea */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("TaskFormScreen")}
        activeOpacity={0.8}
      >
        <View style={styles.fabInner}>
          <Text style={styles.fabIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </Layout>
  );
};



const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 25,
    bottom: 30,
    zIndex: 10,
    elevation: 5,
  },
  fabInner: {
    backgroundColor: '#94b3c7',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2.1,
    borderColor: '#d4e0e9',
  },
  fabIcon: {
    color: '#f4f8fa',
    fontSize: 27,
    fontWeight: '',
    marginTop: -2,
  },
});

// Exporta el componente para su uso en la navegación
export default HomeScreen;
