import { validateUsersKey, getUsers } from '../utils';
import * as fs from 'fs';
import { validate as uuidValidate } from 'uuid';

export const changeUser = (req, res, id) => {
  let body = '';
  const users = getUsers();

  req.on('data', function (data) {
    body += data;
  });
  req.on('end', async function () {
    try {
      const post = JSON.parse(body);

      if (validateUsersKey(post) && uuidValidate(id)) {
        if (users[id]) {

          const data = {
            ...users,
            [id]: { id, ...post },
          };
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fs.writeFile('./users.json', JSON.stringify(data), err => {
            console.log(err, 'err');
            if (err) throw err;
            console.log('Data written to file');
          });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify({ id, ...post }));

          res.end();
        } else {
          res.writeHead(404, { 'Content-type': 'text/html; charset=utf-8' });
          res.end('User not found!');
        }
      } else {
        res.writeHead(400, { 'Content-type': 'text/html; charset=utf-8' });
        res.end('body does not contain required fields');
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write('Bad Post Data.  Is your data a proper JSON?\n');
      res.end('dsa');
      return;
    }
  });
};
