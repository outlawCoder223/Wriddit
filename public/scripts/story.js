$('#new-contribution').on('submit', function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  $(this).children('textarea').val('');
  $.post('/stories/:story_id/:contribution_id', data);
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
