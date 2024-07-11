
// 首頁輪播
// $(document).ready(function () {
//     $('.carousel-index').slick({
//         dots: true,
//         infinite: true,
//         speed: 4000,
//         fade: true,
//         cssEase: 'linear',
//         arrows: false,
//         autoplay: true,
//         pauseOnFocus: false,
//         pauseOnHover: false,
//     });

//     // 立刻啟動切換圖片
//     setTimeout(function () {
//         $('.carousel-index').slick('slickGoTo', 1);
//     }, 0);

//     // 切換時掛載進度條CSS類名 重置動畫效果
//     $('.carousel-index').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//         slick.$slides.eq(nextSlide).find('img').addClass('distant');

//         countdown_animation()
//     });

//     // 結束後移除CSS類名 
//     $('.carousel-index').on('afterChange', function (event, slick, currentSlide) {
//         slick.$slides.eq(currentSlide).find('img').removeClass('distant');
//     });
// });


// 計時條動畫
let countdown = document.querySelector("#countdown");

function countdown_animation() {
    countdown.classList.add("countdown-progress");

    setTimeout(function () {
        countdown.classList.remove("countdown-progress");
    }, 7000);
}



// $('.carousel-box').slick({
//     dots: true,
//     infinite: true,
//     speed: 500,
//     fade: true,
//     cssEase: 'linear',
//     variableWidth: true,
// });






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

















