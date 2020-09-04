const { EntitySchema } = require('typeorm');
const { Message } = require('../models/message');

module.exports = new EntitySchema({
  name: 'Message',
  target: Message,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    conversationId: {
      type: 'int',
    },
    userId: {
      type: 'int',
    },
    content: {
      type: 'varchar',
    },
    createdAt: {
      type: 'timestamp',
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: true,
    },
    conversation: {
      type: 'many-to-one',
      target: 'Conversation',
      joinColumn: true,
    }
  },
});
