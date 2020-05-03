const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('homepage')
  });

  router.get('/login/:id', (req,res) => {

  });

  router.post('/logout', (req,res) => {

  });


  return router;
};
