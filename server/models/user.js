class User {
  constructor(id, name, username, description) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.description = description;
    this.createdAt = new Date();
  }
}

module.exports = {
  User: User,
};
