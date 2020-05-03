DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) NOT NULL DEFAULT 'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg',
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  member_since TIMESTAMP DEFAULT NOW()
);

/*
db/schema/01_users.sql
*/
