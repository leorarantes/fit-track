import {getDB} from './db';

export interface TrainingSessionXExercise {
  id?: number;
  exercise_id: number;
  training_session_id: number;
  weight: number;
  sets: number;
  reps: number;
}

export const getByTrainingSessionId = async (trainingSessionId: number): Promise<TrainingSessionXExercise[]> => {
  const db = await getDB();
  const [results] = await db.executeSql('SELECT * FROM training_session_x_exercise WHERE training_session_id = ?;', [trainingSessionId]);
  const traningSessionXExercises: TrainingSessionXExercise[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const row = results.rows.item(i);
    traningSessionXExercises.push({
      id: row.id,
      exercise_id: row.exercise_id,
      training_session_id: row.training_session_id,
      weight: row.weight,
      sets: row.sets,
      reps: row.reps,
    });
  }
  return traningSessionXExercises;
};

export const create = async (
  trainingSessionXExercise: TrainingSessionXExercise,
): Promise<number> => {
  const db = await getDB();
  const {exercise_id, training_session_id, weight, sets, reps} = trainingSessionXExercise;
  try {
    const [result] = await db.executeSql(
      'INSERT INTO training_session_x_exercise (exercise_id, training_session_id, weight, sets, reps) VALUES (?, ?, ?, ?, ?);',
      [exercise_id, training_session_id, weight, sets, reps],
    );
    return result.insertId!;
  } catch (error) {
    console.error('Error adding training_session_x_exercise:', error);
    throw error;
  }
};

export const update = async (
  trainingSessionXExercise: TrainingSessionXExercise,
): Promise<void> => {
  if (!trainingSessionXExercise.id) throw new Error('ID is required for update');
  const db = await getDB();
  const {id, exercise_id, training_session_id, weight, sets, reps} = trainingSessionXExercise;
  await db.executeSql(
    'UPDATE training_session_x_exercise SET exercise_id=?, training_session_id=?, weight=?, sets=?, reps=? WHERE id=?;',
    [exercise_id, training_session_id, weight, sets, reps, id],
  );
};

export const remove = async (id: number): Promise<void> => {
  const db = await getDB();
  try {
    await db.executeSql('DELETE FROM training_session_x_exercise WHERE id = ?;', [id]);
  } catch (error) {
    console.error('Error deleting training session x exercise:', error);
    throw error;
  }
};