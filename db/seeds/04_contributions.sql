/*
db/seeds/04_contributions.sql
*/

INSERT INTO contributions (
  story_id,
  upvotes,
  content,
  contributor_id
) VALUES (
  1,
  12,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus congue nunc eget tempus. Proin imperdiet elit vel tincidunt convallis. Morbi id gravida ante. Cras facilisis, ipsum sed commodo luctus, orci lectus mattis magna, quis luctus neque nunc non metus. Sed interdum quam non dolor ultricies faucibus. Duis egestas maximus sapien at scelerisque. Aenean dolor sapien, porttitor vitae mauris sed, consequat aliquet orci. Duis lobortis a ligula non lacinia. Pellentesque tempus, magna nec laoreet luctus, eros nisl commodo massa, et ornare massa velit et velit.',
  2
);
INSERT INTO contributions (
  story_id,
  upvotes,
  content,
  contributor_id
) VALUES (
  1,
  2,
  'Lorem ipsum dolor sit amet.',
  3
);
INSERT INTO contributions (
  story_id,
  upvotes,
  content,
  contributor_id
) VALUES (
  2,
  7,
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla luctus congue nunc eget tempus. Proin imperdiet elit vel tincidunt convallis. Morbi id gravida ante. Cras facilisis, ipsum sed commodo luctus, orci lectus mattis magna, quis luctus neque nunc non metus. Sed interdum quam non dolor ultricies faucibus. Duis egestas maximus sapien at scelerisque. Aenean dolor sapien, porttitor vitae mauris sed, consequat aliquet orci. Duis lobortis a ligula non lacinia. Duis lobortis a ligula non lacinia.

  Duis lobortis a ligula non lacinia.

  Duis lobortis a ligula non lacinia. Pellentesque tempus, magna nec laoreet luctus, eros nisl commodo massa, et ornare massa velit et velit.',
  3
);
INSERT INTO contributions (
  story_id,
  upvotes,
  content,
  contributor_id
) VALUES (
  1,
  0,
  'Lorem ipsum dolor sit amet.',
  1
);
