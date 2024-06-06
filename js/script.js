$(document).ready(function () {
  var navHeight = $('#navbar').outerHeight(true);
  $('#image-slider-home').css('padding-top', navHeight);
});

$(document).ready(function() {
  $('#image-slider-home').carousel({
    interval: 8 * 1000,
    pause: false
  });
});

$(document).ready(function() {
  $('#image-slider-about').carousel({
    interval: 5 * 1000,
    pause: false
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var target = entry.target;
        var maxCount = Number(target.textContent.substring(0, target.textContent.length - 1));
        var suffix = target.textContent.substring(target.textContent.length - 1);
        var currentCount = 0;
        var incrementTime = 3 * 1000 / maxCount;

        function updateCount() {
          target.textContent = currentCount + suffix;
          if (currentCount < maxCount) {
            currentCount++;
            setTimeout(updateCount, incrementTime);
          }
        }

        updateCount();
        observer.unobserve(target);
      }
    });
  });

  document.querySelectorAll('.stats-number').forEach(function (element) {
    observer.observe(element);
  });
});

$('.large-sponsor .owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 2 * 1000,
  responsive: {
    0: {
      items: 1
    },
    576: {
      items: 2
    },
    768: {
      items: 3
    },
    992: {
      items: 4
    },
    1200: {
      items: 6
    }
  }
})

$('.small-sponsor .owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 2 * 1000,
  responsive: {
    0: {
      items: 3
    },
    576: {
      items: 4
    },
    768: {
      items: 6
    },
    992: {
      items: 8
    },
    1200: {
      items: 12
    }
  }
})

$(document).ready(function() {
  $('.filter-button-group').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $('.our-works-item').hide().filter(function() {
      if (filterValue === '*')
        return true;
      return $(this).data('category').split(' ').includes(filterValue);
    }).show();
  });
});

$(document).ready(function() {
  var containerHeight = $('.our-works-item').height();
  var imageHeight = $('.our-works-item img').height();
  var infoHeight = containerHeight - imageHeight;
  $('.our-works-info').height(infoHeight);
});

$(document).ready(function() {
  $('.our-works-filter-button:first').addClass('active');
  $('#navbar .navbar-nav .nav-item .nav-link:first').addClass('active');

  $('.our-works-filter-button').click(function() {
    $('.our-works-filter-button').removeClass('active');
    $(this).addClass('active');
  });

  $('#navbar .navbar-nav .nav-item .nav-link').click(function(event) {
    $('#navbar .navbar-nav .nav-item .nav-link').removeClass('active');
    $(this).addClass('active');

    event.preventDefault();
    var targetId = $(this).attr('href');
    var targetPosition = $(targetId).offset().top;
    if (targetId !== '#image-slider-home' && targetId !== '#footer') {
      targetPosition -= $('#navbar').outerHeight(true);
    }
    $('html, body').animate({ scrollTop: targetPosition }, 1 * 1000);
  });
});

// TODOS:
// 1. Add effect for filter our work
// 2. Add effect for hero section