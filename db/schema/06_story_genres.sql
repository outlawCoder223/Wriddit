DROP TABLE IF EXISTS story_genres CASCADE;

CREATE TABLE story_genres (
  id SERIAL PRIMARY KEY NOT NULL,
  genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE
);

/*
db/schema/06_story_genres.sql
*/
