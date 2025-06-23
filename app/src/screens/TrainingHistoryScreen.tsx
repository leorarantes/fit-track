import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { fetchTrainingHistory } from '../controllers/TrainingHistoryController';
import TrainingHistoryModal from '../modals/TrainingHistoryModal';
import { TrainingSession } from '../models/TrainingSession';
import { addButtonStyles, cardStyles, cardSubtitleStyles, cardTitleStyles, containerStyles, flexJustifyBetweenStyles, headerStyles, iconStyles, leadTableStyles, logoStyles, plusStyles, screenTitleFontSize } from '../assets/styles/global';
import { TrainingHistory } from '../models/TrainingHistory';
const { width, height } = Dimensions.get('window');
const logo = require('../assets/img/logo.png');
import Icon from 'react-native-vector-icons/FontAwesome';
import ReminderModal from '../modals/ReminderModal';

export default function TrainingHistoryScreen() {
  const [sessions, setSessions] = useState<TrainingHistory[]>([]);
  const [modalVisibleHistory, setModalVisibleHistory] = useState(false);
  const [modalReminder, setModalReminder] = useState(false);
  const [editing, setEditing] = useState<TrainingHistory | null>(null);

  const load = async () => {
    const data = await fetchTrainingHistory();
    setSessions(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container} testID="trainingHistoryScreen">
      <View style={styles.flexJustifyBetween}>
        <Image source={logo} style={styles.logo} />
        <Icon name="bell" size={30} color="#E67E22" onPress={() => { setEditing(null); setModalReminder(true); }} />
      </View>
      <Text style={styles.header}>Historico</Text>
      <View style={styles.flexJustifyBetween}>
        <Text style={styles.leadTable}>Data de Início</Text>
        <Text style={styles.leadTable}>Data de Fim</Text>
      </View>


      <FlatList
        testID="historyList"
        data={sessions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity testID={`trainingHistoryCard-${item.id}`} style={styles.card} onPress={() => { setEditing(item); setModalVisibleHistory(true); }}>
            <Text style={styles.cardSubtitle}>{item.date_beg}</Text>
            <Text style={styles.cardSubtitle}>{item.date_end}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity testID="plusButton" style={styles.addButton} onPress={() => { setEditing(null); setModalVisibleHistory(true); }}>
        <Text style={styles.plus} testID="plusText">+</Text>
      </TouchableOpacity>

      <TrainingHistoryModal testID="trainingHistoryModal" visible={modalVisibleHistory} onClose={() => { setModalVisibleHistory(false); load(); }} session={editing} />
      
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
  leadTable: leadTableStyles(width),
  flexJustifyBetween: flexJustifyBetweenStyles(width),
  icon: iconStyles()
});