import './shopping_box.js'

// 登入開關
let login_close_btn = document.querySelector(".login-close-btn");
let login_open_btn = document.querySelector(".login-open");
let m_login_mask = document.querySelector(".m_login_mask");

login_close_btn.addEventListener("click", function () {
    m_login_mask.style.display = "none";
});
login_open_btn.addEventListener("click", function () {
    m_login_mask.style.display = "block";
});

// 切換註冊登入
let form_tab_btn = document.querySelectorAll(".form-tab");
let form_card = document.querySelectorAll(".form-login-card");

form_tab_btn.forEach(function (btn, i) {
    btn.addEventListener("click", function () {

        form_tab_btn.forEach(function (btn) {
            btn.classList.remove("tab-current");
        });
        form_card.forEach(function (card) {
            card.classList.remove("card-show");
        });

        form_tab_btn[i].classList.add("tab-current");
        form_card[i].classList.add("card-show");
    });
});


// 輸入框輸入時效果
// form_input = document.querySelectorAll(".m_login_box input");
// form_label = document.querySelectorAll(".m_login_box label");

// form_input.forEach(function (input, i) {
//     input.addEventListener("input", function () {

//         if (input.value === "") {
//             form_label[i].classList.remove("has-content");
//         } else {
//             form_label[i].classList.add("has-content");
//         };
//     })
// });
// 改成監聽

//rwd選單開關
let menu_btn = document.querySelector(".menu-btn");
let nav = document.querySelector(".nav");

menu_btn.addEventListener("click", function () {
    nav.classList.toggle("nav-open");
});