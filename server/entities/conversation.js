const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Conversation = require("../models/conversation").Conversation; // import {Post} from "../model/Post";

module.exports = new EntitySchema({
    name: "Conversation",
    target: Conversation,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        createdAt: {
            type: "timestamp"
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
    },
});