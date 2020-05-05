const express = require('express');
const router = express.Router();

/**************ESSENTIAL ROUTES***************
 * login get /login/:id
 * logout get /logout
 * homepage get /
 */

module.exports = (db) => {
  router.get("/", (req, res) => {
    const user = req.session.user;
    res.render('landing', {user});
  });

  router.get('/login/:id', (req, res) => {
    const id = req.params;
    req.session.user = 1;
    res.redirect('/homepage');
  });

  router.get('/logout', (req, res) => {
    req.session = null;
    res.status(307).redirect('/');
  });

  router.get("/homepage", (req, res) => {
    const user = req.session.user;
    res.render('homepage', {user});
  });
  return router;
};
