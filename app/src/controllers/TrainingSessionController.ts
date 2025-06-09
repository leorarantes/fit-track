import * as model from '../models/TrainingSession';
import {TrainingSession} from '../models/TrainingSession';

export const fetchTrainingSessions = async (): Promise<TrainingSession[]> =>
  model.getAllTrainingSessions();

export const createTrainingSession = async (
  session: Omit<TrainingSession, 'id'>,
): Promise<TrainingSession> => {
  const id = await model.addTrainingSession({...session});
  return {...session, id};
};

export const editTrainingSession = async (
  session: TrainingSession,
): Promise<TrainingSession> => {
  await model.updateTrainingSession(session);
  return session;
};

export const deleteTrainingSession = async (id: number): Promise<void> => {
  await model.deleteTrainingSession(id);
};