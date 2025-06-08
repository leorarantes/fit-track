import {getDB} from './db';

export interface Exercise {
  id?: number;
  name: string;
  muscle_group: 'biceps' | 'quadriceps';
  observations?: string;
  favorite: boolean;
}

export const getAllExercises = async (): Promise<Exercise[]> => {
  const db = await getDB();
  const [results] = await db.executeSql('SELECT * FROM exercise');
  const exercises: Exercise[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const row = results.rows.item(i);
    exercises.push({
      id: row.id,
      name: row.name,
      muscle_group: row.muscle_group,
      observations: row.observations,
      favorite: !!row.favorite,
    });
  }
  return exercises;
};

export const addExercise = async (exercise: Exercise): Promise<number> => {
  const db = await getDB();
  const {name, muscle_group, observations, favorite} = exercise;
  const [result] = await db.executeSql(
    'INSERT INTO exercise (name, muscle_group, observations, favorite) VALUES (?, ?, ?, ?);',
    [name, muscle_group, observations || '', favorite ? 1 : 0],
  );
  return result.insertId!;
};

export const updateExercise = async (exercise: Exercise): Promise<void> => {
  if (!exercise.id) {throw new Error('ID is required for update');}
  const db = await getDB();
  const {id, name, muscle_group, observations, favorite} = exercise;
  await db.executeSql(
    'UPDATE exercise SET name=?, muscle_group=?, observations=?, favorite=? WHERE id = ?;',
    [name, muscle_group, observations || '', favorite ? 1 : 0, id],
  );
};
