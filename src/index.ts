import http from 'http';
import 'dotenv/config';
import  users from '../users.json';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

const Server = http.createServer(({url, method}, res) => {

  switch (true) {
    case url === '/api/users' && method == 'GET':
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(users));
      break;
    case url.startsWith('/api/users/') && method == 'GET':
        let id = url.slice(11)
        if(uuidValidate(id)) {
          console.log(users, 'userStore');
          console.log(id, 'id');

          if(users[id]) {
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
        case url.startsWith('/api/users/') && method == 'GET':

    default:
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end('end');
  }
});

Server.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000. Go to http://localhost:3000/');
});

// Server.close();
