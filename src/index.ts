import http from 'http';
import 'dotenv/config';
import { getAllUsers } from './routeHelpers/getAllusers.js';
import { getUserForId } from './routeHelpers/getUserForId.js';
import { addUser } from './routeHelpers/addUser.js';
import { changeUser } from './routeHelpers/changeUser.js';
import { deleteUser } from './routeHelpers/deleteUser.js';

const Server = http.createServer(async (req, res) => {
  const { url, method } = req;
  const id = url.slice(11);
  switch (true) {
    case url === '/api/users' && method == 'GET':
      getAllUsers(res);
      break;

    case url.startsWith('/api/users/') && method == 'GET':
      getUserForId(req, id);
      break;

    case url.startsWith('/api/users') && method == 'POST':
      addUser(req, res);
      break;


    case url.startsWith('/api/users') && method == 'PUT':
      changeUser(req, res, id);
      break;

    case url.startsWith('/api/users') && method == 'DELETE':
      deleteUser(res, id);
      break;

    default:
      res.writeHead(404, { 'Content-type': 'application/json' });
      res.end('This api route not found!');
      break;
  }
});

Server.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000. Go to http://localhost:3000/');
});
