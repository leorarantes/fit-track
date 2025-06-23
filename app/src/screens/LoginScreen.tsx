import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Dimensions, Image } from 'react-native';
import { authenticateUser } from '../controllers/UserController';
import { containerStyles, fullScreenModalStyles, logoStyles, smallModalStyles } from '../assets/styles/global';
const { width, height } = Dimensions.get('window');
const logo = require('../assets/img/logo.png');

export default function LoginScreen({ onLogin, onNavigateToRegister }: { onLogin: () => void; onNavigateToRegister: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const user = await authenticateUser(email, password);
      if (user) onLogin();
      else Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Image source={logo} style={styles.logo} testID="logoImage" />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        testID="emailInput"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="passwordInput"
      />
      <TouchableOpacity onPress={handleLogin} style={[styles.button, { marginTop: 20 }]} testID="loginButton">
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNavigateToRegister} testID="navigateToRegisterButton">
        <Text style={{ marginTop: 20, color: 'blue' }}>Não tem uma conta? Cadastre-se!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: containerStyles(width),
  logo: logoStyles(width),
  title: smallModalStyles.header(),
  input: fullScreenModalStyles.input(),
  buttonText: fullScreenModalStyles.buttonText(),
  button: fullScreenModalStyles.columnButton(),
});