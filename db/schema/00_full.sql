DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS contributions CASCADE;
DROP TABLE IF EXISTS story_ratings CASCADE;
DROP TABLE IF EXISTS story_genres CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) DEFAULT 'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg'
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  state VARCHAR(255) NOT NULL DEFAULT 'In Progress',
  ended_on DATE,
  content TEXT,
  title VARCHAR(255) NOT NULL,
  author_id INTEGER
);

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER,
  upvotes INTEGER DEFAULT 0,
  state VARCHAR(255) NOT NULL DEFAULT 'In Progress',
  resolved_on DATE,
  status VARCHAR (255) NOT NULL DEFAULT 'Active',
  content TEXT,
  contributor_id INTEGER
);

CREATE TABLE story_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER,
  user_id INTEGER,
  rating INTEGER
);

CREATE TABLE story_genres (
  id SERIAL PRIMARY KEY NOT NULL,
  genre_id INTEGER,
  story_id INTEGER
);

INSERT INTO genres (name) VALUES ('non-fiction'), ('sci-fi'), ('mystery'), ('teen'), ('kids'), ('true crime'), ('biography'), ('horror'), ('detective'), ('adventure'), ('thriller'), ('fan fiction'), ('folktale'), ('short story'), ('fairy tale'), ('theological fiction'), ('opinion piece'), ('essay'), ('self-help');
