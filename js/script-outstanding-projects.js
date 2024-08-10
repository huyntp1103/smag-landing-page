$(document).ready(function () {
  // Navbar
  let navHeight = $('#navbar').outerHeight(true);
  $('#outstanding-projects').css('padding-top', navHeight);

  $('#navbar .navbar-nav .nav-item .nav-link:first').addClass('active');
  $('#navbar .navbar-nav .nav-item .nav-link').click(function (event) {
    $('#navbar .navbar-nav .nav-item .nav-link').removeClass('active');
    $(this).addClass('active');

    var targetId = $(this).attr('href');

    if (targetId == '#outstanding-projects' || targetId == '#footer') {
      event.preventDefault();
      var targetPosition = $(targetId).offset().top;
      targetPosition -= navHeight
      $('html, body').animate({ scrollTop: targetPosition }, 1 * 1000);
    }
  });
  // End navbar

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

  $('.outstanding-number').each(function () {
    observer.observe(this);
  });
  // End stats number animation
});

$(document).ready(function () {
  // Slide right animation
  const slideRightObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-right');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.content-slide-right').forEach(function (element) {
    slideRightObserver.observe(element);
  });
  // End slide right animation

  // Slide right animation
  const slideLeftObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-left');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.content-slide-left').forEach(function (element) {
    slideLeftObserver.observe(element);
  });
  // End slide right animation
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