$( '#new-contribution' ).on( 'submit', function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  $(this).children('textarea').val('');
  $.post('/stories/:story_id/:contribution_id', data);
});
