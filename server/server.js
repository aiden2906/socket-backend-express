const bodyParser = require('body-parser');
const express = require('express');
const { createConnection } = require('typeorm');
const { Conversation } = require('./models/conversation');
const { User } = require('./models/user');
const { Message } = require('./models/message');
const app = express();
const port = 3456;
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const socketHash = {};
const connectDB = async () => {
  return createConnection();
};

(async function main() {
  const connection = await connectDB();
  const userRepo = connection.getRepository(User);
  const conversationRepo = connection.getRepository(Conversation);
  const messageRepo = connection.getRepository(Message);

  async function createConversation(user1Id, user2Id) {
    const user1 = await userRepo.find({
      where: {
        id: user1Id,
      },
    });
    const user2 = await userRepo.find({
      where: {
        id: user1Id,
      },
    });
    if (!user1 || !user2) {
      throw new Error('userId invalid');
    }
    const conversation = conversationRepo.create({ user1Id, user2Id });
    const result = await conversationRepo.save(conversation);
    return result;
  }

  app.post('/login', async (req, res) => {
    const { username } = (req && req.body) || {};
    const user = await userRepo.findOne(username);
    if (user) {
      res.send(true);
      return;
    }
    return res.status(400).send({
      message: 'username invalid',
    });
  });

  app.get('/conversation', async (req, res) => {
    const { username } = (req && req.query) || {};
    const user = await userRepo.findOne({
      where: {
        username,
      },
    });
    const queryBuilder = conversationRepo
      .createQueryBuilder('conversation')
      .where(`conversation.user1Id = :userId OR conversation.user2Id = :userId`, { userId: user.id });
    const conversations = await queryBuilder.getMany();
    return res.send(conversations);
  });

  app.get('/conversation/:id', async (req, res) => {
    const { conversationId } = (req && req.param) || {};
    const conversation = await conversationRepo.findOne({
      where: {
        id: conversationId,
      },
    });
    if (!conversation)
      return res.status(400).send({
        message: 'conversation id invalid',
      });
    conversation.messages = await messageRepo.find({
      where: {
        conversationId: conversation.id,
      },
    });
    return res.send(conversation);
  });

  app.post('/register', async (req, res) => {
    const { username, description, name } = (req && req.body) || {};
    const existedUser = await userRepo.findOne({
      where: {
        username,
      },
    });
    if (existedUser) {
      return res.status(400).send({
        message: 'username existed',
      });
    }
    const user = userRepo.create({
      username,
      description,
      name,
    });
    const result = await userRepo.save(user);
    return res.send(result);
  });

  app.post('/message', async (req, res) => {
    const { username1, username2, content } = (req && req.body) || {};
    const user1 = await userRepo.findOne({
      where: {
        username: username1,
      },
    });
    const user2 = await userRepo.findOne({
      where: {
        username: username2,
      },
    });
    if (!user1 || !user2) {
      return res.status(400).send({
        message: 'user invalid',
      });
    }
    const queryBuilder = await conversationRepo
      .createQueryBuilder(`conversation`)
      .where(`conversation.user1Id IN (:...values) AND conversation.user2Id IN (:...values)`, {values: [user1.id, user2.id]});

    const conversation = await queryBuilder.getOne();
    if (!conversation) {
      conversation = await createConversation(user1.id, user2.id);
    }
    const message = messageRepo.create({
      conversationId: conversation.id,
      userId: user1.id,
      content,
    });
    const result = await messageRepo.save(message);
    socketHash[user1.username].emit('message', result);
    socketHash[user2.username].emit('message', result);
    return res.send(true);
  });

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  io.on('connection', (socket) => {
    socket.on('login', (username) => {
      socketHash[username] = socket;
    });
    console.log('a user is connected');
  });

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
