import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExercisesScreen from './src/screens/ExercisesScreen';
import TrainingSessionScreen from './src/screens/TrainingSessionScreen';
import TrainingHistoryScreen from './src/screens/TrainingHistoryScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { cardSubtitleStyles, cardTitleStyles } from './src/assets/styles/global';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

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
        <Tab.Screen name="Início" component={DashboardScreen} />
        <Tab.Screen name="Exercícios" component={ExercisesScreen} />
        <Tab.Screen name="Treinos" component={TrainingSessionScreen} />
        <Tab.Screen name="Histórico" component={TrainingHistoryScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  cardSubtitle: cardSubtitleStyles(width),
});