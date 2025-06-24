import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, FlatList, ScrollView, Alert } from 'react-native';
import * as TrainingSessionController from '../controllers/TrainingSessionController';
import * as TrainingSessionXExerciseController from '../controllers/TrainingSessionXExerciseController';
import * as ExerciseController from '../controllers/ExerciseController';
import { TrainingSession } from '../models/TrainingSession';
const { width, height } = Dimensions.get('window');
import { fullScreenModalStyles, cardStyles, cardSubtitleStyles, cardTitleStyles, smallModalStyles, redBackground, grayBackground } from '../assets/styles/global';
import { TrainingSessionXExercise } from '../models/TrainingSessionXExercise';
import { Exercise, portuguesMuscleGroup } from '../models/Exercise';

interface Props {
  visible: boolean;
  onClose: () => void;
  trainingSession: TrainingSession | null;
  testID?: string;
}

export default function TrainingSessionModal({ visible, onClose, trainingSession }: Props) {
  const [name, setName] = useState(trainingSession ? trainingSession.name : '');
  const [date, setDate] = useState(trainingSession ? trainingSession.date : '');
  const [type, setType] = useState<'hypertrophy' | 'strength' | 'resistance'>('hypertrophy');
  const [obs, setObs] = useState(trainingSession ? trainingSession.observations : '');
  const [trainingSessionXExerciseList, setTrainingSessionXExerciseList] = useState<TrainingSessionXExercise[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [trainingSessionXExercise, setTrainingSessionXExercise] = useState<TrainingSessionXExercise | null>(null);
  const [smallModalVisible, setsmallModalVisible] = useState(false);

  useEffect(() => {
    if (trainingSession && trainingSession.id) {
      setName(trainingSession.name);
      setDate(trainingSession.date);
      setType(trainingSession.type);
      setObs(trainingSession.observations);
      loadTrainingSessionXExerciseList(trainingSession.id);
    } else {
      setName('');
      setDate('');
      setType('hypertrophy');
      setObs('');
      setTrainingSessionXExerciseList([]);
      setTrainingSessionXExercise(null);
    }
    loadExercises();
  }, [trainingSession]);

  const loadTrainingSessionXExerciseList = async (trainingSessionId: number) => {
    const data = await TrainingSessionXExerciseController.fetch(trainingSessionId);
    setTrainingSessionXExerciseList(data);
  };

  const loadExercises = async () => {
    const data = await ExerciseController.fetchExercises();
    setExercises(data);
  };

  const addTrainingSessionXExercise = () => {
    if (exercises.length === 0) {
      Alert.alert('Aviso', 'É necessário cadastrar exercícios antes de adicioná-los.');
      return;
    }
    setTrainingSessionXExercise(null);
    setsmallModalVisible(true);
  };

  const selectExercise = (exerciseId?: number) => {
    if (exerciseId && trainingSession && trainingSession.id) {
      setTrainingSessionXExercise({
        training_session_id: trainingSession.id,
        exercise_id: exerciseId,
        weight: 0,
        sets: 0,
        reps: 0
      }
      );
    }
  };

  const selectTrainingSessionXExercise = (id?: number) => {
    if (!id) return;
    const selected = trainingSessionXExerciseList.find((tsxe) => tsxe.id === id);
    if (selected) {
      setTrainingSessionXExercise({ ...selected });
      setsmallModalVisible(true);
    }
  }

  const saveTrainingSessionXExercise = async () => {
    if (trainingSessionXExercise?.id) {
      await TrainingSessionXExerciseController.update({ ...trainingSessionXExercise });
      setTrainingSessionXExercise(null);
      if (trainingSession && trainingSession.id) loadTrainingSessionXExerciseList(trainingSession.id);
    } else if (trainingSessionXExercise) {
      await TrainingSessionXExerciseController.create({ ...trainingSessionXExercise });
      setTrainingSessionXExercise(null);
      if (trainingSession && trainingSession.id) loadTrainingSessionXExerciseList(trainingSession.id);
    }
    setsmallModalVisible(false);
  };

  const saveTrainingSession = async () => {
    const data: TrainingSession = { id: trainingSession?.id, name, date, type, observations: obs };
    if (trainingSession) await TrainingSessionController.update(data)
    else await TrainingSessionController.create(data);
    setName('');
    setDate('');
    setType('hypertrophy');
    setObs('');
    setTrainingSessionXExerciseList([]);
    setTrainingSessionXExercise(null);
    setsmallModalVisible(false);
    onClose();
  };

  const deleteTrainingSessionXExercise = async () => {
    if (trainingSessionXExercise?.id) {
      await TrainingSessionXExerciseController.remove(trainingSessionXExercise?.id);
      setTrainingSessionXExercise(null);
      if (trainingSession && trainingSession.id) loadTrainingSessionXExerciseList(trainingSession.id);
      setsmallModalVisible(false);
    }
  };

  const getExerciseNameById = (id?: number): string => {
    const exercise = exercises.find((ex) => ex.id === id);
    return exercise ? exercise.name : 'Exercício Desconhecido';
  };

  const getExerciseMuscleGroupById = (id?: number): string => {
    const exercise = exercises.find((ex) => ex.id === id);
    if(exercise && portuguesMuscleGroup[exercise.muscle_group]) return portuguesMuscleGroup[exercise.muscle_group];
    return 'Desconhecido';
  };

  const deleteTrainingSession = async () => {
    if (trainingSession?.id) {
      for (const tsxe of trainingSessionXExerciseList) {
        if (tsxe.id) await TrainingSessionXExerciseController.remove(tsxe.id);
      }
      await TrainingSessionController.remove(trainingSession.id);
    }
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.fullScreenContainer}>
        <Text style={styles.header}>{trainingSession ? 'Editar' : 'Novo'} Treino</Text>
        <Text>Nome: </Text>
        <TextInput testID="nameInput" value={name} onChangeText={setName} style={styles.input} />
        <Text>Data: </Text>
        <TextInput testID="dateInput" value={date} onChangeText={setDate} style={styles.input} placeholder="YYYY-MM-DD" />
        <Text>Tipo: </Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.rowButton, type === 'hypertrophy' && styles.selectedButton, styles.rightMargin]}
            onPress={() => setType('hypertrophy')}
            testID='trainingSessionTypeButton-hypertrophy'
          >
            <Text style={styles.buttonText}>Hipertrofia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowButton, type === 'strength' && styles.selectedButton]}
            onPress={() => setType('strength')}
            testID='trainingSessionTypeButton-strength'
          >
            <Text style={styles.buttonText}>Força</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowButton, type === 'resistance' && styles.selectedButton, styles.leftMargin]}
            onPress={() => setType('resistance')}
            testID='trainingSessionTypeButton-resistance'
          >
            <Text style={styles.buttonText}>Resistência</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Observações"
          value={obs}
          onChangeText={setObs}
          style={[styles.input, { height: 60 }]}
          multiline
          testID="observationsInput"
        />
        {trainingSession &&
          <View style={styles.column}>
            
            <View style={styles.row}>
              <Text style={[styles.title, { marginBottom: 0 }]}>Exercícios</Text>
              <TouchableOpacity
                style={[styles.addButton]}
                onPress={addTrainingSessionXExercise}
                testID="addTrainingSessionXExerciseButton"
              >
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.listHeight}
              data={trainingSessionXExerciseList}
              keyExtractor={item => String(item.id)}
              testID="trainingSessionXExerciseList"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => { selectTrainingSessionXExercise(item.id); }}
                  testID={`trainingSessionXExerciseCard-${item.id}`}
                >
                  <Text style={styles.cardTitle}>{getExerciseNameById(item.exercise_id)}</Text>
                  <Text style={styles.cardSubtitle}>{getExerciseMuscleGroupById(item.exercise_id)}</Text>
                </TouchableOpacity>
              )}
            />
            {smallModalVisible &&
              <Modal visible={smallModalVisible} transparent animationType="slide" testID="smallModal">
                <View style={styles.backdrop}>
                  <View style={styles.smallModal}>
                    {trainingSessionXExercise ? (
                      <View>
                        <Text style={styles.title}>{getExerciseNameById(trainingSessionXExercise.exercise_id)}</Text>
                        <TextInput
                          placeholder="Peso"
                          value={String(trainingSessionXExercise?.weight || '')}
                          onChangeText={(text) => setTrainingSessionXExercise((prev) => ({ ...prev!, weight: Number(text) }))}
                          style={styles.input}
                          testID="weightInput"
                        />
                        <TextInput
                          placeholder="Sets"
                          value={String(trainingSessionXExercise?.sets || '')}
                          onChangeText={(text) => setTrainingSessionXExercise((prev) => ({ ...prev!, sets: Number(text) }))}
                          style={styles.input}
                          testID="setsInput"
                        />
                        <TextInput
                          placeholder="Reps"
                          value={String(trainingSessionXExercise?.reps || '')}
                          onChangeText={(text) => setTrainingSessionXExercise((prev) => ({ ...prev!, reps: Number(text) }))}
                          style={styles.input}
                          testID="repsInput"
                        />
                        <View style={styles.row}>
                          <TouchableOpacity
                            style={[styles.rowButton, styles.rightMargin]}
                            onPress={saveTrainingSessionXExercise}
                            testID="saveTrainingSessionXExerciseButton"
                          >
                            <Text style={styles.buttonTextSmall}>Salvar</Text>
                          </TouchableOpacity>
                          {trainingSessionXExercise.id &&
                            <TouchableOpacity
                              style={[styles.rowButton, styles.redBackground]}
                              onPress={deleteTrainingSessionXExercise}
                              testID="deleteTrainingSessionXExerciseButton"
                            >
                              <Text style={styles.buttonTextSmall}>Remover</Text>
                            </TouchableOpacity>
                          }
                        </View>
                      </View>
                    ) : <View>
                      <Text style={styles.title}>Selecionar Exercício</Text>
                      <FlatList
                        style={styles.listHeight}
                        data={exercises}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.card}
                            onPress={() => { selectExercise(item.id); }}
                            testID={`exerciseCard-${item.id}`}
                          >
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardSubtitle}>{portuguesMuscleGroup[item.muscle_group]}</Text>
                          </TouchableOpacity>
                        )}
                        testID="exerciseList"
                      />
                    </View>
                    }
                    <View style={styles.column}>
                      <TouchableOpacity
                        style={[styles.columnButton, styles.grayBackground, {marginTop: (trainingSessionXExercise ? 0 : 20)}]}
                        onPress={() => {
                          setTrainingSessionXExercise(null);
                          setsmallModalVisible(false);
                        }}
                        testID="cancelTrainingSessionXExerciseButton"
                      >
                        <Text style={styles.buttonTextSmall}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            }
            <TouchableOpacity
              style={[styles.columnButton, styles.redBackground, {marginBottom: 10}]}
              onPress={deleteTrainingSession}
              testID="deleteTrainingSessionButton"
            >
              <Text style={styles.buttonText}>Deletar Treino</Text>
            </TouchableOpacity>
          </View>
          
        }
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.rowButton, styles.rightMargin]}
            onPress={saveTrainingSession}
            testID="saveTrainingSessionButton"
          >
            <Text style={styles.buttonText}>Salvar Treino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rowButton, styles.grayBackground]}
            onPress={onClose}
            testID="cancelTrainingSessionButton"
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: fullScreenModalStyles.fullScreenModal(),
  header: fullScreenModalStyles.header(width),
  input: fullScreenModalStyles.input(),
  row: fullScreenModalStyles.row(),
  column: fullScreenModalStyles.column(),
  selectedButton: fullScreenModalStyles.selectedButton(),
  buttonText: fullScreenModalStyles.buttonText(),
  card: cardStyles(width),
  cardTitle: cardTitleStyles(width),
  cardSubtitle: cardSubtitleStyles(width),
  rowButton: fullScreenModalStyles.rowButton(),
  columnButton: fullScreenModalStyles.columnButton(),
  buttonTextSmall: fullScreenModalStyles.buttonTextSmall(),
  title: smallModalStyles.header(),
  backdrop: smallModalStyles.backdrop(),
  smallModal: smallModalStyles.modal(),
  redBackground: redBackground(),
  grayBackground: grayBackground(),
  addButton: fullScreenModalStyles.addButton(),
  plus: fullScreenModalStyles.plus(),
  leftMargin: fullScreenModalStyles.leftMargin(),
  rightMargin: fullScreenModalStyles.rightMargin(),
  listHeight: fullScreenModalStyles.listHeight(),
});