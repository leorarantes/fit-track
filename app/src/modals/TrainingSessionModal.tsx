import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { createTrainingSession, editTrainingSession } from '../controllers/TrainingSessionController';
import { deleteTrainingSession, TrainingSession } from '../models/TrainingSession';
const { width, height } = Dimensions.get('window');
import { modalStyles } from '../assets/styles/global';
import { useIsFocused } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

interface Props {
  visible: boolean;
  onClose: () => void;
  session: TrainingSession | null;
  testID?: string;
}

export default function TrainingSessionModal({ visible, onClose, session }: Props) {
  const isEdit = Boolean(session);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'hypertrophy' | 'strength' | 'resistance'>('hypertrophy');
  const [obs, setObs] = useState('');
  const isFocused = useIsFocused();


  useEffect(() => {
    if (!visible) return;
    if (session) {
      setName(session.name);
      setDate(session.date);
      setType(session.type || 'hypertrophy');
      setObs(session.observations || '');
    } else {
      setName('');
      setDate('');
      setType('hypertrophy');
      setObs('');
    }
  }, [visible, session]);

  const submit = async () => {
    const data: TrainingSession = { id: session?.id, name, date, type, observations: obs } as TrainingSession;
    isEdit ? await editTrainingSession(data) : await createTrainingSession(data);
    onClose();
  };

  const handleDelete = async () => {
    if (session?.id) {
      await deleteTrainingSession(session.id);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" testID="trainingSessionModal">
      <View style={styles.backdrop} testID="modalBackdrop">
        <View style={styles.modal} testID="modalContent">
          <Text style={styles.header} testID="modalHeader">{isEdit ? 'Editar' : 'Nova'} Sessão de Treino</Text>
          <Text testID="nameLabel">Nome: </Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} testID="nameInput" />
          <Text testID="dateLabel">Data: </Text>
          <TextInputMask type={'datetime'} options={{ format: 'YYYY-MM-DD' }} value={date} onChangeText={setDate} style={styles.input} placeholder="YYYY-MM-DD" testID="dateInput" />
          <Text testID="typeLabel">Tipo: </Text>
          <View style={styles.row} testID="typeButtons">
            <TouchableOpacity style={[styles.button, type === 'hypertrophy' && styles.selectedButton]} onPress={() => setType('hypertrophy')} testID="typeButton-hypertrophy">
              <Text style={styles.buttonText}>Hipertrofia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, type === 'strength' && styles.selectedButton]} onPress={() => setType('strength')} testID="typeButton-strength">
              <Text style={styles.buttonText}>Força</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, type === 'resistance' && styles.selectedButton]} onPress={() => setType('resistance')} testID="typeButton-resistance">
              <Text style={styles.buttonText}>Resistência</Text>
            </TouchableOpacity>
          </View>
          <TextInput placeholder="Observações" value={obs} onChangeText={setObs} style={[styles.input, { height: 60 }]} multiline testID="obsInput" />
          <View style={styles.row} testID="actionButtons">
            <TouchableOpacity style={styles.saveButton} onPress={submit} testID="saveButton">
              <Text style={styles.buttonText}>{isEdit ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
            {isEdit && (
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete} testID="deleteButton">
                <Text style={styles.buttonText}>Deletar</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.cancelButton} onPress={onClose} testID="cancelButton">
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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