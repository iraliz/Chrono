import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import StreakScreen from "./screens/StreakScreen";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#6787a9',
        tabBarInactiveTintColor: '#b6cdda',
        tabBarStyle: { backgroundColor: '#f4f8fa', borderTopWidth: 0.5, borderTopColor: '#b6cdda' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Calendario') iconName = 'calendar-outline';
          else if (route.name === 'Streak') iconName = 'flame-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Chrono', 
          headerShown: true, 
          headerStyle: { backgroundColor: '#6787a9' },
          headerTitleStyle: { color: '#f4f8fa', fontSize: 21 },
          headerTintColor: '#f4f8fa',
        }} 
      />
      <Tab.Screen 
        name="Calendario" 
        component={CalendarScreen} 
        options={{
          title: 'Calendario',
          headerShown: true,
          headerStyle: { backgroundColor: '#6787a9' },
          headerTitleStyle: { color: '#f4f8fa', fontSize: 21 },
          headerTintColor: '#f4f8fa',
        }}
      />
      <Tab.Screen 
        name="Streak" 
        component={StreakScreen} 
        options={{
          title: 'Streak',
          headerShown: true,
          headerStyle: { backgroundColor: '#6787a9' },
          headerTitleStyle: { color: '#f4f8fa', fontSize: 21 },
          headerTintColor: '#f4f8fa',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
