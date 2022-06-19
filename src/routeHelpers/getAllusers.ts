import { getUsers } from '../utils.js';

export const getAllUsers = res => {
  const users = getUsers();
  res.writeHead(200, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(users));
};
