import * as model from '../models/TrainingSessionXExercise';
import {TrainingSessionXExercise} from '../models/TrainingSessionXExercise';

export const fetch = async (trainingSessionId: number): Promise<TrainingSessionXExercise[]> => {
  return model.getByTrainingSessionId(trainingSessionId);
}

export const create = async (
  trainingSessionXExercise: Omit<TrainingSessionXExercise, 'id'>,
): Promise<TrainingSessionXExercise> => {
  const id = await model.create({...trainingSessionXExercise});
  return {...trainingSessionXExercise, id};
};

export const update = async (
  trainingSessionXExercise: TrainingSessionXExercise,
): Promise<TrainingSessionXExercise> => {
  await model.update(trainingSessionXExercise);
  return trainingSessionXExercise;
};

export const remove = async (id: number): Promise<void> => {
  await model.remove(id);
};