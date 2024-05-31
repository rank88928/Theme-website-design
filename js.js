let nav_menu_but = document.querySelector(".menu-but");
let nav_menu = document.querySelector(".nav");
let menu_mask = document.querySelector(".menu-mask");

if (nav_menu_but) {
    nav_menu_but.addEventListener("click", function () {
        nav_menu.classList.toggle("open");
        menu_mask.classList.toggle("open");
    });
}




// 問答手風琴
let accordion_item = document.querySelectorAll(".accordion-item");
let question = document.querySelectorAll(".question");
let question_i = document.querySelectorAll(".question i");
let answer = document.querySelectorAll(".answer");

if (accordion_item) {
    accordion_item.forEach(function (question, i) {
        question.addEventListener("click", function () {

            let state = answer[i].classList.contains("h-auto");

            for (let i = 0; i < answer.length; i++) {
                answer[i].classList.remove("h-auto");
                question_i[i].classList.remove("down-rotate");
            };
            // 每次只顯示一個 如果要個別打開收合 只需留下面toggle判斷狀態 不需要if

            if (!state) {
                answer[i].classList.toggle("h-auto");
                question_i[i].classList.toggle("down-rotate");
            }
            // 一開始沒有顯示才新增標籤
        });
    });
};

















