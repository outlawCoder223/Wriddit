const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('landing')
  });

  router.get('/login/:id', (req,res) => {
    const id = req.params;
    req.session.user = 1;
    res.redirect('/stories');
  });

  router.get('/logout', (req,res) => {
    req.session = null;
    res.status(307).redirect('/');
  });

  router.get("/landing", (req, res) => {
    res.render('landing');
  });


  return router;
};
