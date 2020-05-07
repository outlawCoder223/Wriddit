const createNewStory = `
INSERT INTO stories(content, title, author_id, genre) VALUES ($1, $2, $3, $4) RETURNING *;
`


const markStoryComplete = `
UPDATE stories SET state = 'Complete' WHERE id = $1 RETURNING *;
`;


const updateLikesofStory = `
UPDATE contributions SET upvotes = $1 WHERE id = $2 RETURNING *;
`;

module.exports = {
  createNewStory,
  markStoryComplete,
  updateLikesofStory
};
