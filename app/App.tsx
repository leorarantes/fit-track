import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExercisesScreen from './src/screens/ExercisesScreen';
import TrainingSessionScreen from './src/screens/TrainingSessionScreen';
import TrainingHistoryScreen from './src/screens/TrainingHistoryScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { Dimensions, PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Solicita permissão para notificações no Android 13+
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      const apiLevel = parseInt(Platform.Version.toString(), 10);
      if (apiLevel >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    return true;
  };

  useEffect(() => {
    // Configura notificações (chame apenas uma vez)
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notificação recebida:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });

    // Cria canal (Android 8+)
    PushNotification.createChannel(
      {
        channelId: 'test-channel',
        channelName: 'Canal de Teste',
        channelDescription: 'Para notificações de teste',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`Canal criado: ${created}`)
    );

    // Solicita permissão e agenda notificação
    requestNotificationPermission().then((hasPermission) => {
      if (hasPermission) {
        const futureDate = new Date(Date.now() + 5000); // 10 segundos
        
      } else {
        console.warn('Permissão para notificações negada.');
      }
    });

  }, []);

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