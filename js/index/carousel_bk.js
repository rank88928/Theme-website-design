import "../slick/slick.min.js";

// 首頁背景輪播
$(document).ready(function () {
  $(".carousel-index").slick({
    dots: false,
    infinite: true,
    speed: 4000,
    fade: true,
    cssEase: "linear",
    arrows: false,
    autoplay: true,
    pauseOnFocus: false,
    pauseOnHover: false,
  });

  // 立刻切換圖片
  setTimeout(function () {
    $(".carousel-index").slick("slickGoTo", 1);
  }, 0);

  // 切換時 重置動畫
  $(".carousel-index").on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    slick.$slides.eq(nextSlide).find("img").addClass("distant");

    countdown_animation();
  });

  $(".carousel-index").on("afterChange", function (event, slick, currentSlide) {
    slick.$slides.eq(currentSlide).find("img").removeClass("distant");
  });
});

// 計時條
let countdown = document.querySelector("#countdown");

function countdown_animation() {
  countdown.classList.add("countdown-progress");
  setTimeout(function () {
    countdown.classList.remove("countdown-progress");
  }, 7000);
}
