const getContributionsByStoryId = `
SELECT upvotes, content, users.name
FROM stories
JOIN contributions ON story_id = stories.id
JOIN users ON contributor_id = users.id
WHERE story_id = $1
AND state = 'Active';
`;
/*
SELECT upvotes, content, users.name
FROM contributions
JOIN users ON contributor_id = users.id
WHERE story_id = 60
AND users.id = 18
AND status = 'Active';
*/

const createContribution = `
INSERT INTO contributions(story_id, content, contributor_id) VALUES ($1, $2, $3)
RETURNING *;
`

const renderNewContribution = `
SELECT upvotes, name, content
FROM contributions
JOIN users ON contributor_id = users.id
WHERE contributions.id = $1
`

module.exports = {
  getContributionsByStoryId,
  createContribution,
  renderNewContribution
};
