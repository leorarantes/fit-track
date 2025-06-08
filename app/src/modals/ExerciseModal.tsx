import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
  const [muscle, setMuscle] = useState<Exercise['muscle_group']>('biceps');
  const [obs, setObs] = useState('');
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (exercise) {
      setName(exercise.name);
      setMuscle(exercise.muscle_group);
      setObs(exercise.observations || '');
      setFav(exercise.favorite);
    } else {
      setName(''); setMuscle('biceps'); setObs(''); setFav(false);
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
          <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
          <Text>Grupo Muscular</Text>
          <View style={styles.row}>
            <Button title="Bíceps" onPress={() => setMuscle('biceps')} />
            <Button title="Quadríceps" onPress={() => setMuscle('quadriceps')} />
          </View>
          <TextInput placeholder="Observações" value={obs} onChangeText={setObs} style={[styles.input, { height: 60 }]} multiline />
          <View style={styles.row}>
            <CheckBox value={fav} onValueChange={setFav} />
            <Text>Favorito</Text>
          </View>
          <Button title={isEdit ? 'Salvar' : 'Adicionar'} onPress={submit} />
          <Button title="Cancelar" onPress={onClose} color="#999" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex:1, backgroundColor:'rgba(0,0,0,0.5)', justifyContent:'center', alignItems:'center' },
  modal: { backgroundColor:'#FFF', padding:20, borderRadius:10, width:'90%' },
  header: { fontSize:20, marginBottom:10, color:'#E67E22', textAlign:'center' },
  input: { borderWidth:1, borderColor:'#DDD', padding:8, borderRadius:5, marginVertical:8 },
  row: { flexDirection:'row', alignItems:'center', justifyContent:'space-around', marginVertical:8 }
});
