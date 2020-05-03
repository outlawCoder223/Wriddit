DROP TABLE IF EXISTS story_ratings CASCADE;

CREATE TABLE story_ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id), -- don't cascade on delete so that the vote remains. How does this work? set to NULL or DELETED or sth?
  created_at TIMESTAMP DEFAULT NOW(),
  rating INTEGER
);

/*
db/schema/05_story_ratings.sql
*/
