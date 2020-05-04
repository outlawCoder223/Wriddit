const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //browse stories by genre
  router.get('/:genre_id/stories', (req, res) => {

  });

  return router;

};
