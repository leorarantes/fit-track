import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, TextInput, Linking, Platform, NativeModules } from 'react-native';
import { getAllTrainingSessionsDateFilter } from '../models/TrainingSession';
const { width, height } = Dimensions.get('window');
import { addButtonReminderStyles, addButtonStyles, cardStyles, cardSubtitleStyles, cardTitleStyles, closeButtonReminderStyles, closeStyles, containerStyles, erroStyles, flexJustifyBetweenStyles, fullScreenModalStyles, modalOverflowStyles, plusStyles, smallModalStyles } from '../assets/styles/global';
import { deleteReminder, getAllReminder, Reminder } from '../models/Reminder';
import { TextInputMask } from 'react-native-masked-text';
import { createReminder, editReminder } from '../controllers/ReminderCotroller';
import PushNotification from 'react-native-push-notification';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';



interface Props {
  visible: boolean;
  onClose: () => void;
  testID: string;
}

var data: Reminder[] = [];

export default function ReminderModal({ visible, onClose, }: Props) {
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [observations, setObservations] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [hourError, setHourError] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const db = await getAllReminder();
      setData(db);
    })();
    validateFields();
  }, []);

  /*const checkAndRequestExactAlarmPermission = async () => {
    if (Number(Platform.Version) >= 31) {
      try {
        const canSchedule = await NativeModules?.AlarmManager?.canScheduleExactAlarms?.();
        if (canSchedule === false || canSchedule === undefined) {
          // Abrir configurações do sistema para permitir manualmente
          Linking.openSettings();
          return false;
        }
      } catch (err) {
        console.warn("Erro ao verificar permissão de alarme exato:", err);
      }
    }
    return true;
  };*/

  const resetForm = () => {
    setDate('');
    setHour('');
    setObservations('');
  }

  const validateFields = () => {
    if (!date.trim()) {
      setError('Lembrete é obrigatório');
    } else {
      setError('');
    }

    if (!hour.trim()) {
      setHourError('Horário é obrigatório');
    } else {
      setHourError('');
    }
  }

  const handleDateChange = (text: string) => {
    setDate(text);
    setError(''); // limpa o erro anterior

    if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
      setError('Formato inválido. Use YYYY-MM-DD.');
      return;
    }

    const [year, month, day] = text.split('-').map(Number);
    const today = new Date();
    const inputDate = new Date(year, month - 1, day); // mês começa do zero em JS

    if (month > 12 || month < 1) {
      setError('Mês inválido.');
      return;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth || day < 1) {
      setError(`Dia inválido para o mês ${month}.`);
      return;
    }
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate < today) {
      setError('A data é inválida.');
      return;
    }
  };

  const handleHourChange = (text: string) => {
    setHour(text);
    setHourError('');

    if (!/^\d{2}:\d{2}$/.test(text)) {
      setHourError('Formato inválido. Use HH:MM.');
      return;
    }

    const [h, m] = text.split(':').map(Number);
    if (h > 23 || h < 0 || m > 59 || m < 0) {
      setHourError('Hora inválida. Use valores entre 00:00 e 23:59.');
    }

    const [year, month, day] = date.split('-').map(Number);
    const today = new Date();
    const hora = today.getHours();      // de 0 a 23
    const minutos = today.getMinutes(); // de 0 a 59

    console.log(`Hora atual: ${hora}:${minutos}`);

    if (hora > h || (hora == h && minutos > m)) {
      setHourError('Hora inválida, horário passou.');
    }
  };


  const submit = async (id?: number) => {
    try {
      const data: Reminder = {
        id: id,
        date: date,
        hour: hour,
        observations: observations
      } as Reminder;

      console.log('Dados do lembrete:', data);

      isEdit ? await editReminder(data) : await createReminder(data);
      resetForm();

      const db = await getAllReminder();
      setData(db);

      const [year, month, day] = date.split('-').map(Number);
      const [hourPart, minutePart] = hour.split(':').map(Number);
      //const scheduleDate = new Date(year, month - 1, day, hourPart, minutePart);
      const scheduleDate = new Date(Date.now() + 60 * 1000);

      if (isNaN(scheduleDate.getTime())) {
        console.error('Data inválida');
        return;
      }

      if (scheduleDate <= new Date()) {
        console.warn('A data deve ser futura!');
        return;
      }

      PushNotification.createChannel({
          channelId: "lembrete-channel",
          channelName: "Canal de Lembretes",
          importance: 4,
          vibrate: true,
        },
        (created) => {
          console.log("Canal criado?", created);
          PushNotification.localNotificationSchedule({
            channelId: "lembrete-channel",
            message: "Notificação agendada para 1 minuto!",
            date: new Date(Date.now() + 60000),
            allowWhileIdle: true,
          });
        }
      );

      console.log('Notificação agendada para:', scheduleDate.toLocaleString());

    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }

  };

  const handleDelete = async (id: number) => {
    await deleteReminder(id);
    (async () => {
      const db = await getAllReminder();
      setData(db);
    })();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" testID="trainingHistoryModal">
      <View style={styles.backdrop}>
        <View style={styles.modal}>
          <View style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.closeButtonReminder}
              onPress={() => { onClose(); setShowForm(false) }}
              testID="plusButton"
            >
              <Text style={styles.close} testID="plusText">X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>Lembrete</Text>
          <View style={{ width: '100%', flex: 1, justifyContent: 'flex-end', flexDirection: 'row', marginBottom: 60 }}>
            <TouchableOpacity
              style={styles.addButtonReminder}
              onPress={() => { setShowForm(!showForm); setIsEdit(false); resetForm() }}
              testID="plusButton"
            >
              <Text style={styles.plus} testID="plusText">+</Text>
            </TouchableOpacity>
          </View>

          {showForm && <View>

            <View style={styles.flexJustifyBetween}>
              <View>
                <Text>Data do Lembrete: </Text>
                <TextInputMask testID="dateBegInput" type={'datetime'} value={date} options={{ format: 'YYYY-MM-DD' }} onChangeText={handleDateChange} style={styles.input} placeholder="YYYY-MM-DD" />
                {error ? <Text style={styles.erro}>{error}</Text> : null}
              </View>
              <View>
                <Text>Horário: </Text>
                <TextInputMask testID="dateEndInput" type={'datetime'} value={hour} options={{ format: 'HH:mm' }} onChangeText={handleHourChange} style={styles.input} placeholder="HH:mm" />
                {hourError ? <Text style={styles.erro}>{hourError}</Text> : null}
              </View>
            </View>
            <View>
              <TextInput
                placeholder="Observações"
                value={observations}
                onChangeText={setObservations}
                style={[styles.input]}
                multiline
                testID="observationsInput"
              />
            </View>

            <View style={styles.row}>
              <TouchableOpacity disabled={!!hourError || !!error} // desabilita se houver algum erro
                style={(!!hourError || !!error) ? styles.disableButton : styles.saveButton} onPress={() => { submit(idEdit as number); resetForm(); }} testID="saveButton2">
                <Text style={styles.buttonText}>{isEdit ? 'Editar lembrete' : 'Adicionar lembrete'}</Text>
              </TouchableOpacity>
            </View>
          </View>
          }

          <View>
            {/* Lista com rolagem e altura fixa */}
            <View style={{ maxHeight: 350, marginBottom: 12 }}>
              <FlatList
                data={data}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => {
                  const isExpanded = expandedId === item.id;

                  return (
                    <TouchableOpacity
                      onPress={() =>
                        setExpandedId(isExpanded ? null : item.id)
                      }
                      style={[styles.card, { marginBottom: isExpanded ? 12 : 4 }]}
                    >
                      <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={styles.cardSubtitle}>Data de lembrete: {item.date}</Text>
                        <Text style={styles.cardSubtitle}>Hora: {item.hour}</Text>
                        <Text style={styles.cardSubtitle}>Observação: {item.observations}</Text>
                      </View>


                      {isExpanded && (
                        <View style={{ minHeight: 100 }}>
                          <TouchableOpacity
                            onPress={() => {
                              setDate(item.date);
                              setHour(item.hour);
                              setObservations(item.observations);
                              setShowForm(true);
                              setExpandedId(null);
                              setIsEdit(true);
                              setIdEdit(item.id);
                              validateFields();
                            }}
                          >
                            <Text style={styles.saveButton}>Editar</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(item.id)}
                          >
                            <Text style={styles.buttonText}>Remover</Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: cardStyles(width),
  cardTitle: cardTitleStyles(width),
  cardSubtitle: cardSubtitleStyles(width),
  backdrop: smallModalStyles.backdrop(),
  modal: smallModalStyles.modal(),
  header: smallModalStyles.header(),
  input: smallModalStyles.input(),
  row: smallModalStyles.row(),
  button: smallModalStyles.button(width),
  selectedButton: smallModalStyles.selectedButton(),
  buttonText: smallModalStyles.buttonText(),
  saveButton: smallModalStyles.saveButton(),
  disableButton: smallModalStyles.disableButton(),
  deleteButton: { ...smallModalStyles.saveButton(), backgroundColor: 'red' }, // Estilo para o botão de deletar
  cancelButton: smallModalStyles.cancelButton(),
  modalOverflow: modalOverflowStyles(width),
  addButtonReminder: addButtonReminderStyles(width),
  plus: plusStyles(width),
  flexJustifyBetween: flexJustifyBetweenStyles(width),
  erro: erroStyles(),
  column: fullScreenModalStyles.column(),
  closeButtonReminder: closeButtonReminderStyles(width),
  close: closeStyles(width),

});