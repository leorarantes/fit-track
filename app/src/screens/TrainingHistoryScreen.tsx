import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { fetchTrainingHistory } from '../controllers/TrainingHistoryController';
import TrainingHistoryModal from '../modals/TrainingHistoryModal';
import { TrainingSession } from '../models/TrainingSession';
import { addButtonStyles, cardStyles, cardSubtitleStyles, cardTitleStyles, containerStyles, flexJustifyBetweenStyles, headerStyles, leadTableStyles, logoStyles, plusStyles, screenTitleFontSize } from '../assets/styles/global';
import { TrainingHistory } from '../models/TrainingHistory';
const { width, height } = Dimensions.get('window');
const logo = require('../assets/img/logo.png');

export default function TrainingHistoryScreen() {
  const [sessions, setSessions] = useState<TrainingHistory[]>([]);
  const [modalVisibleHistory, setModalVisibleHistory] = useState(false);
  const [editing, setEditing] = useState<TrainingHistory | null>(null);

  const load = async () => {
    const data = await fetchTrainingHistory();
    setSessions(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <View style={styles.container} testID="trainingHistoryScreen">
      <Image source={logo} style={styles.logo} />
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
  flexJustifyBetween: flexJustifyBetweenStyles(width)
});