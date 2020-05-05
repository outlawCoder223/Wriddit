DROP TABLE IF EXISTS story_genres CASCADE;

CREATE TABLE story_genres (
  id SERIAL PRIMARY KEY NOT NULL,
  genre_id INTEGER,
  story_id INTEGER
);

/*
db/schema/06_story_genres.sql
*/
