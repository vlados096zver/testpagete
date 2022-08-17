
$(document).on('click', '.catalog__control', function() {
  $('.catalog__result').toggleClass('catalog__result--active');
})

$(document).on('click', '.catalog__subtitle', function(e) {
  let elem = $(e.target).parents('.catalog__inner').find('.check__submenu');
  console.log(elem);
  $(elem).slideToggle(250);
  $(e.target).toggleClass('catalog__subtitle--hide');
})

$(document).on('click', '.catalog__more', function(e) {
  let block = $(this).parents('.catalog__inner');
  let elems = block.find('.check__item[style*="display: none"]');
  let currentButton = $(e.currentTarget);
  elems.addClass('toggleclass');
  let hideElems = currentButton.parents('.catalog__inner').find('.toggleclass');
  hideElems.slideToggle(150);

  let showText = $(e.currentTarget).data('show');
  let hideText = $(e.currentTarget).data('hide');
  currentButton.toggleClass('catalog__more--hide');
  if ($(e.currentTarget).hasClass('catalog__more--hide')) {
    currentButton.find('span').text(hideText);
  } else {
    currentButton.find('span').text(showText);
  }

})

$('.check__item, .check__box').on('click', function(e) {
  let coords = 0;
  let block = $(e.target).parents('.catalog__block');

  if ($(document).width() > 768) {
    coords = $(this).position('.catalog__item--aside').top
  } else {
    coords = $(this).position('.catalog__item--aside').top + 20
  }

  let popup = block.find('.catalog__result');
  $(popup).addClass('catalog__result--active');
  $(popup).css("top", coords);
})


$(document).on('click', '#catalog__filter', function() {
  $('html, body').animate({
    scrollTop: $('#filter').offset().top
  }, 800);
})
