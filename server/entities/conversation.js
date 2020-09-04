const { EntitySchema } = require('typeorm');
const { Conversation } = require('../models/conversation');

module.exports = new EntitySchema({
  name: 'Conversation',
  target: Conversation,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    user1Id: {
      type: 'int',
    },
    user2Id: {
      type: 'int',
    },
    createdAt: {
      type: 'timestamp',
    },
  },
  relations: {
    user1: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
    },
    user2: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
    },
    messages: {
      type: 'one-to-many',
      target: 'Message',
      joinColumn: true,
    }
  },
});
