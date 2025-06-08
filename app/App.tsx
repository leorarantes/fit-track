import React from 'react';
import { SafeAreaView } from 'react-native';
import ExercisesScreen from './src/screens/ExercisesScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ExercisesScreen />
    </SafeAreaView>
  );
}
