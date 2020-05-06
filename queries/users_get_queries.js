const selectStoriesByUser = `
SELECT content, title, genres.name, users.name, to_char(AVG (rating),'9D9') AS average_rating
FROM stories
JOIN story_ratings ON story_ratings.story_id = stories.id
JOIN story_genres ON story_genres.story_id = stories.id
JOIN genres ON genre_id = genres.id
JOIN users ON author_id = users.id
WHERE users.id = $1
GROUP BY content, title, genres.name, users.name;
`

const getStoriesByUser = `
SELECT content, title, users.name, stories.state
FROM stories
JOIN users ON author_id = users.id
WHERE users.id = $1
`

const getUserName = `
SELECT name FROM users WHERE id = $1;
`


module.exports = {
  selectStoriesByUser,
  getUserName,
  getStoriesByUser
};
