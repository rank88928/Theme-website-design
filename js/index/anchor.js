$(".anchor").click(function () {
  $("html, body").animate({ scrollTop: 0 }, "slow");
});

$(document).ready(function () {
  let $target = $(".anchor");

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $target.fadeIn();
    } else {
      $target.fadeOut();
    }
  });
});
