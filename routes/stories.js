const express = require('express');
const router  = express.Router();
const randomstring = require("randomstring");
const { getStoriesByGenre, getContributionsByStoryId, getStoryById, getStoryOfTheWeek } = require('../queries/story_queries')

module.exports = (db) => {
  router.get('/', (req, res) => {
    let query = getStoryById;
    db.query(query, [1])
      .then(data => {
        const story = data.rows[0].title;
        console.log('story', data.rows);
        const templateVars = {
          title: story
        };
        console.log(templateVars);
        res.render('stories', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get('/:story_id', (req, res) => {
    let query = getStoryById;
    const id = req.params.story_id;
    const templateVars = {};
    db.query(getStoryById, [id])
      .then(data => {
        const story = data.rows[0];
        console.log('story', data.rows);
        // const templateVars = {
        //   title: story.title,
        //   content: story.content,
        //   author: story.author
        // };
        templateVars.title = story.title;
        templateVars.content = story.content;
        templateVars.author = story.author;
        console.log(templateVars);

      })
      .then(() => {
        db.query(getContributionsByStoryId, [id])
          .then(data => {

            console.log('story', data.rows);
            templateVars.contributions = data.rows;
            res.render('story', templateVars);
        })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  router.get('/:story_id/:contribution_id', (req, res) => {

  });

  router.post('/:story_id', (req, res) => {

  });

  router.post('/:story_id/:contribution_id', (req, res) => {
    res.redirect('/');
  });

  router.post('/stories', (req, res) => {

  });

  router.post('/stories/:story_id/:contribution_id', (req, res) => {

  });

  return router;
};
