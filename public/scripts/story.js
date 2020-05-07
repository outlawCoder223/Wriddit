// Javascript for single story page.

// create new contribution when form submitted
$(document).ready(() => {
  $('#new-contribution').on('submit', function(event) {
    event.preventDefault();
    const url = window.location.pathname;
    const storyId = getStoryId(url);
    const content = $(this).children('textarea')[0].value;
    const data = {
      story_id: storyId,
      content: content,
    };

    $.post('/stories/:story_id/contributions',data)
      .done(function(res) {
        renderPost(JSON.parse(res));
      });
  });

  // merge contribution into story body and erase all previous contributions.
  $('.merge').on('click', function(event) {
    event.preventDefault();

    const contribution = $(this).attr('id');
    const url = window.location.pathname;
    const storyId = getStoryId(url);

    $.post(url + `/${contribution}`, {story_id: storyId, contribution_id: contribution})
      .then(function() {
        window.location.reload();
      });
  });

  // dummy upvote functionality
  $('#contribution-container').on('click','.upvote',function(event) {
    event.preventDefault();
    const self = this;

    const article = $(event.target).closest("article");
    const contId = article.data('id');


    $.post('/stories/contributionupvote', {contId})
      .then(function(res) {
        article.find('.upvote-number').text(res.upvotes);
      });
  });

  $('#mark-complete').click(function(event) {
    const url = window.location.pathname;
    const storyId = getStoryId(url);

    $.post(`/stories/${storyId}/complete`, {storyId})
      .then(function() {
        const origin = window.location.origin;
        const path = '/stories/' + storyId;
        window.location.href = origin + path;
      });
  });

  // parse story id out of url
  const getStoryId = (url) => {
    let parseUrl = url.replace('/stories/', '');

    parseUrl = parseUrl.replace('/contributions', '');
    return parseUrl;
  };

  // creates new contribution post
  const renderPost = (post) => {
    const newPost = `
    <article class="contribution">
                <p>${post.content}</p>
                <footer>
                  <div>
                    <button class="upvote" ><img src="/images/hands-and-gestures.png" alt=""></button>
                    <p>${post.upvotes}</p>
                  </div>
                  <div>
                    <h4>${post.name}</h4>
                      <button id="${post.id}" class="merge">Merge</button>
                  </div>
                </footer>
            </article>
    `;

    $('#contribution-container').prepend(newPost);
    $('#add-contribution').val('');
  };

});
