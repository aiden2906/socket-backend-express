class Conversation {
  constructor(id) {
    this.id = id;
    this.createdAt = new Date();
  }
}

module.exports = {
  Conversation: Conversation,
};
