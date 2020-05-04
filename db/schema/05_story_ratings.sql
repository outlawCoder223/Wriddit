DROP TABLE IF EXISTS story_ratings CASCADE;

CREATE TABLE story_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER,
  user_id INTEGER,
  rating INTEGER
);

/*
db/schema/05_story_ratings.sql
*/
