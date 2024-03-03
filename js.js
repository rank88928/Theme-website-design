let nav_menu_but = document.querySelector(".menu-but");
let nav_menu = document.querySelector(".nav");
let menu_mask = document.querySelector(".menu-mask");

if(nav_menu_but){
    nav_menu_but.addEventListener("click", function(){
        nav_menu.classList.toggle("open");
        menu_mask.classList.toggle("open");
    });
}


let login = document.querySelector(".login-mask");
let loginOpen = document.querySelector(".login-open");
let closelogin = document.querySelector(".close-login");

if(login){
    loginOpen.addEventListener("click", function(){
        login.style.display ="block";
    });
    closelogin.addEventListener("click", function(){
        login.style.display ="none";
    });
}


let qboxes = document.querySelectorAll(".qa-Click-box");
let aboxes = document.querySelectorAll(".qa-a");
let arrows = document.querySelectorAll(".fa-angle-up");

if(qboxes){
    qboxes.forEach(function(qbox, index) {
        qbox.addEventListener('click', function (){
            // 藉由添加類名修改CSS狀態
            aboxes[index].classList.toggle('hidden');
            arrows[index].classList.toggle('rotate-180');
            // 問答框-點擊後下展示框
            // 使用 forEach 遍歷 NodeList
    
        });
    });
}















