import {getDB} from './db';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const db = await getDB();
  const [results] = await db.executeSql('SELECT * FROM user');
  const users: User[] = [];
  for (let i = 0; i < results.rows.length; i++) {
    const row = results.rows.item(i);
    users.push({
      id: row.id,
      name: row.name,
      email: row.email,
      password: row.password,
    });
  }
  return users;
};

export const addUser = async (user: User): Promise<number> => {
  const db = await getDB();
  const {name, email, password} = user;
  try {
    const [result] = await db.executeSql(
      'INSERT INTO user (name, email, password) VALUES (?, ?, ?);',
      [name, email, password],
    );
    return result.insertId!;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUser = async (user: User): Promise<void> => {
  if (!user.id) {
    throw new Error('ID is required for update');
  }
  const db = await getDB();
  const {id, name, email, password} = user;
  await db.executeSql(
    'UPDATE user SET name=?, email=?, password=? WHERE id=?;',
    [name, email, password, id],
  );
};

export const deleteUser = async (id: number): Promise<void> => {
  const db = await getDB();
  try {
    await db.executeSql('DELETE FROM user WHERE id = ?;', [id]);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};