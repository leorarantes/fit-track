import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { editTrainingSession } from '../controllers/TrainingSessionController';
import { deleteTrainingSession, getAllTrainingSessionsDateFilter } from '../models/TrainingSession';
const { width, height } = Dimensions.get('window');
import { cardStyles, cardSubtitleStyles, cardTitleStyles, modalStyles } from '../assets/styles/global';
import { createTrainingHistory } from '../controllers/TrainingHistoryController';
import { TrainingHistory } from '../models/TrainingHistory';
import { TextInputMask } from 'react-native-masked-text';

interface Props {
  visible: boolean;
  onClose: () => void;
  session: TrainingHistory | null;
}

var data: any = [];

export default function TrainingHistoryModal({ visible, onClose, session }: Props) {
  const isEdit = Boolean(session);
  const [dateBeg, setDateBeg] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [data, setData] = useState<any[]>([]);
 
  useEffect(() => {
    if (session) {
      setDateBeg(session.date_beg);
      setDateEnd(session.date_end);
      (async () => {
        const db = await getAllTrainingSessionsDateFilter(session.date_beg, session.date_end);
        setData(db);
      })();
      
    }else{
      setDateBeg('');
      setDateEnd('');
    }
  }, [session]);

  

  const submit = async () => {
    const data: TrainingHistory = { id: session?.id, date_beg: dateBeg, date_end: dateEnd } as TrainingHistory;
    await createTrainingHistory(data);
    onClose();
  };

  const handleDelete = async () => {
    if (session?.id) {
      await deleteTrainingSession(session.id);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        {!isEdit && <View style={styles.modal}>
          <Text style={styles.header}>Novo Histórico</Text>
          <Text>Data de Início: </Text>
          <TextInputMask type={'datetime'} value={dateBeg} options={{format: 'YYYY-MM-DD'}} onChangeText={setDateBeg} style={styles.input} placeholder="YYYY-MM-DD" />
          <Text>Data de Fim: </Text>
          <TextInputMask type={'datetime'} value={dateEnd} options={{format: 'YYYY-MM-DD'}} onChangeText={setDateEnd} style={styles.input} placeholder="YYYY-MM-DD" />
          
          <View style={styles.row}>
            <TouchableOpacity style={styles.saveButton} onPress={submit}>
              <Text style={styles.buttonText}>{isEdit ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>}
        {isEdit && data && <View style={styles.modal}>
          <Text style={styles.header}>Histórico</Text>
          <Text>Data de Início: </Text>
          <TextInputMask editable={false} type={'datetime'} value={dateBeg} options={{format: 'YYYY-MM-DD'}} onChangeText={setDateBeg} style={styles.input} placeholder="YYYY-MM-DD" />
          <Text>Data de Fim: </Text>
          <TextInputMask editable={false} type={'datetime'} value={dateEnd} options={{format: 'YYYY-MM-DD'}} onChangeText={setDateEnd} style={styles.input} placeholder="YYYY-MM-DD" />
          <View>
            <FlatList
                    data={data}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                      <View style={styles.card}>
                        <Text style={styles.cardSubtitle}>{item.name}</Text>
                        <Text style={styles.cardSubtitle}>{item.type}</Text>
                        <Text style={styles.cardSubtitle}>{item.date}</Text>
                      </View>
                    )}
                  />
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.saveButton} onPress={submit}>
              <Text style={styles.buttonText}>{isEdit ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: cardStyles(width),
  cardTitle: cardTitleStyles(width),
  cardSubtitle: cardSubtitleStyles(width),
  backdrop: modalStyles.backdrop(),
  modal: modalStyles.modal(),
  header: modalStyles.header(width),
  input: modalStyles.input(),
  row: modalStyles.row(),
  button: modalStyles.button(width),
  selectedButton: modalStyles.selectedButton(),
  buttonText: modalStyles.buttonText(),
  saveButton: modalStyles.saveButton(),
  deleteButton: { ...modalStyles.saveButton(), backgroundColor: 'red' }, // Estilo para o botão de deletar
  cancelButton: modalStyles.cancelButton(),
});