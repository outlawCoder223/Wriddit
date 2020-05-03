DROP TABLE IF EXISTS genres CASCADE;

CREATE TABLE genres (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL

);

/*
db/schema/02_genres.sql
*/
