class Message {
  constructor(id, conversationId, userId, content) {
    this.id = id;
    this.conversationId = conversationId;
    this.userId = userId;
    this.content = content;
    this.createdAt = new Date();
  }
}

module.exports = {
  Message: Message,
};
