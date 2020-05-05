const createNewStory = `
INSERT INTO stories(content, title, author_id) VALUES ($1, $2, $3)
`

const markStoryComplete = `
UPDATE stories SET state = 'Complete' WHERE id = $1;
`

module.exports = {
  createNewStory,
  markStoryComplete,
}
