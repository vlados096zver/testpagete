

$(document).ready(function() {

  $('.wysiwyg').find('table').wrap(function() {
    return "<div class='wysiwyg__wrap-table'></div>";
  });

  //sliders 

  if (window.Swiper) {

    let info_swiper = new Swiper(".info__wrap", {
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        clickable: true,
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".info__block .swiper-button-next",
        prevEl: ".info__block .swiper-button-prev",
      },
      allowTouchMove: true,
    });

    let similar_swiper = new Swiper(".similar__wrap", {
      slidesPerView: 4,
      spaceBetween: 4,
      navigation: {
        nextEl: ".similar__holder .swiper-button-next",
        prevEl: ".similar__holder .swiper-button-prev",
      },
      pagination: {
        clickable: true,
        el: ".swiper-pagination",
      },
      allowTouchMove: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        1023: {
          slidesPerView: 3,
        },
        1250: {
          slidesPerView: 4,
        }
      }
    });

    let reviews_swiper = new Swiper(".reviews__wrap", {
      slidesPerView: 3,
      spaceBetween: 24,
      navigation: {
        nextEl: ".reviews__block .swiper-button-next",
        prevEl: ".reviews__block .swiper-button-prev",
      },
      allowTouchMove: true,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1023: {
          slidesPerView: 3,
        }
      }
    });

    let product_swiper = new Swiper(".product__list", {
      slidesPerView: "auto",
      freeMode: true,
      allowTouchMove: true,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    let brends_swiper = new Swiper(".brends__list", {
      slidesPerView: "auto",
      freeMode: true,
      allowTouchMove: true,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    let breadcrumbs_swiper = new Swiper(".catalog__slider", {
      slidesPerView: "auto",
      freeMode: true,
      allowTouchMove: true,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    let card_swipers = new Swiper(".card__slider", {
      slidesPerView: "auto",
      allowTouchMove: true,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });

    let advantages_swiper = new Swiper(".swiper-advantages", {
      slidesPerView: 4,
      spaceBetween: 24,
      allowTouchMove: true,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        560: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        841: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1023: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      }
    });

    let card_gallery = new Swiper(".swiper-card", {
      direction: 'vertical',
      slidesPerView: 5,
      spaceBetween: 13,
      mousewheel: false,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true
      },
      navigation: {
        nextEl: ".card__gallery .swiper-button-next",
        prevEl: ".card__gallery .swiper-button-prev",
      },
      breakpoints: {
        0: {
          direction: 'horizontal',
          spaceBetween: 30,
          slidesPerView: 4,
        },
        1023: {
          direction: 'vertical',
          spaceBetween: 13,
          slidesPerView: 5,
        },
      }
    });

    let single_gallery = new Swiper(".swiper-single", {
      //slidesPerView: 1,
      mousewheel: false,
      navigation: {
        nextEl: ".swiper-card .swiper-button-next",
        prevEl: ".swiper-card .swiper-button-prev",
      },
      thumbs: {
        swiper: card_gallery,
      },
      breakpoints: {
        0: {
          slidesPerView: 'auto',
        },
        1023: {
          slidesPerView: 1,
        },
      }
    });

    let swiperGallery = new Swiper(".about__gallery", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
    });

  }

  $(document).on('click', '.reviews .swiper-button-next, .reviews .swiper-button-prev', function() {
    let items = $('.reviews__text');
    let parents = items.parents('.reviews__item');
    items.each(function(index, item) {
      let parent = $(item).parents('.reviews__item');
      let btn = parent.find('.reviews__more');
      btn.html(btn.data('show'));
      $(item).addClass('reviews__text--gradient').removeClass('reviews__text--active');
      $(item).addClass('reviews__no-animation');
      $(item).css("max-height", '');
      let heightItem = $(item).outerHeight();
      if (heightItem < 114) {
        $(item).removeClass('reviews__text--gradient')
      }
      setTimeout(() => {
        $(item).removeClass('reviews__no-animation');

      }, 300)
    });
  })

  let search = $('.main-header__search');
  if (search.length > 0) {
    function PositionSearchResult() {
      let left = search.offset().left;
      let top = search.offset().top;
      let block = $('.search__block');
      let holder = $('.search__holder')
      let coordsTop;
      coordsTop = top + search.outerHeight() + 15;
      holder.css('maxHeight', `calc(100vh - ${coordsTop}px - 32px - 10px`);
    }

    PositionSearchResult();

    //$(window).resize(PositionSearchResult);
  }

  (function() {
    let media = matchMedia('(max-width: 767px)'),
      matches = media.matches;
    let navigation = $('.main-header');
    listener();

    $(window).resize(listener);
    media.addListener((e) => {
      matches = e.matches

      listener()
    })

    $(window).scroll(listener);

    function listener() {
      let offsetBlock;
      let scrollTop = $(window).scrollTop();
      let heightHeader = $('.main-header').outerHeight(true);

      if (matches) {
        offsetBlock = $(".main-header__text").outerHeight(true) + $('.mob-block').outerHeight(true);
        if (offsetBlock <= scrollTop) {
          $('.main-header').addClass('main-header--fixed');
          $('.wrap').css({
            'margin-top': heightHeader
          })
          navigation.css({
            'top': -offsetBlock + 'px'
          });
        } else {
          $('.main-header').removeClass('main-header--fixed');
          navigation.css({
            'top': -scrollTop
          });
          $('.wrap').css({
            'margin-top': ''
          })
        }
      } else {
        navigation.css({
          'top': ''
        });
        $('.wrap').css({
          'margin-top': ''
        })
      }
    }
  })()

  $(".user__box").on('click', function() {
    $(".user__box ").removeClass("user__box--active").eq($(this).index()).addClass("user__box--active");
    var index = $(this).index();
    $(".user__content").hide().eq(index).fadeIn()
  })

  // add basket product
  function addProductBasket(elem, active) {
    $(elem).on('click', function() {
      $(this).toggleClass(active);
    })
  }

  addProductBasket('.card__btn--favorites', 'card__btn--active');
  addProductBasket('.rcatalog__favorites', 'rcatalog__favorites--active');
  addProductBasket('.product__cart', 'product__cart--active')

  // проверка в каталоге, чтобы могли вводить только цифры

  $(document).on('input', '.catalog__input', function() {
    $(this).val($(this).val().replace(/[A-Za-zА-Яа-яЁё.,-]/, ''));
  });

  $(document).on('blur', '.catalog__input', function() {
    let maxValue = $('.catalog__wrapper').data('max');
    if ($(this).val() > maxValue) {
      $(this).val(maxValue);
    }
  });

  // скролл в карточке товара

  $(document).on('click', '.card__box', function() {
    let target = $(this).attr('href');
    if ($(window).width() >= 768) {
      coordsScroll = $(target).offset().top - $('.card__nav').outerHeight()
    } else {
      coordsScroll = $(target).offset().top - $('.card__nav').outerHeight() - $('.mob-menu').outerHeight()
    }
    $('html, body').animate({
      scrollTop: coordsScroll
    }, 800);
    return false;
  });

  (function() {
    var topMenu = $(".card__nav"),
      activeClass = "card__box--active",
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) return item;
      });

    if ($(window).width() >= 768) {
      topMenuHeight = topMenu.outerHeight() + topMenu.outerHeight()
    } else {
      topMenuHeight = topMenu.outerHeight() + topMenu.outerHeight() + $('.mob-menu').outerHeight()
    }

    // Bind to scroll
    $(window).scroll(function() {
      // Get container scroll position
      var fromTop = $(this).scrollTop() + topMenuHeight;

      // Get id of current scroll item
      var cur = scrollItems.map(function(v, i) {
        if ($(this).offset().top < fromTop) return this;
      });

      // Get the id of the current element
      cur = cur[cur.length - 1] || scrollItems[0];
      var id = cur && cur.length ? cur[0].id : "";


      // Set/remove active class
      menuItems.removeClass(activeClass).filter("[href='#" + id + "']").addClass(activeClass);
    })

  })()

  $(document).on('click', '.filter__block', function() {
    $('.popup--catalog').addClass('popup--active');
  })

  //popups

  $(document).on('click', '.catalog__btn-mob', function(e) {
    $('.popup').removeClass('popup--active');
    scrollLock.enablePageScroll();
    clearTimerBlock();
  })

  $(document).on('click', '.popup__close-order', function() {
    $('.popup').removeClass('popup--active');
    $('.wrap').removeClass('wrap--active');
    scrollLock.enablePageScroll();
  })

  $(document).on('click', '.rcard__conditions', function() {
    $('.popup--conditions').addClass('popup--active');
    let scrollableElement = document.querySelector('.conditions__wrapper');
    scrollLock.addScrollableTarget(scrollableElement);
    scrollLock.disablePageScroll();
  })

  $(document).on('click', '.card__size', function() {
    $('#popup--size').addClass('popup--active');
    let scrollableElement = document.querySelector('.size__wrapper');
    scrollLock.addScrollableTarget(scrollableElement);
    scrollLock.disablePageScroll();
  })

  $(document).on('click', '.equipment__desc', function() {
    $('#popup--change').addClass('popup--active');
    let scrollableElement = document.querySelector('.size__wrapper');
    scrollLock.addScrollableTarget(scrollableElement);
    scrollLock.disablePageScroll();
  })

  $(document).on('click', '.product__notification, .card__btn--available', function() {
    $('#popup--msg').addClass('popup--active');
    let scrollableElement = document.querySelector('.availability__inner');
    scrollLock.addScrollableTarget(scrollableElement);
    scrollLock.disablePageScroll();
    $('.availability__input').focus();
  })

  $(document).on('click', '.availability__close', function() {
    $('.popup').removeClass('popup--active');
  })

  $(document).on('mousedown', function(e) {
    if ($('.popup--city').is(e.target) && $('.city__inner').has(e.target).length === 0) {
      $('.popup--city').removeClass('popup--active');
      scrollLock.enablePageScroll();
    }
  })

  $(document).on('click', '.main-header__shop', function() {
    scrollLock.enablePageScroll();
  })

  $(document).mousedown(function(e) {

    if ($('.popup--conditions').is(e.target) && $('.conditions__inner').has(e.target).length === 0) {
      $('.popup--conditions').removeClass('popup--active');
      scrollLock.enablePageScroll();
    };

    if ($('.popup--order').is(e.target) && $('.popup--order').has(e.target).length === 0) {
      $('.popup').removeClass('popup--active');
      scrollLock.enablePageScroll();
    }

    if ($('.popup--size').is(e.target) && $('.popup--size').has(e.target).length === 0) {
      $('.popup').removeClass('popup--active');
      scrollLock.enablePageScroll();
    }

    if ($('.popup--map').is(e.target) && $('.popup--map').has(e.target).length === 0) {
      $('.popup').removeClass('popup--active');
      scrollLock.enablePageScroll();
    }

    if ($('.popup--phone').is(e.target) && $('.popup--phone').has(e.target).length === 0) {
      $('.popup--phone').removeClass('popup--active');
      scrollLock.enablePageScroll();
    }

    if ($('.popup--code').is(e.target) && $('.popup--code').has(e.target).length === 0) {
      clearTimerBlock();
      $('.popup--code').removeClass('popup--active');
      scrollLock.enablePageScroll();
    }

    if ($('#popup--msg').is(e.target) && $('#popup--msg').has(e.target).length === 0) {
      $('.popup').removeClass('popup--active');
      scrollLock.enablePageScroll();
    }

    if ($('#popup--send').is(e.target) && $('#popup--send').has(e.target).length === 0) {
      $('.popup').removeClass('popup--active');
      scrollLock.enablePageScroll();
    }

    if ($('.personal__list').length > 0 && !$('.personal__text').is(e.target) && !$('.personal__text span').is(e.target) && !$('.personal__list').is(e.target) &&
      $('.personal__text--active').length > 0) {
      $('.personal__text ').removeClass('personal__text--active');
      $('.personal__item--aside').removeClass('personal__item--popup');
      $('.personal__list').attr('style', '');
      $('.wrap').removeClass('wrap--block');
      scrollLock.enablePageScroll();
    }

  });

  $(document).on('click', '.wrap--popup', function(e) {
    if ($(e.target).hasClass('wrap--popup')) {
      $('.holder').removeClass('holder--active');
      $('.wrap').removeClass('wrap--popup');
      scrollLock.enablePageScroll();
    }
  });

  //city

  $(document).on('click', '.city__item', function(e) {
    let value = $(e.target).text();
    $('.city__selection .select2-selection__rendered').text(value);
    $('.main-header__map').text(value);
  })

  $(document).on('click', '.city__close, .city__btn', function(e) {
    $('.popup--city').removeClass('popup--active');
    scrollLock.enablePageScroll();
  })

  // map

  $(document).on('click', '.main-header__map', function() {
    $('.popup--city').addClass('popup--active');
    scrollLock.disablePageScroll();
  })

  // card
  $(document).on('click', '.card__btn--buy', function(e) {
    let value = $('.card__value').val();
    if(value.length>0) {
      e.preventDefault()
      $('.popup--order').addClass('popup--active');
      $('#startAnimationOrder')[0].beginElement();
      scrollLock.disablePageScroll();
      setTimeout(function() {
        $('#popup--order').removeClass('popup--active');
        scrollLock.enablePageScroll();
      }, 3000)
    } else {
      let scrollToError = 0;
      if ($(window).width() >= 768) {
        scrollToError =  $('.card__layout').offset().top - $('.card__nav').outerHeight(true)
      } else {
        scrollToError = $('.card__layout').offset().top - $('.card__nav').outerHeight(true) - $('.mob-menu').outerHeight(true)
      }
      $("html, body").animate({
        scrollTop: scrollToError
      }, 400);
    }
  })

  $(document).on('click', '.card__change', function() {
    let value = $(this).find('.card__input').attr('id');
    $('.card__value').val(value);
    $('.card__error .error').hide();
  })

  // анимация кнопки загрузить еще

  $(document).on('click', '.product__btn', function(e) {
    $(e.currentTarget).addClass('product__btn--active');

    setTimeout(function() {
      $(e.currentTarget).removeClass('product__btn--active');
    }, 1000)

  })


  $(document).on('mouseover click', '.product__bg', function(e) {
    let elem = e.currentTarget;
    let indexElem = $(elem).data('index');
    let parent = $(elem).parents('.product__item');
    let block = parent.find('.product__bg');
    let image = parent.find('.product__image');
    let size = parent.find('.product__wrap-size')

    block.removeClass('product__bg--active');
    $(this).addClass('product__bg--active');

    image.removeClass('product__image--visible');
    image.eq(indexElem).addClass('product__image--visible');

    size.find('.product__size').removeClass("product__size--active");
    size.find('.product__size').eq(indexElem).addClass("product__size--active");

  })

  $('.mob-menu__open, .mob-menu__link--search').on('click', function() {
    $('.popup--menu').toggleClass('popup--active');
  })

  $('.mob-menu__close').on('click', function() {
    $('.popup--menu').toggleClass('popup--active');
  })

  $(document).on('click', '.mob-menu__link--search', function() {
    $('.popup__input').focus();
  })

  $(document).on('click', '.mob-menu__link--catalog', function(e) {

    $('.popup--inner').toggleClass('popup--active');
    e.preventDefault();
  })

  $(document).on('click', '.popup__col', function() {
    var text = $(this).text();
    $(this).parents('li').find('.popup__submenu').addClass('popup__submenu--active')
    $('.popup__title').addClass('popup__title--active');
    $('.popup__title--active').text(text);
    $('.popup__elem').addClass('popup__elem--inner');
  })

  $(document).on('click', '.popup__elem', function() {
    $('.popup__submenu').removeClass('popup__submenu--active');
    $('.popup__title').removeClass('popup__title--active');
    let title = $('.popup__title').data('title');
    $('.popup__title').text(title);
    //if($('.popup__elem').hasClass('popup__elem--inner')){
    $('.popup--inner').removeClass('popup--active');
    //}
  })

  $(document).on('click', '.popup__title--active', function() {
    let title = $('.popup__title').data('title');
    $('.popup__title').text(title);
    $('.popup__submenu').removeClass('popup__submenu--active');
    $('.popup__title').removeClass('popup__title--active');
  })


  let iframeContainer = $('#map');
  if ($('#map').length > 0) {

    let advancedOffset = 150;
    let iframeContainerOffsetTop = Math.round(iframeContainer.offset().top);
    let windowHeight = $(window).height();


    $(window).scroll(function() {
      if ($(this).scrollTop() >= (iframeContainerOffsetTop - windowHeight - advancedOffset)) {
        // При прокрутке страницы делаем проверку на наличие iframe внутри div, если его нет, то добавляем в него iframe
        // Если не делать эту проверку, то при каждом скролле у нас в div будет обновляться iframe и по новой загружаться
        if (!iframeContainer.hasClass('active')) {
          iframeContainer.addClass('active');
        }
      }
    });
  }

  function sizeSelect() {
    if ($('.rcard').length > 0) {
      $('.size__select').select2({
        selectionCssClass: 'size__selection',
        dropdownCssClass: 'size__dropdown',
        placeholder: 'Оберіть розмір',
        language: "uk"
      }).on('change', function() {
        let value = $(this).val();
        let wrapSelect = $(this).parent();
        wrapSelect.removeClass('error');
        wrapSelect.parents('.point').find('input').val(value);
      });
    }

  }

  function citySelect() {
    if ($('.city__wrap-select').length > 0) {
      $('select[name="city"]').select2({
        selectionCssClass: 'city__selection',
        dropdownCssClass: 'city__dropdown',
        language: "uk"
      }).on('select2:open', function(e) {
        if ($(window).width() < 768) {
          $('.select2-search input').prop('focus', false);
        }
        let textPlaceholder = $(this).data('placeholder');
        $(this).data('select2').$dropdown.find(':input.select2-search__field').attr('placeholder', textPlaceholder);
      });
    }

  }

  function departmentSelect() {
    if ($('.reg').length > 0) {
      $('select[name="department"]').select2({
        placeholder: $(this).data('placeholder'),
        selectionCssClass: 'department__selection',
        dropdownCssClass: 'department__dropdown',
        language: "uk"
      }).on('select2:open', function(e) {
        $('.select2-search input').prop('focus', false);
        let textPlaceholder = $(this).data('search');
        $(this).data('select2').$dropdown.find(':input.select2-search__field').attr('placeholder', textPlaceholder);
      }).on('change', function(e) {
        $('label[id=department-error]').remove();
        let place = $(this).parent('.block__box').find('.select2-selection__rendered').text();
        $('#reg__block--place').text(place);
      });

    }
  }

  function filterSelect() {
    if ($('.filter__text').length > 0) {
      $('.filter__select').select2({
        selectionCssClass: 'filter__selection',
        dropdownCssClass: 'filter__dropdown',
        language: "uk"
      });
    }
  }

  filterSelect();
  citySelect();
  sizeSelect();
  departmentSelect();

});


