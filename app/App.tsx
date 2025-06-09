import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExercisesScreen from './src/screens/ExercisesScreen';
import TrainingSessionScreen from './src/screens/TrainingSessionScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { 
            backgroundColor: '#E67E22', 
            height: 60, 
            borderTopWidth: 2,
            borderTopColor: 'white',
          },
          tabBarLabelStyle: { 
            fontSize: 22, 
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
        <Tab.Screen name="Exercícios" component={ExercisesScreen} />
        <Tab.Screen name="Treinos" component={TrainingSessionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}