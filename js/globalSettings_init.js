import { toolbox } from "./utils.js";
// import "./firebase_init.js";

let slickLoaded = false;

toolbox.load_script.script_init("https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", () => {
  $("header").load("header.html");
  $("footer").load("footer.html");

  check_load_slick();
});
toolbox.load_script.script_init("https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js", () => {
  new WOW().init();
});

//按需加載slick
function check_load_slick() {
  let e = document.querySelector("body .slick");

  if (e && !slickLoaded) {
    toolbox.load_script.script_init(
      "/slick/slick.min.js",
      () => {
        slickLoaded = true; // 標記為已加載
        console.log("Slick 載入成功！");
      },
      () => {
        console.error("Slick 載入失敗！");
      }
    );
  }
}