$(document).on('input', '.catalog__field', function(e) {

  let isFound;
  $(e.target).parents('.catalog__inner--brends').find('.check__label').each((i, el) => {
    let is = $(el).html().toLowerCase().indexOf(e.target.value.toLowerCase()) != -1;
    $(el).parents('.check__item').css("display", is ? "flex" : "none");
    if (is) isFound = true;
  });
})

$(document).on('click', '.card__link', function(){
  $('#popup--map').addClass('popup--active');
  scrollLock.disablePageScroll();
})

$(document).on('click', '.brends__box', function(e) {
  let target = $(this).attr('href');
  if ($(window).width() >= 768) {
    coordsScroll = $(target).offset().top - $('.brends__list').outerHeight()
  } else {
    coordsScroll = $(target).offset().top - $('.brends__list').outerHeight() - $('.mob-menu').outerHeight()
  }
  $('html, body').animate({
    scrollTop: coordsScroll
  }, 300);
  e.preventDefault();
});

$(document).on('click', '.main-header__box--cart', function(e) {
  let scrollableElement = document.querySelector('.holder__popup');
  scrollLock.addScrollableTarget(scrollableElement);
  scrollLock.disablePageScroll();
  e.preventDefault();
  if ($('.holder').length > 0) {
    $('.wrap').addClass('wrap--popup');
    $('.holder').addClass('holder--active');
  }
})

