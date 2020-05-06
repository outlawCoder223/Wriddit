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

const selectStoryByUser = `
SELECT content, title, genres.name, users.name, to_char(AVG (rating),'9D9') AS average_rating
FROM stories
JOIN story_ratings ON story_ratings.story_id = stories.id
JOIN story_genres ON story_genres.story_id = stories.id
JOIN genres ON genre_id = genres.id
JOIN users ON author_id = users.id
WHERE users.id = $1 AND title = '$2'
GROUP BY content, title, genres.name, users.name;
`




module.exports = {
  selectStoriesByUser,
  selectStoryByUser,
};
