class Message {
  constructor(id, chatId, content) {
    this.id = id;
    this.chatId = chatId;
    this.content = content;
    this.createdAt = new Date();
  }
}

module.exports = {
  Message: Message,
};
