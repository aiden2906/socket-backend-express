const EntitySchema = require('typeorm').EntitySchema; // import {EntitySchema} from "typeorm";
const User = require('../models/user').User; // import {Post} from "../model/Post";

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
  },
  relations: {
    messages: {
      type: 'one-to-many',
      target: 'Message',
    },
  },
});
