import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Dimensions, Image } from 'react-native';
import { create } from "../controllers/UserController";
import { containerStyles, fullScreenModalStyles, logoStyles, smallModalStyles } from '../assets/styles/global';
const { width, height } = Dimensions.get('window');
const logo = require('../assets/img/logo.png');

export default function RegisterScreen({ onRegister }: { onRegister: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await create({ name, email, password });
      onRegister();
    } catch (error) {
      console.error('Erro ao registrar:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar realizar o cadastro.');
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Image source={logo} style={styles.logo} testID="logoImage" />
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        testID="nameInput"
      />
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
      <TouchableOpacity onPress={handleRegister} style={[styles.button, { marginTop: 20 }]} testID="registerButton">
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onRegister} testID="navigateToLoginButton">
        <Text style={{ marginTop: 20, color: 'blue' }}>Já tem uma conta? Faça login!</Text>
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