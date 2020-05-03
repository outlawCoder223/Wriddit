DROP TABLE IF EXISTS story_ratings CASCADE;

CREATE TABLE story_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  user_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  rating INTEGER
);

/*
db/schema/05_story_ratings.sql
*/
