
import { View, StyleSheet, StatusBar } from "react-native";
import React from "react";


// Componente de layout general que envuelve el contenido de la pantalla
const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      {/* Barra de estado con color personalizado */}
      <StatusBar backgroundColor="#f4f8fa" />
      {/* Renderiza los componentes hijos */}
      {children}
    </View>
  );
};


// Estilos para el contenedor principal
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f8fa",
    padding: 20,
    flex: 1,
    alignItems: "center",
  },
});


// Exporta el componente para su uso en las pantallas
export default Layout;