$(document).on('click', '.holder__close', function() {
  $('.wrap').removeClass('wrap--popup');
  $('.holder').removeClass('holder--active');
  scrollLock.enablePageScroll();
})

if ($('input[type="tel"]').length > 0) {
  $('input[type="tel"]').mask('+38k (00) 000-00-00', {
    selectOnFocus: false,
    'translation': {
      'k': {
        pattern: /[0]/,
        fallback: '0'
      },
    },
    optional: true,
    // placeholder: "+380",
  });

}

if ($('.availability__wrap').length > 0) {

  //tel mask validate
  $.validator.methods.tel = function(value, element) {
    return this.optional(element) || /^((\+380)[\- ]?)?(\(?\d{2}\)?[\- ]?)?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/.test(value);
  };


  $("form[name='availability']").validate({
    errorPlacement: function(error, element) {
      error.hide();
    },
  });

  $("form[name='availability']").on('submit', function(e) {
    let form = $(this);
    if (form.valid()) {
      $('#popup--msg').removeClass('popup--active');
      $('#popup--send').addClass('popup--active');
      document.querySelector('#startAnimation').beginElement();
      setTimeout(function() {
        $('#popup--send').removeClass('popup--active');
        scrollLock.enablePageScroll();
      }, 3000)
    }
    e.preventDefault();
  })
}

