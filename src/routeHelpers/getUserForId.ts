import { getUsers } from '../utils.js';
import { validate as uuidValidate } from 'uuid';

export const getUserForId = (res, id) => {
  const users = getUsers();

  if (uuidValidate(id)) {
    if (users[id]) {
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(users[id]));
    } else {
      res.writeHead(404, { 'Content-type': 'text/html; charset=utf-8' });
      res.end('User not found!');
    }
  } else {
    res.writeHead(400, { 'Content-type': 'text/html; charset=utf-8' });
    res.end('Id invalid!');
  }
};
