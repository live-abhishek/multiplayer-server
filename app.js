const logger = require('./log4js').logger;
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.get('/hello', (req, res) => {
    res.send('Hello');
    res.end();
});

const port = process.env.PORT || 12345;
app.listen(port);

logger.info(`Multiplayer server listening on ${port}`);