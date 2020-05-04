const express = require('express');
const router = express.Router();
const randomstring = require("randomstring");
const { getStoriesByGenre,
  selectStoriesByUser,
  selectAllStories,
  selectStoryByUser,
  getContributionsByStoryId,
  getStoryById,
  getStoryOfTheWeek } = require('../queries/get_queries')
const {
  createNewStory,
  markStoryComplete,
  currentStory,
  mergeContributionToStory
} = require('../queries/post_queries')

// browse all stories
module.exports = (db) => {
  router.get('/', (req, res) => {
    let query = getStoryById;
    db.query(query, [1])
      .then(data => {
        const story = data.rows[0].title;
        // console.log('story', data.rows);
        const templateVars = {
          title: story
        };
        // console.log(templateVars);
        res.render('stories', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  // view a single story
  router.get('/:story_id', (req, res) => {
    let query = getStoryById;
    const id = req.params.story_id;
    db.query(query, [id])
      .then(data => {
        const story = data.rows[0];
        // console.log('story', data.rows);
        const templateVars = {
          title: story.title,
          content: story.content
        };
        // console.log(templateVars);
        res.render('story', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  //make a new story
  //PUT
  //DELETE // POST
  router.post('/', (req, res) => {
    let query = createNewStory;
    const authorId = req.body.author_id;
    const title = req.body.title;
    const content = req.body.content;
    //delete dupe - for testing only
    db.query(`DELETE FROM stories WHERE title = '${title}'`)
      //insert story
      .then((db.query(query, [content, title, authorId])))
      //redirect somewhere fun
      .then(() => {
        const templateVars = {
          title,
          content,
          author_id: authorId
        };
        res.render('story', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  //mark a story as complete
  // TODO finish this request
  //need nother route for merging a contribution (PUT)

  router.post('/:story_id', (req, res) => {
    //if statement to determine type of post? is this a thing?

    const storyId = req.params.story_id;
    const authorId = req.body.author_id;
    const title = req.body.title;
    const content = req.body.content;
    const contribution = req.body.contribution;

    let query1 = currentStory;
    let query2 = mergeContributionToStory;

    db.query(query1, [storyId])
      .then(data => {
        db.query(query2, [data, contribution, storyId])
      })
    //need a .then() that removes all the other irrelevant contributions


    //else {}
    /*
    const storyId = req.params.story_id;
    const authorId = req.body.author_id;
    const title = req.body.title;
    const content = req.body.content;
    let query = markStoryComplete;

    db.query(query, [storyId])
      .then(() => {
        const templateVars = {
          title,
          content,
          author_id: authorId
        };
        res.render('story', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
      */
  });

  //make a new contribution


  router.post('/:story_id/contributions', (req, res) => {
    // updating a story to contain a new contribution / reject a bunch of other contributions that didn't make the cut
    //

  });

  // view an individual contribution
  router.get('/:story_id/contributions/:contribution_id', (req, res) => {

  });

  //make a change to a specific contribution ..??
  router.post('/stories/:story_id/:contribution_id', (req, res) => {

  });

  return router;
};
