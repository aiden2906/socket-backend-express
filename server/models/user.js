class User {
  constructor(id, name, username, description, avatar) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.description = description;
    this.avatar = avatar;
    this.createdAt = new Date();
  }
}

module.exports = {
  User: User,
};
