const create_database = `create database socketexpress;`;
const create_table = `CREATE TABLE message (
  id serial PRIMARY KEY,
  user_id serial NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL
);`;


module.exports = {
  create_table,
  create_database,
};
