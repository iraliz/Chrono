
// Importa React y componentes de React Native
import React from "react";
import { Text, TouchableOpacity } from "react-native";
// Importa el contenedor de navegación
import { NavigationContainer } from "@react-navigation/native";
// Importa el contenedor raíz para gestos
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Importa las pantallas principales
import MainTabs from "./MainTabs";
import TaskFormScreen from "./screens/TaskFormScreen";
// Importa el stack navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Crea el stack de navegación
const Stack = createNativeStackNavigator();

// Componente principal de la app
const App = () => {
  return (
    // Envuelve toda la app para habilitar gestos
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Contenedor de navegación */}
      <NavigationContainer>
        <Stack.Navigator>
          {/* Tabs principales */}
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          {/* Pantalla para crear o editar tareas */}
          <Stack.Screen
            name="TaskFormScreen"
            component={TaskFormScreen}
            options={{
              title: "Crea una nueva actividad",
              headerStyle: {
                backgroundColor: "#6787a9",
              },
              headerTitleStyle: { color: "#f4f8fa" },
              headerTintColor: "#f4f8fa",
              headerBackVisible: false,
              headerLeft: () => null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

// Exporta el componente principal
export default App;

// Notas para desarrollo:
// Para el backend: cd .., luego cd backend, luego npm start
// Para la app: npx expo start
