import * as model from '../models/Reminder';
import {Reminder} from '../models/Reminder';

export const fetchReminder = async (): Promise<Reminder[]> =>
  model.getAllReminder();

export const createReminder = async (
  session: Omit<Reminder, 'id'>,
): Promise<number> => {
  const id = await model.addReminder({...session});
  return id;
};

export const editReminder = async (
  session: Reminder,
): Promise<Reminder> => {
  await model.updateReminder(session);
  return session;
};

export const deleteReminder = async (id: number): Promise<void> => {
  await model.deleteReminder(id);
};