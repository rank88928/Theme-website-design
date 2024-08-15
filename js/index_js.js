// 首頁背景輪播
$(document).ready(function () {
    $('.carousel-index').slick({
        dots: false,
        infinite: true,
        speed: 4000,
        fade: true,
        cssEase: 'linear',
        arrows: false,
        autoplay: true,
        pauseOnFocus: false,
        pauseOnHover: false,
    });

    // 立刻啟動切換圖片
    setTimeout(function () {
        $('.carousel-index').slick('slickGoTo', 1);
    }, 0);

    // 切換時掛載進度條CSS類名 重置動畫效果
    $('.carousel-index').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        slick.$slides.eq(nextSlide).find('img').addClass('distant');

        countdown_animation()
    });

    // 結束後移除CSS類名 
    $('.carousel-index').on('afterChange', function (event, slick, currentSlide) {
        slick.$slides.eq(currentSlide).find('img').removeClass('distant');
    });
});

// 計時條動畫
let countdown = document.querySelector("#countdown");

function countdown_animation() {
    countdown.classList.add("countdown-progress");

    setTimeout(function () {
        countdown.classList.remove("countdown-progress");
    }, 7000);
}



// 簡介RWD輪播
window.addEventListener("load", slick_viewport_response);
window.addEventListener("resize", slick_viewport_response);

function slick_viewport_response() {
    let width = window.innerWidth;

    if (width <= 768) {
        // 如果 Slick 尚未初始化，則初始化
        if (!$('.carousel-box').hasClass('slick-initialized')) {
            $('.carousel-box').slick({
                dots: true,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                arrows: false,
                adaptiveHeight: false,
            });
        }
    } else {
        // 如果 Slick 已經初始化，並且寬度超過 768px，則銷毀 Slick
        if ($('.carousel-box').hasClass('slick-initialized')) {
            $('.carousel-box').slick('unslick');
        }
    }
}



// 懸停卡片 放大產品圖片成為容器背景圖







// 問答手風琴
let accordion_item = document.querySelectorAll(".accordion-item");
let question = document.querySelectorAll(".question");
let question_i = document.querySelectorAll(".question i");
let answer = document.querySelectorAll(".answer");

if (accordion_item) {
    accordion_item.forEach(function (question, i) {
        question.addEventListener("click", function () {

            let state = answer[i].classList.contains("an-auto");

            for (let i = 0; i < answer.length; i++) {
                answer[i].classList.remove("an-auto");
                question_i[i].classList.remove("down-rotate");
            };
            // 每次只顯示一個 如果要個別打開收合 只需留下面toggle判斷狀態 不需要if

            if (!state) {
                answer[i].classList.toggle("an-auto");
                question_i[i].classList.toggle("down-rotate");
            }
            // 一開始沒有顯示才新增標籤
        });
    });
};


