import * as model from '../models/Exercise';
import {Exercise} from '../models/Exercise';

export const fetchExercises = async (): Promise<Exercise[]> => model.getAllExercises();

export const createExercise = async (
  ex: Omit<Exercise, 'id'>,
): Promise<Exercise> => {
  const id = await model.addExercise({...ex});
  return {...ex, id};
};

export const editExercise = async (ex: Exercise): Promise<Exercise> => {
  await model.updateExercise(ex);
  return ex;
};

export const deleteExercise = async (id: number): Promise<void> => {
  await model.deleteExercise(id);
};