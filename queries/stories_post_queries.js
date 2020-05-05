const createNewStory = `
INSERT INTO stories(content, title, author_id) VALUES ($1, $2, $3) RETURNING *;
`

const markStoryComplete = `
UPDATE stories SET state = 'Complete' WHERE id = $1 RETURNING *;
`

module.exports = {
  createNewStory,
  markStoryComplete,
}