$(document).on('click', '.checkout__link', function() {
  history.back();
})

$(document).on('click', '.catalog__elem', function() {
  $('.catalog__elem').removeClass('catalog__elem--active');
  $(this).addClass('catalog__elem--active');
})


$(document).on('click', '.favorites__box', function() {
  let mask = $('.favorites__mask');
  mask.css("left", $(this).position().left + "px");
  $('.favorites__box').removeClass('favorites__box--active');
  $(this).addClass('favorites__box--active');
  let index = $(this).index();
  $(".favorites__item").hide().eq(index).fadeIn()
});

// Personal

$(document).on('click', '.personal__btn--edit, .personal__input', function(e) {
  let wrapper = $(e.target).parents('.personal__box');
  wrapper.addClass('personal__box--is-editing');
  wrapper.find('.personal__input').focus();
})

$(document).on('click', '.personal__btn--edit', function() {
  let wrapper = $(this).parents('.personal__box');
  let input = wrapper.find('.personal__input');
  let inpValue = input.val();
  input.focus().val('').val(inpValue);
})

$(document).on('blur', '.personal__input', function(e) {
  let wrapper = $(e.target).parents('.personal__box');
  wrapper.removeClass('personal__box--is-editing');
})

$(document).on('click', '.personal__text', function() {
  $('.wrap').toggleClass('wrap--block');
  $('.personal__list').slideToggle(250);
  $(this).toggleClass('personal__text--active');
  $('.personal__item--aside').toggleClass('personal__item--popup');

  if ($(this).hasClass('personal__text--active')) {
    let scrollableElement = document.querySelector('.personal__list');
    scrollLock.disablePageScroll();
    scrollLock.addScrollableTarget(scrollableElement);
  } else {
    scrollLock.enablePageScroll();
  }
})

