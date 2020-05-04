DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) DEFAULT 'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg'
);

/*
db/schema/01_users.sql
*/
