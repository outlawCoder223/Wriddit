const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:user_id', (req, res) => {
    res.render('index');
  });

  router.get('/:user_id/stories', (req, res) => {

  });

  router.get('/:user_id/:story_id', (req, res) => {

  });

  router.get('/:user_id/:story_id/contributions', (req, res) => {

  });

  router.get('/:user_id/contributions', (req, res) => {

  });

  router.get('/:user_id/:contribution_id', (req, res) => {

  });


  return router;
};
