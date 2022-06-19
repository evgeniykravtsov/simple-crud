import { getUsers } from '../utils';
import * as fs from 'fs';
import { validate as uuidValidate } from 'uuid';

export const deleteUser = (res, id) => {
  const users = getUsers();

  try {
    if (uuidValidate(id)) {
      if (users[id]) {
        const data = {
          ...users,
        };
        delete data[id];

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fs.writeFile('./users.json', JSON.stringify(data), err => {
          if (err) throw err;
          console.log('Data written to file');
        });
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end();
      } else {
        res.writeHead(404, { 'Content-type': 'text/html; charset=utf-8' });
        res.end('User not found!');
      }
    } else {
      res.writeHead(400, { 'Content-type': 'text/html; charset=utf-8' });
      res.end('id invalid!');
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.write('Bad Post Data.  Is your data a proper JSON?\n');
    res.end('dsa');
    return;
  }
};
