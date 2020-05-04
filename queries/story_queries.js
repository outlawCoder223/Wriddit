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
SELECT title, users.name AS author, content
FROM stories
JOIN users ON author_id = users.id
WHERE stories.id = $1
LIMIT 1;
`

const getContributionsByStoryId =
`
SELECT upvotes, content, users.name
FROM contributions
JOIN users ON contributor_id = users.id
WHERE story_id = $1;
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
