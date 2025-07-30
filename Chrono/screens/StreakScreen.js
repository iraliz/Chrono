

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Layout from "../components/Layout";
import { calculateStreak } from "../utils/streak";

const StreakScreen = () => {
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStreak = async () => {
      const s = await calculateStreak();
      setStreak(s);
      setLoading(false);
    };
    fetchStreak();
  }, []);

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.streakBox}>
          {loading ? (
            <ActivityIndicator size="large" color="#6787a9" />
          ) : streak ? (
            <>
              <Text style={styles.text}>🔥 Racha actual: {streak.currentCount} día/s</Text>
              <Text style={styles.subtext}>Último día: {streak.lastLoginDate}</Text>
              <Text style={styles.subtext}>Inicio de racha: {streak.startDate}</Text>
            </>
          ) : (
            <Text style={styles.text}>No hay racha registrada.</Text>
          )}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  streakBox: {
    backgroundColor: "#6787a9",
    padding: 24,
    borderRadius: 7,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 20,
    marginTop: 40,
  },
  text: {
    fontSize: 22,
    color: "#f2f9ec",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#dbe7f3",
    textAlign: "center",
    marginBottom: 4,
  },
});

export default StreakScreen;
