import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExercisesScreen from './src/screens/ExercisesScreen';
import TrainingSessionScreen from './src/screens/TrainingSessionScreen';
import TrainingHistoryScreen from './src/screens/TrainingHistoryScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Controle para alternar entre login e registro

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { 
              backgroundColor: '#E67E22', 
              height: 60, 
              borderTopWidth: 2,
              borderTopColor: 'white',
            },
            tabBarLabelStyle: { 
              fontSize: 14, 
              color: 'white', 
              fontWeight: 'bold', 
              flex: 1, 
              textAlign: 'center', 
              textAlignVertical: 'center' 
            },
            tabBarIconStyle: { display: 'none' },
            tabBarItemStyle: { flex: 1 },
            headerShown: false, 
          }}
        >
          <Tab.Screen name="Inicio" component={DashboardScreen} />
          <Tab.Screen name="Exercicios" component={ExercisesScreen} />
          <Tab.Screen name="Treinos" component={TrainingSessionScreen} />
          <Tab.Screen name="Historico" component={TrainingHistoryScreen} />
        </Tab.Navigator>
      ) : isRegistering ? (
        <RegisterScreen onRegister={() => setIsRegistering(false)} />
      ) : (
        <LoginScreen 
          onLogin={() => setIsAuthenticated(true)} 
          onNavigateToRegister={() => setIsRegistering(true)} 
        />
      )}
    </NavigationContainer>
  );
}