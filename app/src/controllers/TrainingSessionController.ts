import * as model from '../models/TrainingSession';
import {TrainingSession} from '../models/TrainingSession';

export const fetchTrainingSessions = async (): Promise<TrainingSession[]> =>
  model.getAllTrainingSessions();

export const create = async (
  session: Omit<TrainingSession, 'id'>,
): Promise<TrainingSession> => {
  const id = await model.addTrainingSession({...session});
  return {...session, id};
};

export const update = async (
  session: TrainingSession,
): Promise<TrainingSession> => {
  await model.updateTrainingSession(session);
  return session;
};

export const remove = async (id: number): Promise<void> => {
  await model.deleteTrainingSession(id);
};