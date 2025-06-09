import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { createTrainingSession, editTrainingSession } from '../controllers/TrainingSessionController';
import { deleteTrainingSession, TrainingSession } from '../models/TrainingSession';
const { width, height } = Dimensions.get('window');
import { modalStyles } from '../assets/styles/global';

interface Props {
  visible: boolean;
  onClose: () => void;
  session: TrainingSession | null;
}

export default function TrainingSessionModal({ visible, onClose, session }: Props) {
  const isEdit = Boolean(session);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'hypertrophy' | 'strength' | 'resistance'>('hypertrophy');
  const [obs, setObs] = useState('');

  useEffect(() => {
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
  }, [session]);

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
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.header}>{isEdit ? 'Editar' : 'Nova'} Sessão de Treino</Text>
          <Text>Nome: </Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
          <Text>Data: </Text>
          <TextInput value={date} onChangeText={setDate} style={styles.input} placeholder="YYYY-MM-DD" />
          <Text>Tipo: </Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, type === 'hypertrophy' && styles.selectedButton]} onPress={() => setType('hypertrophy')}>
              <Text style={styles.buttonText}>Hipertrofia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, type === 'strength' && styles.selectedButton]} onPress={() => setType('strength')}>
              <Text style={styles.buttonText}>Força</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, type === 'resistance' && styles.selectedButton]} onPress={() => setType('resistance')}>
              <Text style={styles.buttonText}>Resistência</Text>
            </TouchableOpacity>
          </View>
          <TextInput placeholder="Observações" value={obs} onChangeText={setObs} style={[styles.input, { height: 60 }]} multiline />
          <View style={styles.row}>
            <TouchableOpacity style={styles.saveButton} onPress={submit}>
              <Text style={styles.buttonText}>{isEdit ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
            {isEdit && (
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.buttonText}>Deletar</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
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