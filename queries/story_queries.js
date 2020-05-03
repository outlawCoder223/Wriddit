const getStoriesByGenre =
`
SELECT title, content, author_id, photo_url, AVG(rating) AS average_rating
FROM stories
JOIN story_genres ON story_id = stories.id
JOIN genres ON genre_id = genres.id
JOIN users ON author_id = users.id
JOIN story_ratings ON story_rating.story_id = stories.id
WHERE genre = '$1'
GROUP BY title
ORDER BY average_rating DESC
LIMIT 1;
`;

const getStoryById =
`
SELECT created_on, ended_on, content, title, photo_url, genres.name, users.name, AVG(rating) AS average_rating
FROM stories
JOIN story_ratings ON story_ratings.story_id = stories.id
JOIN story_genres ON story_genres.story_id = stories.id
JOIN genres ON genre_id = genres.id
JOIN users ON author_id = users.id
WHERE stories.id = $1
GROUP BY created_on, ended_on, content, title, photo_url, genres.name, users.name
LIMIT 1;
`

const getContributionsByStoryId =
`
SELECT upvotes, content, users.name, created_on
FROM stories
JOIN contributions ON story_id = stories.id
JOIN users ON contributor_id = users.id
WHERE story_id = $1
AND state = 'active';
`

const getStoryOfTheWeek =
`
SELECT stories.title, users.name, stories.photo_url,
FROM stories
JOIN users ON stories.author_id = users.id
WHERE stories.name = $1
`

module.exports = {
  getStoriesByGenre,
  getContributionsByStoryId,
  getStoryById,
  getStoryOfTheWeek
};
