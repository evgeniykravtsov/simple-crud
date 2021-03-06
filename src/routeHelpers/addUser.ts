import { validateUsersKey, getUsers } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

export const addUser = (req, res) => {
  let body = '';
  const users = getUsers();

  req.on('data', function (data) {
    body += data;
  });
  req.on('end', async function () {
    try {
      const post = JSON.parse(body);

      if (validateUsersKey(post)) {
        const id = uuidv4();
        const data = {
          ...users,
          [id]: { id, ...post },
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fs.writeFile('./users.json', JSON.stringify(data), err => {
          if (err) throw err;
          console.log('Data written to file');
        });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ id, ...post }));
        res.end();
      } else {
        res.writeHead(404, { 'Content-type': 'text/html; charset=utf-8' });
        res.end('body does not contain required fields');
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write('Bad Post Data.  Is your data a proper JSON?\n');
      res.end();
      return;
    }
  });
};
