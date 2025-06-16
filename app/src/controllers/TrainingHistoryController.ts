import * as model from '../models/TrainingHistory';
import {TrainingHistory} from '../models/TrainingHistory';

export const fetchTrainingHistory = async (): Promise<TrainingHistory[]> =>
  model.getAllTrainingHistory();

export const createTrainingHistory = async (
  session: Omit<TrainingHistory, 'id'>,
): Promise<TrainingHistory> => {
  const id = await model.addTrainingHistory({...session});
  return {...session, id};
};

