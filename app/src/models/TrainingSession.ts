import {getDB} from './db';

export interface TrainingSession {
  id?: number;
  name: string;
  date: string;
  type: 'hypertrophy' | 'strength' | 'resistance';
  observations?: string;
}

export const getAllTrainingSessions = async (): Promise<TrainingSession[]> => {
  const db = await getDB();
  const [results] = await db.executeSql('SELECT * FROM training_session');
  const sessions: TrainingSession[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const row = results.rows.item(i);
    sessions.push({
      id: row.id,
      name: row.name,
      date: row.date,
      type: row.type,
      observations: row.observations,
    });
  }
  return sessions;
};

export const addTrainingSession = async (
  session: TrainingSession,
): Promise<number> => {
  const db = await getDB();
  const {name, date, type, observations} = session;
  try {
    const [result] = await db.executeSql(
      'INSERT INTO training_session (name, date, type, observations) VALUES (?, ?, ?, ?);',
      [name, date, type, observations || ''],
    );
    return result.insertId!;
  } catch (error) {
    console.error('Error adding training session:', error);
    throw error;
  }
};

export const updateTrainingSession = async (
  session: TrainingSession,
): Promise<void> => {
  if (!session.id) {
    throw new Error('ID is required for update');
  }
  const db = await getDB();
  const {id, name, date, type, observations} = session;
  await db.executeSql(
    'UPDATE training_session SET name=?, date=?, type=?, observations=? WHERE id=?;',
    [name, date, type, observations || '', id],
  );
};

export const deleteTrainingSession = async (id: number): Promise<void> => {
  const db = await getDB();
  try {
    await db.executeSql('DELETE FROM training_session WHERE id = ?;', [id]);
  } catch (error) {
    console.error('Error deleting training session:', error);
    throw error;
  }
};