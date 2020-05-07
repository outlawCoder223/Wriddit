DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stories CASCADE;
DROP TABLE IF EXISTS contributions CASCADE;
DROP TABLE IF EXISTS story_ratings CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  state VARCHAR(255) NOT NULL DEFAULT 'In Progress',
  content TEXT,
  title VARCHAR(255) NOT NULL,
  likes INTEGER DEFAULT 0,
  author_id INTEGER,
  genre VARCHAR(255),
  photo_url TEXT DEFAULT 'https://4.bp.blogspot.com/-WsoNEbTHj8Y/WKtz7PP4w1I/AAAAAAAAPdA/mW80m701JeUGgFAIMymJYSl-qj6nKC9qACLcB/s1600/tumblr_n721oaDOJ61qjzdqio1_500_large.jpg'
);

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER,
  upvotes INTEGER DEFAULT 0,
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
