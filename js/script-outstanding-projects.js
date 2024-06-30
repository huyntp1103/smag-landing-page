$(document).ready(function() {
  // Navbar
  let navHeight = $('#navbar').outerHeight(true);
  $('#outstanding-projects').css('padding-top', navHeight);

  $('#navbar .navbar-nav .nav-item .nav-link:first').addClass('active');
  $('#navbar .navbar-nav .nav-item .nav-link').click(function(event) {
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
    alert('Email không đúng định dạng!');
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