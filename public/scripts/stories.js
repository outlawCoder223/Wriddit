// Javascript for /stories

$(document).ready(() => {

  const renderPrompt = (prompt) => {
    const $promptBox = $('.prompt-box');

    if ($promptBox.is(':visible')) {
      $promptBox.slideUp(100, () => {
        $promptBox.text(prompt);
      });
    } else {
      $promptBox.text(prompt);
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
