import {getDB} from './db';
import { TrainingSession } from './TrainingSession';

export interface Reminder {
  id?: number;
  date: string;
  hour: string;
  observations: string;
}

export const getAllReminder = async (): Promise<Reminder[]> => {
  const db = await getDB();
  const [results] = await db.executeSql('SELECT * FROM reminder');
  const sessions: Reminder[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const row = results.rows.item(i);
    sessions.push({
      id: row.id,
      date: row.date,
      hour: row.hour,
      observations: row.observations
    });
  }
  return sessions;
};

export const addReminder= async (
  session: Reminder,
): Promise<number> => {
  const db = await getDB();
  const {date, hour, observations} = session;
  try {
    const [result] = await db.executeSql(
      'INSERT INTO reminder(date, hour, observations) VALUES (?, ?, ?);',
      [date, hour, observations|| ''],
    );
    return result.insertId!;
  } catch (error) {
    console.error('Error adding reminder:', error);
    throw error;
  }
};

export const updateReminder = async (
  session: Reminder,
): Promise<void> => {
  if (!session.id) {
    throw new Error('ID is required for update');
  }
  const db = await getDB();
  const {id, date, hour, observations} = session;
  await db.executeSql(
    'UPDATE reminder SET date=?, hour=?, observations=? WHERE id=?;',
    [date, hour, observations || '', id],
  );
};

export const deleteReminder = async (id: number): Promise<void> => {
  const db = await getDB();
  try {
    await db.executeSql('DELETE FROM reminder WHERE id = ?;', [id]);
  } catch (error) {
    console.error('Error deleting training history:', error);
    throw error;
  }
};