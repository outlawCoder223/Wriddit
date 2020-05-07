const express = require('express');
const router = express.Router();

module.exports = (myDB) => {
  router.get('/myStories', (req, res) => {
    const user = req.session.user;
    const templateVars = { user };
    const promise1 = myDB.getUsername(user);
    const promise2 = myDB.getByUser(user)
    Promise.all([promise1, promise2])
      .then((data) => {
        templateVars.username = data[0].rows[0].name;
        templateVars.stories = data[1].rows;
        res.render('myStories', templateVars);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return router;
};
