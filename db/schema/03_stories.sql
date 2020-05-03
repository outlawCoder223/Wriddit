DROP TABLE IF EXISTS stories CASCADE;

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  state VARCHAR(255) NOT NULL DEFAULT 'In Progress',
  created_on DATE DEFAULT CURRENT_DATE,
  ended_on DATE,
  content TEXT,
  title VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255) NOT NULL DEFAULT 'https://image.shutterstock.com/image-vector/womans-hands-typing-article-on-600w-488967562.jpg',
  author_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

/*
db/schema/03_stories.sql
*/
