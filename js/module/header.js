import { login_user, register_user } from "../auth/user.js";
import { verify_id } from "../auth/user.js";

let login_status_tooltip = document.querySelector(".login-status-tooltip");

let uid = verify_id();

if (uid) {
  login_status_tooltip.innerHTML = "進入個人中心";
}

function click_login() {
  let login_email = document.querySelector("#login-email");
  let login_password = document.querySelector("#login-password");

  let user = {
    email: login_email.value,
    password: login_password.value,
  };

  login_user(user);
}

async function click_register() {
  let register_email = document.querySelector("#register-email");
  let register_password = document.querySelector("#register-password");
  let user = {
    email: register_email.value,
    password: register_password.value,
  };

  await register_user(user);
}

let login_btn = document.querySelector(".login-btn");
login_btn.addEventListener("click", click_login);
let register_btn = document.querySelector(".register-btn");
register_btn.addEventListener("click", click_register);

//登入後修改畫面
function login_success() {
  m_login_mask.style.display = "none";
  login_status_tooltip.innerHTML = "進入個人中心";
}

// 登入頁開關
let login_close_btn = document.querySelector(".login-close-btn");
let login_open_btn = document.querySelector(".login-open");
let m_login_mask = document.querySelector(".m_login_mask");

login_close_btn.addEventListener("click", function () {
  m_login_mask.style.display = "none";
});
login_open_btn.addEventListener("click", function () {
  if (verify_id()) {
    window.location.href = "space.html";
  } else {
    m_login_mask.style.display = "flex";
  }
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

// 輸入框有值 提示下浮
let form_input = document.querySelectorAll(".m_login_box input");
let form_label = document.querySelectorAll(".m_login_box label");

form_input.forEach(function (input, i) {
  input.addEventListener("input", function () {
    if (input.value === "") {
      form_label[i].classList.remove("has-content");
    } else {
      form_label[i].classList.add("has-content");
    }
  });
});

//rwd選單開關
let menu_btn = document.querySelector(".menu-btn");
let nav = document.querySelector(".nav");

menu_btn.addEventListener("click", function () {
  nav.classList.toggle("nav-open");
});

export { login_success };
