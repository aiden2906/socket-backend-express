const EntitySchema = require("typeorm").EntitySchema; // import {EntitySchema} from "typeorm";
const Message = require("../models/message").Message; // import {Post} from "../model/Post";

module.exports = new EntitySchema({
    name: "Message",
    target: Message,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        chatId: {
            type: "int"
        },
        // userId: {
        //     type: "int"
        // },
        content: {
            type: "varchar"
        },
        createdAt: {
            type: "timestamp"
        },
    },
    relations: {
      user: {
        type: 'many-to-one',
        target: 'User',
        joinColumn: true,
      },
    },
});