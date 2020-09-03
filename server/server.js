const bodyParser = require('body-parser');
const express = require('express');
const { Client } = require('pg');
const { create_database, create_table } = require('./query');

const connectionString = `postgresql://nodejs:123456@db:5432/socketexpress`;
const client = new Client({
  connectionString: connectionString,
});

const app = express();
const port = 3456;
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

async function connect() {
  try {
    await client.connect();
  } catch (err) {
    console.log(err);
  }
}

(async function server() {
  await connect();
  app.get('/message', (req, res) => {
    client.query(`SELECT * FROM message;`).then((resp) => res.send(resp.rows));
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.post('/message', (req, res) => {
    client
      .query(`INSERT INTO message VALUES (2,2,'${req.body.message}');`)
      .then((res) => {
        io.emit('message', req.body);
        res.send(messages);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        client.end();
      });
  });

  io.on('connection', () => {
    console.log('a user is connected');
  });
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
