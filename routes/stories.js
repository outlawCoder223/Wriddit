const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {

  });

  router.get('/:user_id', (req, res) => {

  });

  router.get('/:story_id', (req, res) => {

  });

  router.get('/:story_id/:contribution_id', (req, res) => {

  });

  router.post('/:story_id', (req, res) => {

  });

  router.post('/:story_id/:contribution_id', (req, res) => {

  });

  router.post('/stories', (req, res) => {

  });

  router.post('/stories/:story_id/:contribution_id', (req, res) => {

  });
  return router;
};
