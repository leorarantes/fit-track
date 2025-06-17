import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView, Alert } from 'react-native';
import * as TrainingSessionController from '../controllers/TrainingSessionController';
import * as TrainingSessionXExerciseController from '../controllers/TrainingSessionXExerciseController';
import * as ExerciseController from '../controllers/ExerciseController';
import { TrainingSession } from '../models/TrainingSession';
const { width, height } = Dimensions.get('window');
import { bigModalStyles, cardStyles, cardSubtitleStyles, cardTitleStyles, smallModalStyles } from '../assets/styles/global';
import { TrainingSessionXExercise } from '../models/TrainingSessionXExercise';
import { Exercise, portuguesMuscleGroup } from '../models/Exercise';

interface Props {
  visible: boolean;
  onClose: () => void;
  trainingSession: TrainingSession | null;
  testID?: string;
}

export default function TrainingSessionModal({ visible, onClose, trainingSession: trainingSession }: Props) {
  const isEdit = Boolean(trainingSession);
  console.log('isEdit', isEdit);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState<'hypertrophy' | 'strength' | 'resistance'>('hypertrophy');
  const [obs, setObs] = useState('');
  const [exercises, setExercises] = useState<TrainingSessionXExercise[]>([]);
  const [availableExercises, setAvailableExercises] = useState<Exercise[]>([]);
  const [editingExercise, setEditingExercise] = useState<TrainingSessionXExercise | null>(null);
  const [exerciseModalVisible, setExerciseModalVisible] = useState(false);

  useEffect(() => {
    if (trainingSession) loadTrainingSessionXExercises(trainingSession.id!);
    loadAvailableExercises();
  }, [trainingSession]);

  const loadTrainingSessionXExercises = async (trainingSessionId: number) => {
    const data = await TrainingSessionXExerciseController.fetch(trainingSessionId);
    setExercises(data);
  };

  const loadAvailableExercises = async () => {
    const data = await ExerciseController.fetchExercises();
    console.log('Exercícios disponíveis:', data); // Verifique os dados carregados
    setAvailableExercises(data);
  };

  const openExerciseModal = () => {
    if (availableExercises.length === 0) {
      Alert.alert('Aviso', 'É necessário cadastrar exercícios antes de adicioná-los.');
      return;
    }
    setEditingExercise(null);
    setExerciseModalVisible(true);
  };

  const selectExercise = (exerciseId?: number) => {
    if (exerciseId && trainingSession && trainingSession.id) {
      setEditingExercise((prev) => trainingSession?.id ? {
        ...prev!,
        training_session_id: trainingSession.id,
        exercise_id: exerciseId
      } : prev);
    }
  };

  const saveExercise = async (tsxe: Omit<TrainingSessionXExercise, 'id'>) => {
    if (editingExercise?.id) {
      await TrainingSessionXExerciseController.update({ ...editingExercise, ...tsxe });
      setExercises((prev) =>
        prev.map((ex) => (ex.id === editingExercise.id ? { ...editingExercise, ...tsxe } : ex))
      );
    } else {
      const createdExercise = await TrainingSessionXExerciseController.create(tsxe);
      setExercises((prev) => [...prev, createdExercise]);
    }
    setExerciseModalVisible(false);
  };

  const deleteExercise = async (id: number) => {
    await TrainingSessionXExerciseController.remove(id);
    setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
    setEditingExercise(null);
    setExerciseModalVisible(false);
  };

  const submit = async () => {
    const data: TrainingSession = { id: trainingSession?.id, name, date, type, observations: obs } as TrainingSession;
    isEdit ? await TrainingSessionController.editTrainingSession(data) : await TrainingSessionController.createTrainingSession(data);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullScreenContainer}>
        <View>
          <Text style={styles.header}>{isEdit ? 'Editar' : 'Novo'} Treino</Text>
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
          <Text style={styles.title}>Exercícios</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button]} onPress={() => openExerciseModal()}>
              <Text style={styles.buttonText}>+ Adicionar Exercício</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.marginButton]} onPress={submit}>
              <Text style={styles.buttonText}>Salvar Sessão</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cancelButton, styles.marginButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isEdit && 
          <FlatList
          data={exercises}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => { selectExercise(item.id); }}
              testID={`exerciseCard-${item.id}`}
            >
              <Text style={styles.cardTitle} testID={`trainingSessionXExerciseId-${item.id}`}>{item.id}</Text>
            </TouchableOpacity>
          )}
          testID="exerciseList"
        />
      }
      {isEdit ? 
        exerciseModalVisible && (
          <Modal visible={exerciseModalVisible} transparent animationType="slide" testID="exerciseModal">
            <View style={styles.smallModalBackdrop} testID="modalBackdrop">
              <View style={styles.smallModal} testID="modalContent">
                {editingExercise ? (
                    <View>
                      <Text style={styles.title} testID="modalHeader">Exercício</Text>
                      <TextInput
                        placeholder="Peso"
                        value={String(editingExercise?.weight || '')}
                        onChangeText={(text) => setEditingExercise((prev) => ({ ...prev!, weight: Number(text) }))}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Sets"
                        value={String(editingExercise?.sets || '')}
                        onChangeText={(text) => setEditingExercise((prev) => ({ ...prev!, sets: Number(text) }))}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Reps"
                        value={String(editingExercise?.reps || '')}
                        onChangeText={(text) => setEditingExercise((prev) => ({ ...prev!, reps: Number(text) }))}
                        style={styles.input}
                      />
                      <View style={styles.row}>
                        <TouchableOpacity style={[styles.button]} onPress={() => saveExercise} testID="saveButton">
                          <Text style={styles.buttonTextSmall}>Salvar</Text>
                        </TouchableOpacity>
                        {editingExercise.id && 
                          <TouchableOpacity style={[styles.deleteButton]} onPress={() => deleteExercise} testID="deleteButton">
                            <Text style={styles.buttonTextSmall}>Deletar</Text>
                          </TouchableOpacity>
                        }
                      </View>
                    </View>
                  ) : <View>
                    <Text style={styles.title} testID="modalHeader">Selecionar Exercício</Text>
                      <FlatList
                        data={availableExercises}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.card}
                            onPress={() => { selectExercise(item.id); }}
                            testID={`availableExerciseCard-${item.id}`}
                          >
                            <Text style={styles.cardTitle} testID={`availableExerciseName-${item.id}`}>{item.name}</Text>
                            <Text style={styles.cardSubtitle} testID={`availableExerciseMuscleGroup-${item.muscle_group}`}>
                              {portuguesMuscleGroup[item.muscle_group]}
                            </Text>
                          </TouchableOpacity>
                        )}
                        testID="availableExerciseList"
                      />
                  </View>
                }
                <View style={styles.row}>
                  <TouchableOpacity style={[styles.cancelButton]} onPress={() => setExerciseModalVisible(false)} testID="cancelButton">
                    <Text style={styles.buttonTextSmall}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )
        : <View></View>
      }
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: bigModalStyles.fullScreenContainer(width),
  header: bigModalStyles.header(width),
  input: bigModalStyles.input(),
  row: bigModalStyles.row(),
  column: bigModalStyles.column(),
  button: bigModalStyles.button(),
  selectedButton: bigModalStyles.selectedButton(),
  buttonText: bigModalStyles.buttonText(),
  card: cardStyles(width),
  cardTitle: cardTitleStyles(width),
  cardSubtitle: cardSubtitleStyles(width),
  addButton: bigModalStyles.saveButton(),
  saveButton: bigModalStyles.saveButton(),
  cancelButton: bigModalStyles.cancelButton(),
  deleteButton: bigModalStyles.deleteButton(),
  buttonTextSmall: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  marginButton: {
    marginTop: 10,
  },
  title: smallModalStyles.header(width),
  smallModalBackdrop: smallModalStyles.backdrop(),
  smallModal: smallModalStyles.modal()
});