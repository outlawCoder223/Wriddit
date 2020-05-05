// Javascript for single story page.


$(document).ready(() => {

  const renderPrompt = (prompt) => {
    const $promptBox = $('.prompt-box');
    $promptBox.text(prompt);
    if ($promptBox.is(':visible')) {
      $promptBox.slideUp(100);
    }
    $promptBox.slideDown('slow');
  }

  const $promptButton = $('.prompt-button');

  $promptButton.click(() => {
    $.post('/stories/update', (data) => {
      renderPrompt(data.english)
    })

  })
})
