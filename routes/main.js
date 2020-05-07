const express = require('express');
const router = express.Router();

const { getUserName } = require('../queries/users_get_queries')
/**************ESSENTIAL ROUTES***************
 * login get /login/:id
 * logout get /logout
 * homepage get /
 */

module.exports = (db) => {
  router.get("/dev", (req, res) => {
    const user = req.session.user;
    const templateVars = { user };
    if (user) {
      db
        .query(getUserName, [req.session.user])
        .then(data => {
          templateVars['username'] = data.rows[0].name;
          res.render('landing', templateVars);
        })
        .catch(err => {
          console.log(err);
          res
            .status(500)
            .json({ error: err.message });
        });
    } else {
      res.render('landing', templateVars);
    }
  });

  router.get("/", (req, res) => {
    req.session.user = Math.ceil(Math.random() * 98) + 1;
    const user = req.session.user;
    const templateVars = { user };
    db
      .query(getUserName, [req.session.user])
      .then(data => {
        templateVars['username'] = data.rows[0].name;
        res.redirect(`/stories/48/contributions`);
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get('/login/:id', (req, res) => {
    const id = req.params;
    req.session.user = 1;
    res.redirect('/stories');
  });

  router.get('/logout', (req, res) => {
    req.session = null;
    res.status(307).redirect('/dev');
  });

  router.get('/create', (req, res) => {
    const user = req.session.user;
    const templateVars = { user };
    db
      .query(getUserName, [req.session.user])
      .then(data => {
        templateVars['username'] = data.rows[0].name;
        res.render('createStory', templateVars)
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
