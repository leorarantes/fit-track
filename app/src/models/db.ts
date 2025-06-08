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
      return dbInstance;
  } catch(error) {
    console.error('Error opening database:', error);
    throw error;
  }
};
