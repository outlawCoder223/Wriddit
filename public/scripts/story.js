$('#new-contribution').on('submit', function(event) {
  event.preventDefault();
  const url = window.location.pathname;
  const storyId = getStoryId(url);

  const content = $(this).children('textarea')[0].value;
  const data = {
    story_id: storyId,
    content: content,
  }

  $.post('/stories/:story_id/contributions',data)
    .done(function(res) {
      // $(this).children('textarea').val('');
      console.log(res);
    });
});

$('.merge').on('click', function(event) {
  event.preventDefault();
  const contribution = $(this).attr('id');
  const url = window.location.pathname;
  const story = url.replace('/stories/', '');
  $.post(url + '/contributions/:contribution_id', {story_id: story, contribution_id: contribution});
});

$('.upvote').click(function(event) {
  if ($(this).hasClass('on')) {
    const upvoteCount = $(this).siblings('p')[0].innerHTML;
    $(this).siblings('p')[0].innerHTML = Number(upvoteCount) - 1;
    $(this).css('opacity', 0.5);
    $(this).toggleClass('on');
  } else {
    const upvoteCount = $(this).siblings('p')[0].innerHTML;
    $(this).siblings('p')[0].innerHTML = Number(upvoteCount) + 1;
    $(this).css('opacity', 1);
    $(this).toggleClass('on');
  }
});

const getStoryId = (url) => {
  let parseUrl = url.replace('/stories/', '');

  parseUrl = parseUrl.replace('/contributions', '');
  return parseUrl;
};
