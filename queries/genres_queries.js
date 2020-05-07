const getStoriesByGenre = `
SELECT title, content, users.name, genres.name, to_char(AVG (rating),'9D9') AS average_rating
  FROM stories
  JOIN story_genres ON story_genres.story_id = stories.id
  JOIN users ON users.id = author_id
  JOIN genres on genres.id = story_genres.genre_id
  JOIN story_ratings ON stories.id = story_ratings.story_id
  WHERE genre_id = $1
  GROUP BY title, users.id, genres.id
  ORDER BY average_rating DESC
  LIMIT 10;`
  ;

const getStoryByGenreName = `
SELECT DISTINCT ON(genre) genre, title, users.name, likes, photo_url
FROM stories
JOIN users ON users.id = author_id
WHERE likes > 100
ORDER BY genre;
`

module.exports = {
  getStoriesByGenre,
  getStoryByGenreName
};
