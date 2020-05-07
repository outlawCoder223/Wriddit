require('dotenv').config();
const faker = require('faker');
const { Pool } = require('pg');
const dbParams = require('./db');
const db = new Pool(dbParams);
const { storyAry } = require('./content');
const photoUrls = require('./photo_urls');

// console.log(storyAry.length);
// const sliced = storyAry.slice(1, 3);

let users = [];
let stories = [];
let contributions = [];
let story_ratings = [];

// users objects
for (let i = 0; i < 100; i++) {
  let name = faker.name.firstName() + ' ' + faker.name.lastName();
  let ob = {
    name: name,
  }
  users.push(ob);
}

const insertUsers = (data) => {
  const statement = `INSERT INTO users(name) VALUES `;
  let values = '';
  let row = {};

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
const prepStories = (data) => {

  // console.log(Object.values(data));
  const temp = Object.values(data)

  for (const item of temp) {
    let state = null;
    let likes = faker.random.number(600);
    if (item.state === 1) {
      state = 'Complete'
    } else {
      state = 'In Progress'
    }
    let author_id = Math.ceil(Math.random() * 100);
    let ob = {
      content: item.content,
      state: state,
      title: item.title,
      likes: likes,
      author_id: author_id
    }
    stories.push(ob);
  }
  return stories;
}

const preppedStories = prepStories(storyAry);
// const preppedStories = prepStories(sliced);


//
const insertStories = (data) => {
  const statement = `INSERT INTO stories(content, state, title, likes, photo_url, author_id) VALUES `;
  let values = '';
  let row = {}

  for (let i = 0; i < data.length - 1; i++) {
    row = data[i];
    let value = `('${row.content}', '${row.state}', '${row.title}', '${row.likes}', '${photoUrls[i]}', ${row.author_id})`;
    value += ', ';
    values += value;
  }

  row = data[data.length - 1];
  values += `('${row.content}', '${row.state}', '${row.title}', '${row.likes}', '${photoUrls[data.length - 1]}', ${row.author_id})`;
  values += ';';
  return { statement, values };
}


//contributions objects
for (let i = 0; i < 296; i++) {
  let story_id = Math.ceil(Math.random() * 47);
  let upvotes = Math.floor(Math.random() * 30);
  let content = faker.random.words(Math.ceil(Math.random() * 100))
  let contributor_id = Math.ceil(Math.random() * 100);
  let ob = {
    story_id: story_id,
    upvotes: upvotes,
    content: content,
    contributor_id: contributor_id
  }
  contributions.push(ob);
}


const insertContributions = (data) => {
  const statement = `INSERT INTO contributions(story_id, upvotes, content, contributor_id) VALUES `;
  let values = '';
  let row = {}

  for (let i = 0; i < data.length - 1; i++) {
    row = data[i];
    row.content = row.content.replace("'", "''");
    let value = `(${row.story_id}, ${row.upvotes}, \'${row.content}\', ${row.contributor_id})`;
    value += ', ';
    values += value;
  }

  row = data[data.length - 1];
  row.content = row.content.replace("'", "''");
  values += `(${row.story_id}, ${row.upvotes}, \'${row.content}\', ${row.contributor_id})`;
  values += ';';
  return { statement, values };
}


//ratings objects
for (let i = 0; i < 300; i++) { // 80
  let story_id = Math.ceil(Math.random() * 47);
  let user_id = Math.ceil(Math.random() * 100);
  let rating = Math.ceil(Math.random() * 10);

  let ob = {
    story_id: story_id,
    user_id: user_id,
    rating: rating
  }
  story_ratings.push(ob);
}

//
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


const ob0 = insertUsers(users);
const ob1 = insertStories(preppedStories);
const ob2 = insertContributions(contributions);
const ob3 = insertStoryRatings(story_ratings);


// console.log(ob2);


console.log("Query statement is constructed");


db.connect()
  .then(db => {
    console.log("Connected to DB...");
    // db.query(ob0.statement + ob0.values);
    // db.query(ob1.statement + ob1.values);
    // db.query(ob2.statement + ob2.values);
    db.query(ob3.statement + ob3.values);
  }).catch(err => {
    console.log(err);
  });
