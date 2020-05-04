const getContributionsByStoryId = `
SELECT upvotes, content, users.name
FROM stories
JOIN contributions ON story_id = stories.id
JOIN users ON contributor_id = users.id
WHERE story_id = $1
AND state = 'Active';
`;

const createContribution = `
INSERT INTO contributions(story_id, content, contributor_id) VALUES ($1, $2, $3);
`

module.exports = {
  getContributionsByStoryId,
  createContribution
};
