import * as fs from 'fs';

type IUser = {
  username: string;
  age: number;
  hobbies: string[];
};

export const validateUsersKey = (user: IUser) => {
  if (
    !user.username ||
    typeof user.username !== 'string' ||
    !user.age ||
    typeof user.age !== 'number' ||
    !user.hobbies ||
    !Array.isArray(user.hobbies) ||
    user.hobbies.some(elem => typeof elem !== 'string')
  ) {
    return false;
  }
  return true;
};

export const getUsers = () => {
  const jsonData = fs.readFileSync('./users.json', { encoding: 'utf-8' });
  return JSON.parse(jsonData);
};
