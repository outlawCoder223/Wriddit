const express = require('express');
const router = express.Router();

const { getUserName, getStoriesByUser } = require('../queries/users_get_queries')
/**************ESSENTIAL ROUTES***************
 * login get /login/:id
 * logout get /logout
 * homepage get /
 */

module.exports = (db) => {
  router.get('/myStories', (req, res) => {
    const user = req.session.user;
    const templateVars = { user };

    db
      .query(getUserName, [req.session.user])
      .then(data => {
        templateVars['username'] = data.rows[0].name;
      })
      .then(() => db.query(getStoriesByUser, [user]))
      .then(data => {
        templateVars['stories'] = data.rows;
        res.render('myStories', templateVars);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return router;
};
