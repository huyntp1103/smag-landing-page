$('.large-sponsor .owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 3 * 1000,
  responsive: {
    0: {
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
  autoplayTimeout: 3 * 1000,
  responsive: {
    0: {
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
  // Navbar
  let navHeight = $('#navbar').outerHeight(true);
  $('#image-slider-home').css('padding-top', navHeight);

  $('#navbar .navbar-nav .nav-item .nav-link:first').addClass('active');
  $('#navbar .navbar-nav .nav-item .nav-link').click(function(event) {
    $('#navbar .navbar-nav .nav-item .nav-link').removeClass('active');
    $(this).addClass('active');

    event.preventDefault();
    var targetId = $(this).attr('href');
    var targetPosition = $(targetId).offset().top;
    if (targetId !== '#image-slider-home' || targetId !== '#footer') {
      targetPosition -= navHeight
    }
    $('html, body').animate({ scrollTop: targetPosition }, 1 * 1000);
  });
  // End navbar

  $('#image-slider-home').carousel({
    interval: 8 * 1000,
    pause: false
  });

  $('#image-slider-about').carousel({
    interval: 5 * 1000,
    pause: false
  });

  // Our works
  let containerHeight = $('.our-works-item').height();
  let imageHeight = $('.our-works-item img').height();
  let infoHeight = containerHeight - imageHeight;
  $('.our-works-info').height(infoHeight);

  $('.our-works-filter-button:first').addClass('active');
  $('.our-works-filter-button').click(function() {
    $('.our-works-filter-button').removeClass('active');
    $(this).addClass('active');
  });

  $('.filter-button-group').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $('.our-works-item').hide().filter(function() {
      if (filterValue === '*')
        return true;
      return $(this).data('category').split(' ').includes(filterValue);
    }).fadeIn(0.8 * 1000);
  });
  // End our works

  // Stats number animation
  let observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var target = $(entry.target);
        var maxCount = Number(target.text().substring(0, target.text().length - 1));
        var suffix = target.text().substring(target.text().length - 1);
        var currentCount = 0;
        var incrementTime = 3 * 1000 / maxCount;

        function updateCount() {
          target.text(currentCount + suffix);
          if (currentCount < maxCount) {
            currentCount++;
            setTimeout(updateCount, incrementTime);
          }
        }

        updateCount();
        observer.unobserve(entry.target);
      }
    });
  });

  $('.stats-number').each(function() {
    observer.observe(this);
  });
  // End stats number animation

  // Sponsor
  $('.owl-nav').addClass('d-none');
  // End sponsor
});


document.getElementById("myForm").onsubmit = function (e) {
  e.preventDefault();

  var url =
    "https://docs.google.com/forms/d/e/1FAIpQLScaEsOkztJb6XcwRxlu442op3KR6HwHrwHVU1jy88WPDOr0vQ/formResponse";
  var formData = new FormData(document.getElementById("myForm"));

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  })
    .then((response) => {
      document.getElementById("myForm").reset();
      $('#myModal').modal('show');
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};