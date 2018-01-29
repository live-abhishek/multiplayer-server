import { load } from 'dotenv-extended';
load();
import * as express from 'express';
import * as path from 'path';
import * as sio from 'socket.io';
import { Request, Response } from 'express';
import { socketConnectionHandler } from './socketConnectionHandler';

import { logger } from './bunyan';
import { RoomManager } from './roomManager';

const app = express();
const server = require('http').Server(app);
const io = sio(server);

io.on('connection', socketConnectionHandler);
app.use(express.static(path.join(__dirname, '..', 'ui', 'build')));

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'ui', 'build', 'index.html'));
});

app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello');
  res.end();
});

app.get('/rm', (req: Request, res: Response) => {
  const rm = RoomManager.getRoomManager();
  res.send(JSON.stringify(rm.getAllRoomInfo()));
  res.end();
});

const port = process.env.PORT || 12345;
server.listen(port);

logger.info(`Multiplayer server listening on ${port}`);
