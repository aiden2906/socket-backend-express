CREATE DATABASE socketexpress;

CREATE TABLE message (
  id serial PRIMARY KEY,
  user_id serial NOT NULL,
  content VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL
);