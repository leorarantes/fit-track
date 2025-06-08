import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { fetchExercises } from '../controllers/ExerciseController';
import ExerciseModal from './ExerciseModal';
import { Exercise } from '../models/Exercise';
import logo from '../assets/logo.svg';

export default function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Exercise | null>(null);

  const load = async () => {
    const data = await fetchExercises();
    setExercises(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Exercícios</Text>
      <FlatList
        data={exercises}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => { setEditing(item); setModalVisible(true); }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>{item.muscle_group}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => { setEditing(null); setModalVisible(true); }}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      <ExerciseModal visible={modalVisible} onClose={() => { setModalVisible(false); load(); }} exercise={editing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF6F0', padding: 16 },
  logo: { width: 120, height: 40, alignSelf: 'center', marginBottom: 8 },
  title: { fontSize: 24, color: '#E67E22', textAlign: 'center', marginBottom: 16 },
  card: { backgroundColor: '#FFF', marginVertical: 8, padding: 12, borderRadius: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  addButton: { position: 'absolute', bottom: 24, right: 24, backgroundColor: '#E67E22', width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  plus: { color: '#FFF', fontSize: 32 }
});