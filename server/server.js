const bodyParser = require('body-parser');
const express = require('express');
const { Client } = require('pg');
const { create_database, create_table } = require('./query');
const app = express();
const port = 3456;
const messages = [];
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const connectionString = `postgressql://superuser:123456@localhost:5678/socketexpress`;
const client = new Client({
  connectionString: connectionString,
});

async function connect() {
  try {
    await client.connect();
  } catch (err) {
    console.log(err);
  }
}

(async function server() {
  await connect();


  // client
  //   .query(create_database)
  //   .then((res) => console.log('create database successfull'))
  //   .catch((err) => console.error(err))
  //   .finally(() => {
  //     client.end();
  //   });
  // client
  //   .query(create_table)
  //   .then((res) => {
  //     console.log('Table is successfully created');
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  //   .finally(() => {
  //     client.end();
  //   });

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

  io.on('connection', () => {
    console.log('a user is connected');
  });
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
