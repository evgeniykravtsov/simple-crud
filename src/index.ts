import http from 'http';
import 'dotenv/config';
import { getAllUsers } from './routeHelpers/getAllusers';
import { getUserForId } from './routeHelpers/getUserForId';
import { addUser } from './routeHelpers/addUser';
import { changeUser } from './routeHelpers/changeUser';
import { deleteUser } from './routeHelpers/deleteUser';

export const Server = http.createServer(async (req, res) => {
  const { url, method } = req;
  const id = url.slice(11);
  switch (true) {
    case url === '/api/users' && method == 'GET':
      getAllUsers(res);
      break;

    case url.startsWith('/api/users/') && method == 'GET':
      getUserForId(res, id);
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
