const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3456;

const http = require('http').Server(app);
const io = require('socket.io')(http);
io.on('connection', () => {
  console.log('a user is connected');
});

const messages = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/message', (req, res) => {
  res.send(messages);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post('/message', (req, res) => {
  messages.push(req.body);
  io.emit('message', req.body);
  res.send(messages);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
