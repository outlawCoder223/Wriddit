// Javascript for single story page.


$(document).ready(() => {



  const renderPrompt = (prompt) => {



  }
  const $promptButton = $('.prompt-button');


  $promptButton.click(() => {
    console.log('hello');

    $.post('/stories/update', (data) => {
      console.log(data);
    })



  })
})
