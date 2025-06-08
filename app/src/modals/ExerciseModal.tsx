import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { createExercise, editExercise } from '../controllers/ExerciseController';
import { Exercise } from '../models/Exercise';

interface Props {
  visible: boolean;
  onClose: () => void;
  exercise: Exercise | null;
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
      setName(''); setMuscle('arms'); setObs(''); setFav(false);
    }
  }, [exercise]);

  const submit = async () => {
    const data: Exercise = { id: exercise?.id, name, muscle_group: muscle, observations: obs, favorite: fav } as Exercise;
    isEdit ? await editExercise(data) : await createExercise(data);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <Text style={styles.header}>{isEdit ? 'Editar' : 'Novo'} Exercício</Text>
          <Text>Nome: </Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
          <Text>Grupo Muscular: </Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, muscle === 'arms' && styles.selectedButton]} onPress={() => setMuscle('arms')}>
            <Text style={styles.buttonText}>Braços</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, muscle === 'back' && styles.selectedButton]} onPress={() => setMuscle('back')}>
            <Text style={styles.buttonText}>Costas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, muscle === 'chest' && styles.selectedButton]} onPress={() => setMuscle('chest')}>
            <Text style={styles.buttonText}>Peito</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, muscle === 'legs' && styles.selectedButton]} onPress={() => setMuscle('legs')}>
            <Text style={styles.buttonText}>Pernas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, muscle === 'shoulders' && styles.selectedButton]} onPress={() => setMuscle('shoulders')}>
            <Text style={styles.buttonText}>Ombros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, muscle === 'core' && styles.selectedButton]} onPress={() => setMuscle('core')}>
            <Text style={styles.buttonText}>Abdômen</Text>
          </TouchableOpacity>
          </View>
          <TextInput placeholder="Observações" value={obs} onChangeText={setObs} style={[styles.input, { height: 60 }]} multiline />
          <View style={styles.row}>
            <Text>Favorito</Text>
            <CheckBox value={fav} onValueChange={setFav} />
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.saveButton} onPress={submit}>
              <Text style={styles.buttonText}>{isEdit ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
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
  backdrop: { flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' },
  modal: { backgroundColor:'#FFF', padding:20, borderRadius:10, width:'90%' },
  header: { fontSize:26, marginBottom:20, color:'#E67E22', textAlign:'center', fontWeight:'bold' },
  input: { borderWidth:1, borderColor:'#DDD', padding:8, borderRadius:5, marginVertical:8 },
  row: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
    marginVertical: 8 
  },
  button: {
    width: '45%',
    marginVertical: 4,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#E67E22',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#D35400'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  saveButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#E67E22',
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#999',
    alignItems: 'center',
  },
});