$(window).resize(function() {
  if ($(window).width() >= 768) {
    $('.wrap').removeClass('wrap--block');
    $('.personal__list').attr('style', '');
    $('.personal__text').removeClass('personal__text--active');
    $('.personal__item--aside').removeClass('personal__item--popup');
  }
});

$(document).on('click', '.history__btn', function() {
  $(this).parents('.history__box').find('.history__submenu').slideToggle(200);
  $(this).toggleClass('history__btn--active');
  if ($(this).hasClass('history__btn--active')) {
    $(this).html($(this).data('hide'));
  } else {
    $(this).html($(this).data('show'));
  }
})

$(".workshop__box").click(function() {
  $(".workshop__box").removeClass("workshop__box--active").eq($(this).index()).addClass("workshop__box--active");
  let index = $(this).index();
  $(".workshop__item").hide().eq(index).fadeIn()
})

if ($('.personal__user').length > 0) {

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


  $('#personal__form').validate({
    // form validation
  });

}

$(document).on('input', '.personal__input', function() {
  let validator = $('#personal__form').validate();
  validator.element(this);
});

// search

$(document).on('input', '.main-header__input', function() {
  let value = $(this).val().trim().toLowerCase();
  let list = $('.search__box a');
  $('.search__block').addClass('search__block--active');
  if (value != '') {

    list.each(function(index, elem) {
      if ($(elem).text().search(value) == -1) {
        $(elem).parent().addClass('hide');
        $(elem).html($(elem).text());
      } else {
        $(elem).parent().removeClass('hide');
        let str = $(elem).text();
        $(elem).html(insertMark(str, $(elem).text().search(value), value.length));
      }
    });
  } else {
    list.each(function(index, elem) {
      $(elem).parent().removeClass('hide');
      $(elem).html($(elem).text());
    })
  }

})

