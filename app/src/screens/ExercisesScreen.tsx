import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { fetchExercises } from '../controllers/ExerciseController';
import ExerciseModal from '../modals/ExerciseModal';
import { Exercise, portuguesMuscleGroup } from '../models/Exercise';
import { addButtonStyles, cardStyles, cardSubtitleStyles, cardTitleStyles, containerStyles, headerStyles, logoStyles, plusStyles, screenTitleFontSize } from '../assets/styles/global';
const { width, height } = Dimensions.get('window');
const logo = require('../assets/img/logo.png');

export default function ExercisesScreen() {
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
      <Text style={styles.header}>Exercícios</Text>

      <FlatList
        data={exercises}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => { setEditing(item); setModalVisible(true); }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{portuguesMuscleGroup[item.muscle_group]}</Text>
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
  container: containerStyles(width),
  logo: logoStyles(width),
  header: headerStyles(width),
  card: cardStyles(width),
  cardTitle: cardTitleStyles(width),
  cardSubtitle: cardSubtitleStyles(width),
  addButton: addButtonStyles(width),
  plus: plusStyles(width)
});