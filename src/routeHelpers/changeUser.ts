import { validateUsersKey, getUsers } from '../utils.js';
import * as fs from 'fs';

export const changeUser = (req, res, id) => {
  let body = '';
  const users = getUsers();

  req.on('data', function (data) {
    body += data;
  });
  req.on('end', async function () {
    try {
      const post = JSON.parse(body);

      if (validateUsersKey(post)) {
        console.log('valid!');
        if (users[id]) {
          console.log('User found!!');

          const data = {
            ...users,
            [id]: { id, ...post },
          };
          console.log(data, 'data!');

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fs.writeFile('./users.json', JSON.stringify(data), err => {
            console.log(err, 'err');
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