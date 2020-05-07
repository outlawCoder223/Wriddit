const currentStory = `
SELECT content FROM stories WHERE id = $1;
`
const mergeContributionToStory = `
UPDATE stories SET content = '$1 $2' WHERE id = $3
`


module.exports = {
  currentStory,
  mergeContributionToStory
}
