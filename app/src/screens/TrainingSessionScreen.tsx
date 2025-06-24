import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { fetchTrainingSessions } from '../controllers/TrainingSessionController';
import TrainingSessionModal from '../modals/TrainingSessionModal';
import { TrainingSession } from '../models/TrainingSession';
import { addButtonStyles, cardStyles, cardSubtitleStyles, cardTitleStyles, containerStyles, flexJustifyBetweenStyles, headerStyles, logoStyles, plusStyles, screenTitleFontSize } from '../assets/styles/global';
import ReminderModal from '../modals/ReminderModal';
const { width, height } = Dimensions.get('window');
const logo = require('../assets/img/logo.png');
import Icon from 'react-native-vector-icons/FontAwesome';


export default function TrainingSessionScreen() {
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReminder, setModalReminder] = useState(false);
  const [editing, setEditing] = useState<TrainingSession | null>(null);

  const load = async () => {
    const data = await fetchTrainingSessions();
    setSessions(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container} testID="trainingSessionScreen">
      <View style={styles.flexJustifyBetween}>
        <Image source={logo} style={styles.logo} />
        <Icon testID="iconeSino" name="bell" size={30} color="#E67E22" onPress={() => { setEditing(null); setModalReminder(true); }} />
      </View>

      <Text style={styles.header} testID="headerText">Treinos</Text>

      <FlatList
        data={sessions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity testID={`trainingSessionCard-${item.id}`} style={styles.card} onPress={() => { setEditing(item); setModalVisible(true); }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.type}</Text>
            <Text style={styles.cardSubtitle}>{item.date}</Text>
          </TouchableOpacity>
        )}
        testID="trainingSessionList"
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => { setEditing(null); setModalVisible(true); }}
        testID="plusButton"
      >
        <Text style={styles.plus} testID="plusText">+</Text>
      </TouchableOpacity>

      <TrainingSessionModal
        visible={modalVisible}
        onClose={() => { setModalVisible(false); load(); }}
        trainingSession={editing}
        testID="trainingSessionModal"
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
  flexJustifyBetween: flexJustifyBetweenStyles(width)
});