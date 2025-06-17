import {getDB} from './db';
import { TrainingSession } from './TrainingSession';

export interface TrainingHistory {
  id?: number;
  date_beg: string;
  date_end: string;
}

export const getAllTrainingHistory = async (): Promise<TrainingHistory[]> => {
  const db = await getDB();
  const [results] = await db.executeSql('SELECT * FROM training_history');
  const sessions: TrainingHistory[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const row = results.rows.item(i);
    sessions.push({
      id: row.id,
      date_beg: row.date_beg,
      date_end: row.date_end,
    });
  }
  return sessions;
};

export const addTrainingHistory= async (
  session: TrainingHistory,
): Promise<number> => {
  const db = await getDB();
  const {date_beg, date_end } = session;
  try {
    const [result] = await db.executeSql(
      'INSERT INTO training_history(date_beg, date_end) VALUES (?, ?);',
      [date_beg, date_end|| ''],
    );
    return result.insertId!;
  } catch (error) {
    console.error('Error adding training history:', error);
    throw error;
  }
};

export const updateTrainingHistory = async (
  session: TrainingHistory,
): Promise<void> => {
  if (!session.id) {
    throw new Error('ID is required for update');
  }
  const db = await getDB();
  const {id, date_beg, date_end} = session;
  await db.executeSql(
    'UPDATE training_history SET date_beg=?, date_end=? WHERE id=?;',
    [date_beg, date_end || '', id],
  );
};

export const deleteTrainingHistory = async (id: number): Promise<void> => {
  const db = await getDB();
  try {
    await db.executeSql('DELETE FROM training_history WHERE id = ?;', [id]);
  } catch (error) {
    console.error('Error deleting training history:', error);
    throw error;
  }
};