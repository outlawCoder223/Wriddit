const selectAllStories = `
SELECT content, title, genres.name, users.name, to_char(AVG (rating),'9D9') AS average_rating
FROM stories
JOIN story_ratings ON story_ratings.story_id = stories.id
JOIN story_genres ON story_genres.story_id = stories.id
JOIN genres ON genre_id = genres.id
JOIN users ON author_id = users.id
GROUP BY content, title, genres.name, users.name
LIMIT $1;
`
const getCompleteStoryById = `
SELECT content, title, users.name
FROM stories
JOIN users ON author_id = users.id
WHERE stories.id = $1
`;

const getIncompleteStoryById = `
SELECT content, title, users.name
FROM stories
JOIN users ON author_id = users.id
WHERE stories.id = $1
`;

const getActiveContributions = `
SELECT content, upvotes, contributor_id, name, contributions.id
FROM contributions
JOIN users ON contributor_id = users.id
WHERE status = 'Active' AND story_id = $1
ORDER BY upvotes DESC;
`

const getStoryOfTheWeek = `
SELECT stories.title, users.name
FROM stories
JOIN users ON stories.author_id = users.id
WHERE stories.name = $1
`;

module.exports = {
  selectAllStories,
  getCompleteStoryById,
  getIncompleteStoryById,
  getActiveContributions,
  getStoryOfTheWeek
};
