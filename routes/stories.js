const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');

const {
  getCompleteStoryById,
  getIncompleteStoryById,
  getActiveContributions,
  getRandomIncompleteStory,
  getAllUnfinishedStories,
  getRandomCompleteStory,
  getAllTopStories
} = require('../queries/stories_get_queries');

const {
  createNewStory,
  markStoryComplete,
  updateLikesofStory
} = require('../queries/stories_post_queries');

const {
  createContribution,
  renderNewContribution,
  mergeContribution1,
  mergeContribution2,
  getContributionById
} = require('../queries/contributions_queries');

const { getUserName } = require('../queries/users_get_queries');

const { getStoryByGenreName } = require('../queries/genres_queries');

module.exports = (db) => {
  //browse all stories
  router.get('/', (req, res) => {
    const user = req.session.user;
    const templateVars = { user };
    const promise1 = db.query(getUserName, [user]);
    const promise2 = db.query(getRandomIncompleteStory, [4]);
    const promise3 = db.query(getRandomCompleteStory, [3]);
    const promise4 = db.query(getStoryByGenreName);
    Promise.all([promise1, promise2, promise3, promise4])
      .then((data) => {
        templateVars.username = data[0].rows[0].name;

        templateVars.incomplete = {
          first: data[1].rows[0],
          second: data[1].rows[1],
          third: data[1].rows[2]
        };
        templateVars.complete = {
          first: data[2].rows[0],
          second: data[2].rows[1],
          third: data[2].rows[2]
        };
        templateVars.seventh = data[1].rows[3];
        templateVars.genres = {
          comedy: data[3].rows[1],
          romance: data[3].rows[5],
          action: data[3].rows[0],
          crime: data[3].rows[2]
        };
      })
      .then(() => {
        res.render('stories', templateVars);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //create a new story
  router.post('/', (req, res) => {
    const authorId = req.session.user;
    const title = req.body.title;
    const content = req.body.content;
    const genre = req.body.genre;
    db.query(createNewStory, [content, title, authorId, genre])
      .then((data) => {
        const storyId = data.rows[0].id;
        res.redirect(`/stories/${storyId}/contributions`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //generate a writing prompt
  // /writing-prompt
  router.post('/update', (req, res) => {
    const options = {
      uri: 'https://ineedaprompt.com/dictionary/default/prompt?q=adj+noun+adv+verb+noun+location',
      json: true
    };

    rp(options)
      .then((data) => {
        // console.log(data.english);
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // get all stories that are unfinished /stories/unfinished
  router.get('/unfinished', (req, res) => {
    const user = req.session.user;
    const templateVars = { user };
    const promise1 = db.query(getUserName, [req.session.user]);
    const promise2 = db.query(getAllUnfinishedStories);
    Promise.all([promise1, promise2])
      .then((data) => {
        templateVars.username = data[0].rows[0].name;
        templateVars.stories = data[1].rows;
        res.render('unfinished', templateVars)
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // get top stories by like
  router.get('/topStories', (req, res) => {
    const user = req.session.user;
    const templateVars = { user };
    const promise1 = db.query(getUserName, [req.session.user]);
    const promise2 = db.query(getAllTopStories);
    Promise.all([promise1, promise2])
      .then(data => {
        templateVars.username = data[0].rows[0].name;
        templateVars.stories = data[1].rows;
        res.render('topStories', templateVars)
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // read a complete story
  router.get('/:story_id', (req, res) => {
    const id = req.params.story_id;
    const user = req.session.user;
    const templateVars = { user };
    const promise1 = db.query(getUserName, [req.session.user]);
    const promise2 = db.query(getCompleteStoryById, [id]);
    const fct = (story) => {
      if (req.session.user) templateVars.loggedIn = true;
      (story.state !== 'Complete') ? res.redirect(`/stories/${id}/contributions`) : res.render('story', templateVars);
    };
    Promise.all([promise1, promise2])
      .then(data => {
        templateVars.username = data[0].rows[0].name;
        const story = data[1].rows[0];
        templateVars.title = story.title;
        templateVars.content = story.content;
        templateVars.author = story.name;
        templateVars.state = story.state;
        templateVars.photo_url = story.photo_url;
        templateVars.loggedIn = false;
        templateVars.id = id;
        fct(story);
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
    const user = req.session.user;
    const templateVars = { loggedIn: false, complete: false, user };
    const promise1 = db.query(getActiveContributions, [id]);
    const promise2 = db.query(getIncompleteStoryById, [id]);
    const promise3 = db.query(getUserName, [user]);
    if (req.session.user) templateVars.loggedIn = true;
    Promise.all([promise1, promise2, promise3])
      .then(data => {
        templateVars.username = data[2].rows[0].name;
        templateVars.contributions = data[0].rows;
        const story = data[1].rows[0];
        templateVars.title = story.title;
        templateVars.content = story.content;
        templateVars.author = story.name;
        templateVars.state = story.state;
        templateVars.photo_url = story.photo_url;
        templateVars.id = id;
        if (story.state === 'Complete') {
          res.redirect(`/stories/${id}`);
        } else {
          (user === 1) ? res.render('story', templateVars) : res.render('demo_story', templateVars);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //create a new contribution to a story
  router.post('/:story_id/contributions', (req, res) => {
    const storyId = req.body.story_id;
    const contributor_id = req.session.user;
    const content = req.body.content;

    db.query(createContribution, [storyId, content, contributor_id])
      .then((data) => {
        const contributionId = data.rows[0].id;
        db.query(renderNewContribution, [contributionId])
          .then((data) => {
            const result = JSON.stringify(data.rows[0]);
            res.end(result);
          });
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

    db.query(getCompleteStoryById, [story_id])
      .then(data => {
        return data.rows[0].content;
      })
      .then(mergeContent => {
        return db.query(getContributionById, [contribution_id])
          .then(data => {
            return mergeContent += ' ' + data.rows[0].content;
          });
      })
      //Update story content in DB
      .then(mergeContent => {
        return db.query(mergeContribution1, [contribution_id])
          .then(() => {
            return db.query(`
        UPDATE stories SET content = $1
        WHERE stories.id = $2;`, [mergeContent, story_id]);
          });
      })
      .then(() => {
        //update all contribution statuses related to that story
        return db.query(mergeContribution2, [story_id]);
      })
      .then(() => {
        res.status(201).send();
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //mark a story complete
  router.post('/:story_id/complete', (req, res) => {
    const storyId = req.body.storyId;

    db.query(markStoryComplete, [storyId])
      .then(() => {
        console.log('Changed story state to complete.');
        res.status(200).send();
      });

  });

  router.post('/contributionupvote', (req,res) => {
    const query = updateLikesofStory;
    const contributionid = req.body.contId;

    db.query(query, [contributionid])
      .then((response) => {

        res.status(200).json({upvotes: response.rows[0].upvotes});
      });

  });
  return router;
};
