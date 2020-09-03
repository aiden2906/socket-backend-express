const bodyParser = require('body-parser');
const express = require('express');
const {createConnection} = require('typeorm');
const app = express();
const port = 3456;
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const socketHash={};
let connection;
const connectDB = async () => {
  connection = await createConnection();
};
//TODO: API register (name, username)
// API login (username)
// API create message, list conversation

(async function server() {
  await connectDB();
  app.get('/message', (req, res) => {
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.post('/message', (req, res) => {
    // const {roomId, userId, content, createdAt} = (req && req.body) || {};
    // client
    //   .query(`INSERT INTO message VALUES (${roomId},${userId},'${content}','${createdAt}');`)
    //   .then((resp) => {
    //     const user1 = sockerHash[user1Id];
    //     const user2 = sockerHash[user2Id];
    //     user1.emit('message', req.body);
    //     user2.emit('message', req.body);
    //     res.send(resp);
    //   })
    //   .catch((err) => console.log(err))
    //   .finally(() => {
    //     client.end();
    //   });
  });

  io.on('connection', (socket) => {
    socket.on('login', (data)=>{
      const {username} = data;
      socketHash[username] = socket;
    })
    console.log('a user is connected');
  });
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
