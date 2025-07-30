import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Layout from "../components/Layout";
import CalendarView from "../components/CalendarView";
import { getTasks } from "../src/api";

const CalendarScreen = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <Layout>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CalendarView tasks={tasks} />
      </View>
    </Layout>
  );
};

export default CalendarScreen;
