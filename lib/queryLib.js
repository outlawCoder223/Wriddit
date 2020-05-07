const express = require('express');
const router = express.Router();
const rp = require('request-promise-native');
const { getUserName, getStoriesByUser } = require('../queries/users_get_queries')
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

// const { getUserName } = require('../queries/users_get_queries');

const { getStoryByGenreName } = require('../queries/genres_queries');

module.exports = (db) => {
  const getUsername = (user) => db.query(getUserName, [user]);

  const getRandomIncomplete = (limit) => db.query(getRandomIncompleteStory, [limit]);

  const getRandomComplete = (limit) => db.query(getRandomCompleteStory, [limit]);

  const getByGenre = () => db.query(getStoryByGenreName);

  const getByUser = (user) => db.query(getStoriesByUser, [user]);

  const createStory = (content, title, authorId, genre) => db.query(createNewStory, [content, title, authorId, genre]);

  const getUnfinished = () => db.query(getAllUnfinishedStories);

  const getTop = () => db.query(getAllTopStories);

  const getComplete = (id) => db.query(getCompleteStoryById, [id]);

  const getContributions = (id) => db.query(getActiveContributions, [id]);

  const getIncomplete = (id) => db.query(getIncompleteStoryById, [id]);

  const newContribution = (storyId, content, contributor_id) => db.query(createContribution, [storyId, content, contributor_id]);

  const storyComplete= (storyId) => db.query(markStoryComplete, [storyId]);

  const like = (contributionId) => db.query(updateLikesofStory, [contributionId]);

  const renderContribution = (contributionId) => db.query(renderNewContribution, [contributionId]);

  const browseAllStories = (user, limit1, limit2) => {
    const templateVars = { user };
    const promise1 = getUsername(user);
    const promise2 = getRandomIncomplete(limit1);
    const promise3 = getRandomComplete(limit2);
    const promise4 = getByGenre();
    return Promise.all([promise1, promise2, promise3, promise4])
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
        return templateVars;
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });
    };

  const browseUnfinished = (user) => {
    const templateVars = { user };
    const promise1 = getUsername(user);
    const promise2 = getUnfinished();
    return Promise.all([promise1, promise2])
      .then((data) => {
        templateVars.username = data[0].rows[0].name;
        templateVars.stories = data[1].rows;
        return templateVars;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTopStories = (user) => {
    const templateVars = { user };
    const promise1 = getUsername(user);
    const promise2 = getTop();
    return Promise.all([promise1, promise2])
      .then(data => {
        templateVars.username = data[0].rows[0].name;
        templateVars.stories = data[1].rows;
        return templateVars;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    getTopStories,
    browseUnfinished,
    browseAllStories,
    getByUser,
    getUsername,
    getByGenre,
    getRandomComplete,
    getRandomIncomplete,
    createStory,
    getUnfinished,
    getTop,
    getComplete,
    getContributions,
    getIncomplete,
    newContribution,
    storyComplete,
    like,
    renderContribution
  }
};
