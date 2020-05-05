const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //upvote a contribution
  router.post('/contributions/:contribution_id', (req, res) => {

  });

  //edit a draft contribution
  router.post('/contributions/:contribution_id', (req, res) => {

  });

  return router;

};