function insertMark(string, pos, len) {
  return string.slice(0, pos) + '<span class="search__query">' + string.slice(pos, pos + len) + '</span>' + string.slice(pos + len);
}

$(document).mouseup(function(e) {
  let div = $('.search__block');
  if (!div.is(e.target) &&
    div.has(e.target).length === 0 && !$('.main-header__search').is(e.target) &&
    $('.main-header__search').has(e.target).length === 0 && $('.search__block').hasClass('search__block--active')) {
    hideSearchBlock();
  }
});

$(document).on('focus', '.main-header__input', function() {
  if ($(this).val().length > 0) {
    $('.main-header__close').addClass('main-header__close--active');
    showSearchBlock();
  }
})

$(document).on('input', '.main-header__input', function() {
  if ($(this).val().length > 0) {
    $('.main-header__close').addClass('main-header__close--active');
  }
})

$('.main-header__input').one('keydown', function() {
  showSearchBlock();
});


$(document).on('click', '.main-header__close', function(e) {
  hideSearchBlock();
})

function showSearchBlock() {
  let scrollableElement = document.querySelector('.search__holder');
  scrollLock.addScrollableTarget(scrollableElement);
  scrollLock.disablePageScroll();
}

function hideSearchBlock() {
  scrollLock.enablePageScroll();
  $('.search__block').removeClass('search__block--active');
  $('.main-header__close').removeClass('main-header__close--active');
}

// прокрутка вверх

var heightDevice = $(window).height();
$(window).scroll(function() {
  hideLink();
});

$(window).on('resize', function() {
  heightDevice = $(window).height();
  hideLink();
});

function hideLink() {
  if ($(window).scrollTop() > heightDevice) {
    $('.scroll-up').fadeIn(100);
  } else {
    $('.scroll-up').fadeOut(100);
  }
}

$('.scroll-up').click(function(event) {
  event.preventDefault();
  $('body,html').animate({
    scrollTop: 0
  }, 700);
  return false;
});

