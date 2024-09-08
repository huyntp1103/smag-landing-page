$('.large-sponsor .owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  autoplay: true,
  autoplayTimeout: 2 * 1000,
  smartSpeed: 3000,
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
  autoplayTimeout: 2 * 1000,
  smartSpeed: 3000,
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

$(document).ready(function () {
  // Navbar
  let navHeight = $('#navbar').outerHeight(true);
  $('#home').css('padding-top', navHeight);

  $('#navbar .navbar-nav .nav-item .nav-link:first').addClass('active');
  $('#navbar .navbar-nav .nav-item .nav-link').click(function (event) {
    $('#navbar .navbar-nav .nav-item .nav-link').removeClass('active');
    $(this).addClass('active');

    var targetId = $(this).attr('href');
    if (targetId !== '/outstanding-projects') {
      event.preventDefault();
    }
    var targetPosition = $(targetId).offset().top;
    if (targetId !== '#home' || targetId !== '#footer') {
      targetPosition -= navHeight
    }
    $('html, body').animate({ scrollTop: targetPosition }, 1 * 1000);
  });
  // End navbar

  // Our works
  let containerHeight = $('.our-works-item').height();
  let imageHeight = $('.our-works-item img').height();
  let infoHeight = containerHeight - imageHeight;
  $('.our-works-info').height(infoHeight);

  $('.our-works-filter-button:first').addClass('active');
  $('.our-works-filter-button').click(function () {
    $('.our-works-filter-button').removeClass('active');
    $(this).addClass('active');
  });

  $('.filter-button-group').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $('.our-works-item').hide().filter(function () {
      return $(this).data('category').split(' ').includes(filterValue);
    }).fadeIn(0.8 * 1000);
  });
  $('.our-works-filter-button:first').click();
  // End our works

  // Sponsor
  $('.owl-nav').addClass('d-none');
  // End sponsor

  // Testimonial
  $('#testimonial-carousel').carousel({
    interval: 8 * 1000,
    pause: false
  });
  // End testimonial
});

// Observe animation
$(document).ready(function () {
  // Stats number animation
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var target = $(entry.target);
        var maxCount = Number(target.text().substring(0, target.text().length - 1));
        var suffix = target.text().substring(target.text().length - 1);
        var currentCount = 0;
        var incrementTime = 2 * 1000 / maxCount;

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

  $('.stats-number').each(function () {
    observer.observe(this);
  });
  // End stats number animation

  // Slide up animation
  const slideUpObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.content-slide-up').forEach(function (element) {
    slideUpObserver.observe(element);
  });
  // End slide up animation
});

document.getElementById("myForm").onsubmit = function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const content = document.getElementById('content').value.trim();

  if (!name || !content) {
    alert('Vui lòng nhập đầy đủ tên và nội dung cần hỗ trợ!');
    return;
  }

  if (!email && !phone) {
    alert('Vui lòng nhập email hoặc số điện thoại!');
    return;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailPattern.test(email)) {
    alert('Vui lòng nhập email đúng định dạng!');
    return;
  }

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