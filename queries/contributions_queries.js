const getContributionsByStoryId = `
SELECT upvotes, content, users.name
FROM stories
JOIN contributions ON story_id = stories.id
JOIN users ON contributor_id = users.id
WHERE story_id = $1
AND state = 'Active';
`;

const createContribution = `
INSERT INTO contributions(story_id, content, contributor_id) VALUES ($1, $2, $3)
RETURNING *;
`

const renderNewContribution = `
SELECT upvotes, name, content, contributor_id, contributions.id
FROM contributions
JOIN users ON contributor_id = users.id
WHERE contributions.id = $1
`

const mergeContribution1 = `
UPDATE contributions
SET status = 'Merged'
WHERE contributions.id = $1;
`
const mergeContribution2 = `
UPDATE stories SET content = '$1'
WHERE stories.id = $2;
`
const mergeContribution3 = `
UPDATE contributions SET status = 'Rejected'
WHERE story_id = $1 AND status = 'Active';
`
const getContributionById = `
SELECT content
FROM contributions
WHERE id = $1
`

module.exports = {
  getContributionsByStoryId,
  createContribution,
  renderNewContribution,
  mergeContribution1,
  mergeContribution2,
  mergeContribution3,
  getContributionById
};
