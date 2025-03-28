import "/slick/slick.min.js";

window.addEventListener("load", slick_viewport_response);
window.addEventListener("resize", slick_viewport_response);

function slick_viewport_response() {
  let width = window.innerWidth;

  if (width <= 768) {
    if (!$(".carousel-box").hasClass("slick-initialized")) {
      $(".carousel-box").slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: "linear",
        arrows: false,
        adaptiveHeight: false,
      });
    }
  } else {
    if ($(".carousel-box").hasClass("slick-initialized")) {
      $(".carousel-box").slick("unslick");
    }
  }
}
