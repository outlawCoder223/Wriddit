const express = require('express');
const router = express.Router();

module.exports = (myDB) => {
  router.get('/myStories', (req, res) => {
    const user = req.session.user;
    myDB.myStories(user)
    .then((templateVars) => {
      res.render('myStories', templateVars);
    });
  });
  return router;
};
