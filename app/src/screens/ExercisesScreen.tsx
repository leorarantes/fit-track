import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { fetchExercises } from '../controllers/ExerciseController';
import ExerciseModal from '../modals/ExerciseModal';
import { Exercise, portuguesMuscleGroup } from '../models/Exercise';
import { addButtonStyles, cardStyles, cardSubtitleStyles, cardTitleStyles, containerStyles, flexJustifyBetweenStyles, headerStyles, logoStyles, plusStyles, screenTitleFontSize } from '../assets/styles/global';
import ReminderModal from '../modals/ReminderModal';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
const logo = require('../assets/img/logo.png');


export default function ExercisesScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReminder, setModalReminder] = useState(false);
  const [editing, setEditing] = useState<Exercise | null>(null);

  const load = async () => {
    const data = await fetchExercises();
    setExercises(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container} testID="exercisesScreen">
      <View style={styles.flexJustifyBetween}>
        <Image source={logo} style={styles.logo} />
        <Icon name="bell" size={30} color="#E67E22" onPress={() => { setEditing(null); setModalReminder(true); }} />
      </View>      
      <Text style={styles.header} testID="headerText">Exercícios</Text>

      <FlatList
        data={exercises}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => { setEditing(item); setModalVisible(true); }}
            testID={`exerciseCard-${item.id}`}
          >
            <Text style={styles.cardTitle} testID={`exerciseName-${item.id}`}>{item.name}</Text>
            <Text style={styles.cardSubtitle} testID={`exerciseMuscleGroup-${item.id}`}>
              {portuguesMuscleGroup[item.muscle_group]}
            </Text>
          </TouchableOpacity>
        )}
        testID="exerciseList"
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => { setEditing(null); setModalVisible(true); }}
        testID="plusButton"
      >
        <Text style={styles.plus} testID="plusText">+</Text>
      </TouchableOpacity>

      <ExerciseModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); load(); }}
        exercise={editing}
        testID="exerciseModal"
      />

      <ReminderModal visible={modalReminder} onClose={() => { setModalReminder(false); load(); }}
        testID="reminderModal"></ReminderModal>
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
  plus: plusStyles(width),
  flexJustifyBetween: flexJustifyBetweenStyles(width),
});