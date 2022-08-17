if ($('.user__row').length > 0) {

  //validate name/surname
  $.validator.addMethod("symbols", function(value, element) {
    return this.optional(element) || /^[a-zA-Zа-яёА-ЯіІЇїєЄЁ]+$/.test(value);
  });

  //tel mask validate
  $.validator.methods.tel = function(value, element) {
    return this.optional(element) || /^((\+380)[\- ]?)?(\(?\d{2}\)?[\- ]?)?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/.test(value);
  };

  //email mask validate
  $.validator.methods.email = function(value, element) {
    return this.optional(element) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z-])+\.)+([a-zA-Z]{2,4})+$/.test(value);
  };

  $("#r_new").validate({
    // form validation
  });

  $("#r_old").validate({
    // form validation
  });

}

if ($('.reg__tabs').length > 0) {

  $("#courier-form").validate({
    // form validation
  });
}

$(document).on('input', '.reg__user', function() {
  let validator = $('#courier-form').validate();
  validator.element(this);
});

$('#way-delivery').validate({
  errorPlacement: function(error, element) {
    let block = element.parent()
    block.append(error);
  },
});

$("#r_new").on('submit', function(e) {

  let form = $(this);
  let $userPhone = form.find('.user__input--repeat_phone').val();
  if (form.valid()) {
    if (!$('#user__input--phone').prop("disabled")) {
      $("#r_new").hide();
      $("#r_sms").show();
      $("#r_sms").addClass('active')
      $('#sms-control').focus();
      $('#code-info').text($('#user__input--phone').val());
      timerPopup();
      e.preventDefault();
    } else {
      if ($('.reg').length > 0) {
        e.preventDefault();
      }
      let from = 'row_first',
        to = 'row_second';
      clearTimerBlock();
      secondSlide(from, to);

      let $userName = $('#user__input--name').val();
      let $userSurname = $('#user__input--surname').val();
      let $userEmail = $('#user__input--email').val();
      let $userPhone = $('#user__input--phone').val();

      $('#r_surname').val($userSurname);
      $('#r_name').val($userName);
      $('#r_phone').val($userPhone);

      $('#reg__block--fio').text($userName + ' ' + $userSurname);
      $('#reg__block--phone').text($userPhone);
      $('#reg__block--email').text($userEmail);
    }
  }
})

$("#r_sms").on('submit', function(e) {

  e.preventDefault();
  let $codeInput = $('#sms-control');
  let $codeText = $('.code-block__error');
  let phone = $('#popup-phone').val();

  if ($codeInput.val() != 1234) {
    $codeInput.addClass('error');
    $codeText.show();

  } else {
    $codeInput.removeClass('error');
    $codeText.hide();
    clearTimerBlock();
    $('#r_new').show();
    $('#r_sms').hide();
    console.log($('#user__input--phone'))
    $('#user__input--phone').attr('disabled', true);
    $('.user__col').show();
    $('#get_sms').hide();
    $('#next_step').show();
  }
})

$('#courier-form').on('submit', function(e) {
  e.preventDefault();
  let form = $(this);
  let $courierStreet = form.find('#r_street').val();
  let $courierHouse = form.find('#r_house').val();
  let $courierFlat = form.find('#r_flat').val();

  if (form.valid()) {
    let from = form.closest('.reg__point').attr('id'),
      to = form.closest('.reg__point').attr('data-to');
    secondSlide(from, to);

    let surname = $('#r_surname').val();
    let name = $('#r_name').val();
    let way = $('#r_courier').val();


    $('#reg__block--data').text(name + ' ' + surname);
    $('#reg__block-delivery').text(way);
    $('#reg__block--place').text($courierStreet + ' ' + $courierHouse + ' ' + $courierFlat);
  }
});

$('#way-delivery').on('submit', function(e) {
  e.preventDefault();
  let form = $(this);

  if (form.valid()) {
    let from = form.closest('.reg__point').attr('id'),
      to = form.closest('.reg__point').attr('data-to');
    secondSlide(from, to);

    let way = $('#r_nova').val();
    $('#reg__block-delivery').text(way);
  }
})

$('#pickup').on('submit', function(e) {
  e.preventDefault();
  let form = $(this);

  if (form.valid()) {
    let from = form.closest('.reg__point').attr('id'),
      to = form.closest('.reg__point').attr('data-to');
    secondSlide(from, to);

    let way = $('#r_pickup').val();
    let shop = $('#map').data('title');
    $('#reg__block-delivery').text(way);
    $('#reg__block--place').text(shop);
  }
})

$('.block__wrap input[type=radio]').on('change', function() {
  $('select').removeAttr('name');
  $(this).next().next().find('select').attr('name', 'department');

  $('[name="department"]').rules('remove', 'required')

  $('label[id=department-error]').remove();

  $('#way-delivery').validate();
  $('[name="department"]').rules('add', {
    required: true
  });
})

function secondSlide(from, to) {
  let $from = $('#' + from),
    $to = $('#' + to);
  $from.removeClass('reg__point--edit');
  $to.addClass('reg__point--edit');
  $from.find('.reg__info').slideDown(0);
  $from.find('.reg__col').slideUp(0);
  // $to.find('.reg__col').addClass('edit');
  $to.find('.reg__col').show(0);
  $to.find('.reg__info').slideUp(0);
  $from.find('.reg__back').show(0);

  if ($(window).width() < 768) {
    setTimeout(function() {
      $("html, body").animate({
        scrollTop: $to.offset().top
      }, 400);
    }, 200);
  }
}

function editSlide(par) {
  $('.reg__point').removeClass('reg__point--edit');
  let parent = par.closest('.reg__point');
  let col = parent.find('.reg__col');
  let info = parent.find('.reg__info');
  col.show();
  info.hide();
  parent.addClass('reg__point--edit');
}

$(document).on('click', '.reg__back', function(e) {
  editSlide($(this));
  $('#row_third').find('.reg__col').hide();
  $('.reg__back').hide(0);
});

$(document).on('click', '.reg__box', function() {
  $(".reg__elem").removeClass("reg__elem--active");
  $(this).parents(".reg__elem").addClass("reg__elem--active");
  var index = $(this).parents(".reg__elem").index();
  $(".reg__desc").hide(0).eq(index).fadeIn(0);
})

$(document).on('click', '.pay__desc', function() {
  $(this).hide(150);
  $('.pay__close').show(100);
  $('.pay__block').show(100);
})

$(document).on('click', '.pay__close', function() {
  $(this).hide(100);
  $('.pay__desc').show(100);
  $('.pay__block').hide(100);
})