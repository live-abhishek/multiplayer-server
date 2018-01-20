// const logger = require('./log4js').logger;

import * as express from 'express';
import * as path from 'path';
import * as sio from 'socket.io';
import { Request, Response } from 'express';

const app = express();
const server = require('http').Server(app);
const io = sio(server);

io.on('connection', require('./socketConnectionHandler'));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello');
  res.end();
});

const port = process.env.PORT || 12345;
server.listen(port);

// logger.info(`Multiplayer server listening on ${port}`);