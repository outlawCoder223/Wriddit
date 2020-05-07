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

  return {
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
