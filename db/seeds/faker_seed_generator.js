require('dotenv').config();
const faker = require('faker');
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);

faker.seed(10);

let users = [];
let stories = [];
let contributions = [];
let story_ratings = [];
let story_genres = [];

//users objects
for (let i = 0; i < 30; i++) { // 10
  let name = faker.name.firstName() + ' ' + faker.name.lastName();
  let ob = {
    name: name,
  }
  users.push(ob);
}

const insertUsers = (data) => {
  const statement = `INSERT INTO users(name) VALUES `;
  let values = '';
  let row = {}

  for (let i = 0; i < data.length - 1; i++) {
    row = data[i];
    row.name = row.name.replace("'", "''");
    let value = `(\'${row.name}\')`;
    value += ', ';
    values += value;
  }

  row = data[data.length - 1];
  row.name = row.name.replace("'", "''");
  values += `(\'${row.name}\')`;
  values += ';';
  return { statement, values };
}

//stories objects
for (let i = 0; i < 100; i++) { // 40
  let content = faker.lorem.paragraphs(Math.ceil(Math.random() * 12));
  let state = faker.random.number(1);
  if (state === 1) {
    state = 'Complete'
  } else {
    state = 'In Progress'
  }
  let title = faker.lorem.words(Math.ceil(Math.random() * 5));
  let author_id = Math.ceil(Math.random() * 30);
  let ob = {
    content: content,
    state: state,
    title: title,
    author_id: author_id
  }
  stories.push(ob);
}

const insertStories = (data) => {
  const statement = `INSERT INTO stories(content, state, title, author_id) VALUES `;
  let values = '';
  let row = {}

  for (let i = 0; i < data.length - 1; i++) {
    row = data[i];
    row.content = row.content.replace("'", "''");
    row.title = row.title.replace("'", "''");
    let value = `(\'${row.content}\', \'${row.state}\', \'${row.title}\', ${row.author_id})`;
    value += ', ';
    values += value;
  }

  row = data[data.length - 1];
  row.content = row.content.replace("'", "''");
  row.title = row.title.replace("'", "''");
  values += `(\'${row.content}\', \'${row.state}\', \'${row.title}\', ${row.author_id})`;
  values += ';';
  return { statement, values };
}

//contributions objects
for (let i = 0; i < 200; i++) { // 80
  let story_id = Math.ceil(Math.random() * 100);
  let upvotes = Math.floor(Math.random() * 30);
  let state = faker.random.number(1);
  let status = faker.random.number(2);
  if (state === 1) {
    state = 'Complete'
  } else {
    state = 'In Progress'
  }
  if (status === 1) {
    status = 'Active'
  } else if (status === 2) {
    status = 'Rejected'
  } else {
    status = 'Merged'
  }
  let content = faker.lorem.paragraphs(Math.ceil(Math.random() * 5))
  let contributor_id = Math.ceil(Math.random() * 30);
  let ob = {
    story_id: story_id,
    upvotes: upvotes,
    state: state,
    status: status,
    content: content,
    contributor_id: contributor_id
  }
  contributions.push(ob);
}

const insertContributions = (data) => {
  const statement = `INSERT INTO contributions(story_id, upvotes, state, status, content, contributor_id) VALUES `;
  let values = '';
  let row = {}

  for (let i = 0; i < data.length - 1; i++) {
    row = data[i];
    let value = `(${row.story_id}, ${row.upvotes}, \'${row.state}', \'${row.status}', \'${row.content}', ${row.contributor_id})`;
    value += ', ';
    values += value;
  }

  row = data[data.length - 1];
  values += `(${row.story_id}, ${row.upvotes}, \'${row.content}', ${row.contributor_id})`;
  values += ';';
  return { statement, values };
}

//ratings objects
for (let i = 0; i < 200; i++) { // 80
  let story_id = Math.ceil(Math.random() * 100);
  let user_id = Math.ceil(Math.random() * 30);
  let rating = Math.ceil(Math.random() * 10);

  let ob = {
    story_id: story_id,
    user_id: user_id,
    rating: rating
  }
  story_ratings.push(ob);
}

//story_genre objects
for (let i = 0; i < 200; i++) { // 80
  let genre_id = Math.ceil(Math.random() * 12);
  let story_id = Math.ceil(Math.random() * 100);

  let ob = {
    genre_id: genre_id,
    story_id: story_id
  }
  story_genres.push(ob);
}

const insertStoryRatings = (data) => {
  const statement = `INSERT INTO story_ratings(story_id, user_id, rating) VALUES `;
  let values = '';
  let row = {}

  for (let i = 0; i < data.length - 1; i++) {
    row = data[i];
    let value = `(${row.story_id}, ${row.user_id}, ${row.rating})`;
    value += ', ';
    values += value;
  }

  row = data[data.length - 1];

  values += `(${row.story_id}, ${row.user_id}, ${row.rating})`;
  values += ';';
  return { statement, values };
}

const insertStoryGenres = (data) => {
  const statement = `INSERT INTO story_genres(genre_id, story_id) VALUES `;
  let values = '';
  let row = {}

  for (let i = 0; i < data.length - 1; i++) {
    row = data[i];
    let value = `(${row.genre_id}, ${row.story_id})`;
    value += ', ';
    values += value;
  }

  row = data[data.length - 1];
  values += `(${row.genre_id}, ${row.story_id})`;
  values += ';';
  return { statement, values };
}

const ob0 = insertUsers(users);
const ob1 = insertStories(stories);
const ob2 = insertContributions(contributions);
const ob3 = insertStoryRatings(story_ratings);
const ob4 = insertStoryGenres(story_genres);

console.log("Query statement is constructed");

db.connect()
  .then(db => {
    console.log("Connected to DB...");
    db.query(ob0.statement + ob0.values);
    db.query(ob1.statement + ob1.values);
    db.query(ob2.statement + ob2.values);
    db.query(ob3.statement + ob3.values);
    db.query(ob4.statement + ob4.values);
  }).catch(err => {
    console.log(err);
  });
