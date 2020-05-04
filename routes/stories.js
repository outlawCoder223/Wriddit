const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');

const { selectAllStories,
  getCompleteStoryById,
  getIncompleteStoryById,
  getActiveContributions
} = require('../queries/stories_get_queries')

const {
  createNewStory,
  markStoryComplete,
} = require('../queries/stories_post_queries')

const { getContributionsByStoryId,
  createContribution
} = require('../queries/contributions_queries')

/**************ESSENTIAL ROUTES***************
 * GET / -- done with hardcoding
 * POST / -- done
 * POST /update (for writing prompt api) - needs tempVars
 * GET /:story_id  -- done
 * GET /:story_id/contributions - needs powow with Rance re: templateVars
 */

module.exports = (db) => {
  //browse random stories
  router.get('/', (req, res) => {
    res.render('stories');
  });

  //create a new story
  router.post('/', (req, res) => {
    const query = createNewStory;
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

  router.post('/update', (req, res) => {
    const templateVars = {
      title: req.body.title,
      content: req.body.content,
      author_id: req.body.author_id
    }
    const options = {
      uri: 'https://ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location',
      json: true
    };

    rp(options)
      .then((data) => {
        console.log(data.english);
        //this will need to go into tempVars
        res.render('story', templateVars);

      })
      .catch((err) => {
        console.log(err);
      });
  });

  // read a complete story
  router.get('/:story_id', (req, res) => {
    const query = getCompleteStoryById;
    const id = req.params.story_id;
    db.query(query, [id])
      .then(data => {
        const story = data.rows[0];
        const templateVars = {
          title: story.title,
          content: story.content
        };
        res.render('story', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //read an incomplete story
  // TODO Rance will need to deconstruct and loop through templateVars which are different here. How does that impact the view w.r.t. completed stories?
  router.get('/:story_id/contributions', (req, res) => {
    let query1 = getActiveContributions;
    let query2 = getIncompleteStoryById;
    const id = req.params.story_id;
    let templateVars = {};
    db.query(query1, [id])
      .then(data => {
        templateVars['contributions'] = data.rows
      })
    db.query(query2, [id])
      .then(data => {
        templateVars['story'] = data.rows;
        res.render('story', templateVars);
        console.log(templateVars);

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};


/*******NON-ESSENTIAL ROUTES*********
 * place these in the router as you build them out



  //edit a story's title or content NOT by merge
  router.post('/:story_id', (req, res) => {

  });

  //mark a story complete
  router.post('/:story_id/complete', (req, res) => {

  });

  //delete a story
  router.post('/:story_id/delete', (req, res) => {

  });

  //create a new contribution to a story
  router.post('/:story_id/contributions', (req, res) => {
    const query = createContribution;

  });

  //read a contribution
  router.get('/:story_id/contributions/:contribution_id', (req, res) => {

  });

  //append a contribution to a story
  router.post('/:story_id/contributions/:contribution_id', (req, res) => {
    //how am I going to call this for all contributions, based on ONE button click to merge one? (Need to reject the rest)
  });
     */
