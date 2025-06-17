import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { createExercise, editExercise } from '../controllers/ExerciseController';
import { deleteExercise, Exercise } from '../models/Exercise';
const { width, height } = Dimensions.get('window');
import { smallModalStyles } from '../assets/styles/global';

interface Props {
  visible: boolean;
  onClose: () => void;
  exercise: Exercise | null;
  testID?: string;
}

export default function ExerciseModal({ visible, onClose, exercise }: Props) {
  const isEdit = Boolean(exercise);
  const [name, setName] = useState('');
  const [muscle, setMuscle] = useState<Exercise['muscle_group']>('arms');
  const [obs, setObs] = useState('');
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (exercise) {
      setName(exercise.name);
      setMuscle(exercise.muscle_group);
      setObs(exercise.observations || '');
      setFav(exercise.favorite);
    } else {
      setName('');
      setMuscle('arms');
      setObs('');
      setFav(false);
    }
  }, [exercise]);

  const submit = async () => {
    const data: Exercise = { id: exercise?.id, name, muscle_group: muscle, observations: obs, favorite: fav } as Exercise;
    isEdit ? await editExercise(data) : await createExercise(data);
    onClose();
  };

  const handleDelete = async () => {
    if (exercise?.id) {
      await deleteExercise(exercise.id);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" testID="exerciseModal">
      <View style={styles.backdrop} testID="modalBackdrop">
        <View style={styles.modal} testID="modalContent">
          <Text style={styles.header} testID="modalHeader">{isEdit ? 'Editar' : 'Novo'} Exercício</Text>
          <Text testID="nameLabel">Nome: </Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} testID="nameInput" />
          <Text testID="muscleGroupLabel">Grupo Muscular: </Text>
          <View style={styles.row} testID="muscleGroupButtons">
            <TouchableOpacity style={[styles.button, muscle === 'arms' && styles.selectedButton]} onPress={() => setMuscle('arms')} testID="muscleButton-arms">
              <Text style={styles.buttonText}>Braços</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, muscle === 'back' && styles.selectedButton]} onPress={() => setMuscle('back')} testID="muscleButton-back">
              <Text style={styles.buttonText}>Costas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, muscle === 'chest' && styles.selectedButton]} onPress={() => setMuscle('chest')} testID="muscleButton-chest">
              <Text style={styles.buttonText}>Peito</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, muscle === 'legs' && styles.selectedButton]} onPress={() => setMuscle('legs')} testID="muscleButton-legs">
              <Text style={styles.buttonText}>Pernas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, muscle === 'shoulders' && styles.selectedButton]} onPress={() => setMuscle('shoulders')} testID="muscleButton-shoulders">
              <Text style={styles.buttonText}>Ombros</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, muscle === 'core' && styles.selectedButton]} onPress={() => setMuscle('core')} testID="muscleButton-core">
              <Text style={styles.buttonText}>Abdômen</Text>
            </TouchableOpacity>
          </View>
          <TextInput placeholder="Observações" value={obs} onChangeText={setObs} style={[styles.input, { height: 60 }]} multiline testID="obsInput" />
          <View style={styles.row} testID="favoriteRow">
            <Text testID="favoriteLabel">Favorito</Text>
            <CheckBox value={fav} onValueChange={setFav} testID="favoriteCheckbox" />
          </View>
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
  backdrop: smallModalStyles.backdrop(),
  modal: smallModalStyles.modal(),
  header: smallModalStyles.header(width),
  input: smallModalStyles.input(),
  row: smallModalStyles.row(),
  button: smallModalStyles.button(width),
  selectedButton: smallModalStyles.selectedButton(),
  buttonText: smallModalStyles.buttonText(),
  saveButton: smallModalStyles.saveButton(),
  deleteButton: { ...smallModalStyles.saveButton(), backgroundColor: 'red' },
  cancelButton: smallModalStyles.cancelButton(),
});