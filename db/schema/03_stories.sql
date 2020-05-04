DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  state VARCHAR(255) NOT NULL DEFAULT 'In Progress', --complete
  content TEXT,
  title VARCHAR(255) NOT NULL,
  author_id INTEGER
);

/*
db/schema/03_stories.sql
*/