function trickMob() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}


window.addEventListener('resize', () => {
  trickMob();
});


window.addEventListener('scroll', () => {
  trickMob();
});


trickMob();

// menu hover

let timeoutId = -1;

$('.menu__elem').on('mouseover', function() {
  clearTimeout(timeoutId);
  const el = $(this);
  timeoutId = setTimeout(() => el.addClass('hover'), 500);
});

$('.menu__elem').on('mouseleave', function() {
  clearTimeout(timeoutId);
  $(this).removeClass('hover')
});

$(window).on('load', function() {

  function readMoreText(item, more, text, block, gradient, active, value) {
    $(item).on('click', more, function(e) {
      let elem = $(e.target).parents(item);

      let btn = elem.find(more);
      let textElem = elem.find(text);
      let heightItem = elem.find(block).height();

      textElem.toggleClass(gradient);

      if (textElem.hasClass(active)) {
        btn.html(btn.data('hide'));
        textElem.css("max-height", heightItem);
      } else {
        btn.html(btn.data('show'));
        textElem.css("max-height", value);
      }
    })
  }

  function loadMoreText(text, block, item, more, active, gradient, value) {
    let elems = $(text);
    elems.each(function(index, elem) {
      let heightItem = $(elem).find(block).height();
      const parentElem = $(elem).parents(item);
      const btnItem = parentElem.find(more);
      if (heightItem > value) {
        btnItem.html(btnItem.data('show'));
        btnItem.addClass(active);
        $(elem).addClass(gradient);
      }
    })
  }

  // reviewsButton

  loadMoreText('.reviews__text', '.reviews__block', '.reviews__item', '.reviews__more', 'reviews__more--active', 'reviews__text--gradient', 114);

  readMoreText('.reviews__item', '.reviews__more', '.reviews__text', '.reviews__block', 'reviews__text--active reviews__text--gradient', 'reviews__text--active', '114px');

  // cardtButton

  loadMoreText('.card__text', '.card__block', '.card__wrap', '.card__more', 'card__more--active', 'card__text--gradient', 299);

  readMoreText('.card__wrap', '.card__more', '.card__text', '.card__block', 'card__text--active card__text--gradient', 'card__text--active', '299px');

  // contenttButton

  loadMoreText('.content__text', '.content__block', '.content__item', '.content__more', 'content__more--active', 'content__text--gradient', 57);

  readMoreText('.content__item', '.content__more', '.content__text', '.content__block', 'content__text--active content__text--gradient', 'content__text--active', '57px');

  $('.content__more').on('click', function() {
    $(this).toggleClass('content__more--inner');
  })

})


function fixedFilter(item, wrap) {
  if (window.innerWidth >= 768) {

    if ($(item).length > 0) {
      $(item).theiaStickySidebar({
        'containerSelector': 'wrap',
        'updateSidebarHeight': true,
        'additionalMarginTop': 0,
        'additionalMarginBottom': 0
      });
    }
  }
}

fixedFilter('.catalog__item--aside', '.catalog__wrap');
fixedFilter('.rcatalog__item--aside', '.rcatalog__wrap');

let intrvl = 0;

function timerPopup() {
  $('.code-block__send').hide(0);
  $('.code-block__desc').show(0);

  let spanTime = $('.code-block__desc span[data-time]');
  let time = Number(spanTime.data('time'));
  time = time - 1;

  intrvl = setInterval(function() {
    if (time <= 0) {
      clearInterval(intrvl);
      $('.code-block__desc').hide();
      $('.code-block__send').show();

      spanTime.text(time);
      time = Number(spanTime.data('time'));
    }

    spanTime.text(time--)
  }, 1000)
}

function clearTimerBlock() {
  clearInterval(intrvl);
  $('.code-block__desc span').text(60);
}

$(document).on('click', '#code-block__back', function(e) {
  clearTimerBlock();
  $('#r_new').show();
  $('#r_sms').hide();
  e.preventDefault()
})

$(document).on('click', '.personal__change', function() {
  $('#popup--phone').addClass('popup--active');
  scrollLock.disablePageScroll();
  $('#popup--phone .code-block__input').focus();
})

$(document).on('click', '.code-block__elem', function() {
  $('#popup--code').removeClass('popup--active');
  if ($('.popup').hasClass('popup--new')) {
    $('#user__input--phone').focus();
  } else {
    $('#user__input--repeat_phone').focus();
  }

  $('.popup--code').removeClass('popup--active popup--new popup--single');
})


