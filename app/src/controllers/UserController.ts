import * as model from '../models/User';
import {User} from '../models/User';

export const fetchUsers = async (): Promise<User[]> =>
  model.getAllUsers();

export const create = async (
  user: Omit<User, 'id'>,
): Promise<User> => {
  const id = await model.addUser({...user});
  return {...user, id};
};

export const update = async (
  user: User,
): Promise<User> => {
  await model.updateUser(user);
  return user;
};

export const remove = async (id: number): Promise<void> => {
  await model.deleteUser(id);
};

export const authenticateUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const users = await model.getAllUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  return user || null;
};