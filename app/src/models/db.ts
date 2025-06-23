import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const database_name = 'fittrack.db';
let dbInstance: SQLiteDatabase;

export const getDB = async (): Promise<SQLiteDatabase> => {
  try {
    if (dbInstance) {
        return dbInstance;
      }
      dbInstance = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });
      await dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS exercise (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          muscle_group TEXT CHECK(muscle_group IN ('arms', 'back', 'chest', 'legs', 'shoulders', 'core')) NOT NULL,
          observations TEXT,
          favorite INTEGER NOT NULL DEFAULT 0
        );`,
      );
      await dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS training_session (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          date DATE NOT NULL,
          type TEXT CHECK(type IN ('hypertrophy', 'strength', 'resistance')) NOT NULL,
          observations TEXT
        );`,
      );
      await dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS training_session_x_exercise (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          exercise_id INTEGER NOT NULL,
          training_session_id INTEGER NOT NULL,
          weight INTEGER NOT NULL,
          sets INTEGER NOT NULL,
          reps INTEGER NOT NULL,
          FOREIGN KEY (exercise_id) REFERENCES exercise(id),
          FOREIGN KEY (training_session_id) REFERENCES training_session(id)
        );`
      );
      await dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS training_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date_beg DATE NOT NULL,
          date_end DATE NOT NULL
        );`,
      );
      await dbInstance.executeSql(
        `CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );`,
      );
      return dbInstance;
  } catch(error) {
    console.error('Error opening database:', error);
    throw error;
  }
};
