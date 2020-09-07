const { EntitySchema } = require('typeorm');
const { User } = require('../models/user');

module.exports = new EntitySchema({
  name: 'User',
  target: User,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    description: {
      type: 'varchar',
    },
    avatar: {
      type: 'varchar',
      nullable: true,
    }
  },
  relations: {
    messages: {
      type: 'one-to-many',
      target: 'Message',
    },
  },
});
