import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { fetchExercises } from '../controllers/ExerciseController';
import ExerciseModal from '../modals/ExerciseModal';
import { Exercise, portuguesMuscleGroup } from '../models/Exercise';
import { addButtonStyles, cardStyles, cardSubtitleStyles, cardTitleStyles, containerStyles, flexJustifyBetweenStyles, headerStyles, leadChartStyles, logoStyles, plusStyles, screenTitleFontSize } from '../assets/styles/global';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { TrainingSession } from '../models/TrainingSession';
import { fetchTrainingSessions } from '../controllers/TrainingSessionController';
import { useIsFocused } from '@react-navigation/native';
import ReminderModal from '../modals/ReminderModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const logo = require('../assets/img/logo.png');
var dataEx, dataSession;
export default function DashboardScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Exercise | null>(null);
  const [modalReminder, setModalReminder] = useState(false);
  const [monthsCount, setMonthsCount] = useState(Array(12).fill(0));
  const [muscle_group, setMuscleGroup] = useState(Array(6).fill(0));
  const isFocused = useIsFocused();

  const load = async () => {
    dataEx = await fetchExercises();
    setExercises(dataEx);
    dataSession = await fetchTrainingSessions();
    setSessions(dataSession);
    const updatedMonthsCount = Array(12).fill(0);
    dataSession.forEach(item => {
      const [itemYear, itemMonth] = item.date.split("-");
      if (itemYear == '2025') {
        const monthIndex = parseInt(itemMonth, 10) - 1;
        updatedMonthsCount[monthIndex]++;
      }
    })
    const updateMuscleGroup = Array(6).fill(0);
    dataEx.forEach(item => {
      const itemType = item.muscle_group
      switch (itemType) {
        case 'arms':
          updateMuscleGroup[0]++;
          break;
        case 'back':
          updateMuscleGroup[1]++;
          break;
        case 'chest':
          updateMuscleGroup[2]++;
          break;
        case 'legs':
          updateMuscleGroup[3]++;
          break;
        case 'shoulders':
          updateMuscleGroup[4]++;
          break;
        case 'core':
          updateMuscleGroup[5]++;
          break;
      }
    })
    setMuscleGroup(updateMuscleGroup);
    setMonthsCount(updatedMonthsCount);
  };

  useEffect(() => {
    if (isFocused) {
      load();
    }
  }, [isFocused]);

  const screenWidth = Dimensions.get("window").width;
  const data = [
    {
      name: "Braços",
      population: muscle_group[0],
      color: "#e26a00",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
    {
      name: "Costas",
      population: muscle_group[1],
      color: "#e74c3c",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
    {
      name: "Peito",
      population: muscle_group[2],
      color: "#2ecc71",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
    {
      name: "Pernas",
      population: muscle_group[3],
      color: "#3498db",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
    {
      name: "Ombros",
      population: muscle_group[4],
      color: "#9b59b6",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
    {
      name: "Abdomêm",
      population: muscle_group[5],
      color: "#1abc9c",
      legendFontColor: "#fff",
      legendFontSize: 12,
    },
  ];

  const handleDataCharts = async () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.flexJustifyBetween}>
        <Image source={logo} style={styles.logo} />
        <Icon name="bell" size={30} color="#E67E22" onPress={() => { setEditing(null); setModalReminder(true); }} />
      </View>      
      <Text style={styles.header}>Início</Text>

      <View >
        <Text style={styles.leadChart}>Seus treinos realizados por mês</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [
              {
                data: monthsCount,
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          fromZero={true}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 0,
            borderRadius: 10,
          }}

        />
      </View>

      <View>
        <Text style={styles.leadChart}>Seus exercícios</Text>
        <PieChart
          data={data}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 0,
            borderRadius: 10,
          }}
          accessor={"population"}
          backgroundColor={"#fb8c00"}
          paddingLeft={"15"}
        />
      </View>

      <ReminderModal visible={modalReminder} onClose={() => { setModalReminder(false); load(); }}
        testID="reminderModal"></ReminderModal>
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
  leadChart: leadChartStyles(width),
  flexJustifyBetween: flexJustifyBetweenStyles(width),
});