if ($('#popup--code').length > 0) {

  //tel mask validate
  $.validator.methods.tel = function(value, element) {
    return this.optional(element) || /^((\+380)[\- ]?)?(\(?\d{2}\)?[\- ]?)?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/.test(value);
  };

  $("#form-phone").validate({
    // form validation
  });

}


// Phone profile-info 

$("#form-phone").on('submit', function(e) {

  let form = $(this);
  if (form.valid()) {
    let phone = $('#popup-phone').val();
    let scrollableElement = document.querySelector('.code-block__inner');
    scrollLock.addScrollableTarget(scrollableElement);
    //scrollLock.disablePageScroll();
    $('#popup--phone').removeClass('popup--active');
    $('#popup--code').addClass('popup--active');
    $('#sms-control').focus();
    timerPopup();
    $('.code-block__phone').text(phone);
  }
  e.preventDefault();
});

$(document).on('click', '#code-block__prev', function() {
  clearTimerBlock();
  $('#popup--phone').addClass('popup--active');
  $('#popup--code').removeClass('popup--active');
  $('#popup--phone .code-block__input').focus();
})

$('#popup-sms').on('submit', function(e) {
  e.preventDefault();
  let $codeInput = $('#sms-control');
  let $codeText = $('.code-block__error');
  let $codePopup = $('#popup--code');
  let phone = $('#popup-phone').val();

  if ($codeInput.val() != 1234) {
    $codeInput.addClass('error');
    $codeText.show();
  } else {
    scrollLock.enablePageScroll();
    $codeInput.removeClass('error');
    $codeText.hide();
    $codePopup.removeClass('popup--active');
    $('#p_phone').val(phone);
  }
});

  $('select').on('select2:open', function () {
    $('.select2-results__options').mCustomScrollbar('destroy');
    $('.select2-results__options').mCustomScrollbar('update');
    setTimeout(function() {
        $('.select2-results__options').mCustomScrollbar({
            axis: 'y',
            scrollbarPosition: 'inside',
            advanced:{
                updateOnContentResize: true
            },
            live: true
        });
    }, 0);
});


if ($('.card__form').length > 0) {
 $('.card__form').validate({
    errorPlacement: function(error, element) {
      $('.card__error').append(error);
    },
 });
}

// Progress Bar

// Utils
const clamp = (min, max, value) => Math.max(min, Math.min(max, value));

const lerp = (min, max, value) => (1 - value) * min + value * max;

const easeInOutSine = x => -(Math.cos(Math.PI * x) - 1) / 2;

// Circle bar logic
const createCircleBar = (width, height, progress, color) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  [canvas.width, canvas.height] = [width, height];

  const offset = -Math.PI / 2;
  const lineWidth = 10;
  const radius = Math.min(width / 2, height / 2);
  const duration = 600;
  let inProgress = false;
  let isDrawed = false;

  const reset = () => {
    context.clearRect(0, 0, width, height);
    isDrawed = false;
  };

  const draw = progress => {
    const angle = Math.PI / 50 * progress;
    context.clearRect(0, 0, width, height);
    context.lineWidth = lineWidth;
    context.lineCap = 'round';

    context.beginPath();
    context.arc(width / 2, height / 2, radius - lineWidth * 1.5, 0, Math.PI * 2);
    context.strokeStyle = '#ffffff';
    context.stroke();
    context.closePath();

    context.beginPath();
    context.arc(width / 2, height / 2, radius - lineWidth / 2, offset, angle + offset);
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
  };

  const animate = () => {
    if (inProgress || isDrawed) {
      return;
    }

    const start = performance.now();
    inProgress = true;

    const step = () => {
      const diff = performance.now() - start;
      const current = clamp(0, progress, lerp(0, progress, easeInOutSine(diff / duration)));
      draw(current);

      if (diff <= duration) {
        requestAnimationFrame(step);
      } else {
        inProgress = false;
        isDrawed = true;
      }
    };

    requestAnimationFrame(step);
  };

  return {
    canvas,
    draw,
    animate,
    reset
  };
};

// Animation
const circleBars = new WeakMap();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.intersectionRatio === 0) {
    circleBars.get(entry.target)?.reset();
  } else if (entry.intersectionRatio >= 0.2) {
    circleBars.get(entry.target)?.animate();
  }
}), {
  threshold: [0, 0.2, 0.4, 0.6, 0.8, 1]
});

document.querySelectorAll('.progress').forEach(element => {
  const {
    progress,
    color
  } = element.dataset;
  const circleBar = createCircleBar(185, 185, parseFloat(progress || '0'), color || '#000000');

  circleBars.set(circleBar.canvas, circleBar);
  observer.observe(circleBar.canvas);
  element.prepend(circleBar.canvas);
});
