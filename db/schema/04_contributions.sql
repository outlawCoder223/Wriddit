DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER,
  upvotes INTEGER DEFAULT 0,
  state VARCHAR(255) NOT NULL DEFAULT 'In Progress',
  status VARCHAR (255) NOT NULL DEFAULT 'Active', --rejected, merged
  content TEXT,
  contributor_id INTEGER
);

/*
db/schema/04_contributions.sql
*/
