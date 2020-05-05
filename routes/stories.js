const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');

const { selectAllStories,
  getCompleteStoryById,
  getIncompleteStoryById,
  getActiveContributions
} = require('../queries/stories_get_queries');

const {
  createNewStory,
  markStoryComplete,
} = require('../queries/stories_post_queries');

const { getContributionsByStoryId,
  createContribution,
  renderNewContribution,
  mergeContribution1,
  mergeContribution2,
  mergeContribution3,
  getContributionById
} = require('../queries/contributions_queries');

/**************ESSENTIAL ROUTES***************
 * GET / -- done with hardcoding
 * POST / -- done
 * POST /update (for writing prompt api) // TODO needs tempVars from Josh
 * GET /:story_id  -- done
 * GET /:story_id/contributions
 * POST /:story_id/contributions
 * POST /:story_id/contributions/:contribution_id -- done; need to go over this with Rance
 */

module.exports = (db) => {
  //browse all stories
  router.get('/', (req, res) => {
    res.render('stories');
  });

  //create a new story
  router.post('/', (req, res) => {
    const authorId = req.body.author_id;
    const title = req.body.title;
    const content = req.body.content;
    db.query(createNewStory, [content, title, authorId])
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

  //generate a writing prompt
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
  // TODO  - is this endpoint ever used?
  router.get('/:story_id', (req, res) => {
    const id = req.params.story_id;

    db.query(getCompleteStoryById, [id])
      .then(data => {
        const story = data.rows[0];
        console.log('story:', story)
        const templateVars = {
          title: story.title,
          content: story.content,
          author: story.name,
          complete: true
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
  router.get('/:story_id/contributions', (req, res) => {
    const id = req.params.story_id;
<<<<<<< HEAD
    const templateVars = { loggedIn: false, complete: false };
    if (req.session.user) templateVars.loggedIn = true;
    db.query(query1, [id])
      .then(data => {
        templateVars['contributions'] = data.rows;
        db.query(query2, [id])
          .then(data => {
            const story = data.rows[0];
            templateVars.title = story.title;
            templateVars.content = story.content;
            templateVars.author = story.author;

            res.render('story', templateVars);
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
=======
    let templateVars = {};
    db.query(getActiveContributions, [id])
      .then(data => {
        templateVars['contributions'] = data.rows
      })
    db.query(getIncompleteStoryById, [id])
      .then(data => {
        templateVars['story'] = data.rows;
        res.render('story', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
>>>>>>> master
      });

  });

  //create a new contribution to a story
  router.post('/:story_id/contributions', (req, res) => {
<<<<<<< HEAD
    const query1 = createContribution;
    const query2 = renderNewContribution;
    const storyId = req.body.story_id;
    const contributor_id = req.session.user;
=======
    const storyId = req.params.story_id;
    const contributor_id = req.body.contributor_id;
>>>>>>> master
    const content = req.body.content;

<<<<<<< HEAD
    db.query(query1, [storyId, content, contributor_id])
      .then((data) => {

        const contributionId = data.rows[0].id;
        db.query(query2, [contributionId])
          .then((data) => {

            const result = JSON.stringify(data.rows[0]);
            res.end(result);
          })
=======
    db.query(createContribution, [storyId, content, contributor_id])
      .then(data => {
        const contribution_id = data.rows[0].id;
        return db.query(renderNewContribution, [contribution_id])
      })
      .then(data => {
        console.log(data.rows);
        templateVars['contributions'] = data.rows;
        res.render('story', templateVars);
>>>>>>> master
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //append a contribution to a story
  router.post('/:story_id/contributions/:contribution_id', (req, res) => {
    const contribution_id = req.params.contribution_id;
    const story_id = req.params.story_id;
    let mergeContent;

    //grab existing story content to a var
    db.query(getCompleteStoryById, [story_id])
      .then(data => {
        return mergeContent = data.rows[0].content;
      })
    // append var with target contribution content
    db.query(getContributionById, [contribution_id])
      .then(data => {
        return mergeContent += ' ' + data.rows[0].content;
      })
    //Update story content in DB
    db.query(mergeContribution1, [contribution_id])
      .then(() => {
        //to find fail point
        console.log('hello1');
        return db.query(`
        UPDATE stories SET content = '${mergeContent}'
        WHERE stories.id = ${story_id};`)
      })
      .then(() => {
        //to find fail point
        console.log('hello2');
        //update all contribution statuses related to that story
        return db.query(mergeContribution3, [story_id])
      })
      .then(() => {
        res.redirect(`/stories/${story_id}/contributions`)
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



  //read a contribution
  router.get('/:story_id/contributions/:contribution_id', (req, res) => {

  });


     */
