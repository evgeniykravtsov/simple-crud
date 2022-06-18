import http from 'http';
import 'dotenv/config';
import * as users from '../users.json';

const Server = http.createServer((req, res) => {
  console.log(req.url);
  switch (req.url) {
    case '/api/users':
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(users));
    default:
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end('end');
  }
});

Server.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000. Go to http://localhost:3000/');
});

// Server.close();
