import { load_gsap } from "../utils/gsap/loadgsap.js";
import "../shopping/cart_box.js";
import "../module/index.js";
(async () => {
  await load_gsap();

  //背景圖與文字切換
  (function () {
    let banner_carousel_config = {
      btn: document.querySelectorAll(".banner-btn"),
      bk_img: document.querySelectorAll(".banner-img"),
      txt: [document.querySelectorAll(".title-first"), document.querySelectorAll(".title-second"), document.querySelectorAll(".vertical-slogan")],
      current_index: 0, //預設第一張
      stabilization: 0, //防抖
    };
    //動畫參數
    let animation_config = {
      txt_fade_out: "inset(0% 0% 100% 0%)",
      txt_fade_in: "inset(0% 0% 0% 0%)",
      txt_duration: 0.2,
    };

    //把文字dom重新分組 每組第i項各為一組
    function txt_map(data) {
      let new_arr = [];

      for (let i = 0; i < data[0].length; i++) {
        //按第一標語數量劃分
        let sub_arr = [];

        for (let k = 0; k < data.length; k++) {
          sub_arr.push(data[k][i]);
        }

        new_arr.push(sub_arr);
      }
      return new_arr;
      //有更好的方式 數組當中的map函數
    }

    //按鈕active css切換
    function btn_active(i) {
      let btn = banner_carousel_config.btn;
      Array.from(btn).forEach(function (item) {
        item.classList.remove("active");
      });
      btn[i].classList.add("active");
    }

    //文字動畫
    function text_transition(settings, index) {
      let t = gsap.timeline();
      txt_dom[index].forEach(function (item) {
        t.to(item, {
          clipPath: settings,
          duration: animation_config.txt_duration,
        });
      });
      return t;
    }

    //背景圖移動
    function bk_ing_transform(click_i) {
      banner_carousel_config.bk_img.forEach(function (item, index) {
        if (index < click_i) {
          item.style.left = "-100%";
        } else {
          item.style.left = "0%";
        }
      });
    }

    //動畫流程
    function animation_process(click_i, current_i) {
      click_i = parseInt(click_i);
      if (click_i === current_i) {
        return;
      }

      banner_carousel_config.stabilization = 1;
      banner_carousel_config.current_index = click_i;
      btn_active(click_i);

      //動畫時間軸
      let t = gsap.timeline({
        onComplete: function () {
          setTimeout(() => {
            banner_carousel_config.stabilization = 0;
          }, 100);
        },
      });

      t.add(text_transition(animation_config.txt_fade_out, current_i));
      t.add(text_transition(animation_config.txt_fade_out, click_i));
      t.add(function () {
        bk_ing_transform(click_i);
      });
      t.add(text_transition(animation_config.txt_fade_in, current_i));
      t.add(text_transition(animation_config.txt_fade_in, click_i));
    }

    //初始化
    //用於動畫序列處理
    let txt_dom = txt_map(banner_carousel_config.txt);
    //綁定按鈕索引
    banner_carousel_config.btn.forEach(function (item, index) {
      item.dataset.index = index;
      banner_carousel_config.bk_img[index].dataset.index = index;
    });

    banner_carousel_config.btn[0].parentElement.addEventListener("click", function (e) {
      if (banner_carousel_config.stabilization === 0 && e.target.matches(".banner-btn")) {
        animation_process(e.target.dataset.index, banner_carousel_config.current_index);
      }
    });
  })();
})();

//  let animation_config = {
//     title_id: [],
//   };

//標題文字描邊
// function title_text_stroke_animation(title) {
//   let path = title.querySelectorAll("path");
//   return gsap.fromTo(
//     path,
//     {
//       strokeDasharray: 250,
//       strokeDashoffset: 250,
//     },
//     {
//       strokeDashoffset: 0,
//       duration: 1,
//       ease: "power1.inOut",
//       stagger: {
//         each: 0.1, // 間隔時間
//         from: "end",
//       },
//       scrollTrigger: {
//         trigger: path[0],
//         start: "top 80%",
//         end: "bottom 50%",
//         toggleActions: "play none reverse none",
//         // markers: true,
//         scrub: 0.1,
//         pinSpacing: true,

//         onLeaveBack: () => {
//           gsap.to(path, {
//             // 滾動回到頂部移除效果
//             strokeWidth: 0.5,
//             fill: "none",
//           });
//           gsap.to(title, {
//             backgroundColor: "rgba(247, 243, 238, 0)",
//             duration: 0.5,
//           });
//         },
//       },
//       onComplete: () => {
//         gsap.to(
//           path, //描邊完成後充滿字體 補上背景色塊
//           {
//             strokeWidth: 0,
//             fill: "#fd8585",
//           }
//         );
//         gsap.to(title, {
//           backgroundColor: "#ffe8cb",
//           duration: 0.5,
//         });
//       },
//     }
//   );
// }

// function title_text_stroke() {
//   let title_all = document.querySelectorAll(".area-title");

//   title_all.forEach(function (item) {
//     let id = title_text_stroke_animation(item);
//     animation_config.title_id.push(id);
//   });
// }
// title_text_stroke();

// let config = {
//   dom: {
//     timeline_item: document.querySelectorAll(".timeline-item"),
//     timeline_arrow: document.querySelectorAll(".arrow"),
//     concept_item: document.querySelectorAll(".concept-container .item"),
//     contact: {
//       bk: document.querySelector(".interactive-container"),
//       people: document.querySelector(".interactive"),
//       form_box: document.querySelector(".form-box"),
//       form_group: document.querySelectorAll(".form-group"),
//     },
//   },
// };

//RWD下開關動畫
// tool.r_toolbox.window_size.check_trigger(576, enable_gsap, disable_gsap)

// function enable_gsap() {
//     console.log('啟用')
//     timeline_item_anim()
// }

// function disable_gsap() {
//     console.log('禁用')
// }

// 時間軸項目
//   function timeline_item_anim() {
//     config.dom.timeline_item.forEach((item) => {
//       gsap.fromTo(
//         item,
//         {
//           opacity: 0,
//           y: 50,
//           scale: 0,
//         },
//         {
//           y: 0,
//           duration: 1,
//           ease: "power2.out", // 緩動效果
//           scrollTrigger: {
//             trigger: item,
//             // markers: true,
//             start: "top 90%",
//             end: "bottom 30%",
//             toggleActions: "play none none reverse",

//             onUpdate: (self) => {
//               let progress = self.progress;
//               let arrow = item.querySelector(".arrow");
//               if (progress <= 0.2) {
//                 gsap.set(item, {
//                   scale: progress / 0.2,
//                   opacity: progress,
//                 });
//                 arrow.style.display = "none";
//               } else if (progress > 0.2 && progress <= 0.9) {
//                 gsap.set(item, {
//                   scale: 1,
//                   opacity: 1,
//                 });
//                 arrow.style.display = "block";
//               } else if (progress > 0.9) {
//                 let adjustedProgress = (progress - 0.9) / 0.1;
//                 gsap.set(item, {
//                   scale: 1 - adjustedProgress * 0.2,
//                   opacity: 1 - adjustedProgress,
//                 });
//                 arrow.style.display = "none";
//               }
//             },
//           },
//         }
//       );
//     });
//   }

//   //時間軸線條
//   gsap.fromTo(
//     ".center-line",
//     {
//       height: "0%",
//     },
//     {
//       height: "1100px",
//       ease: "power1.out",
//       scrollTrigger: {
//         trigger: ".timeline-container",
//         scrub: true,
//         start: "top 40%",
//         end: "bottom 40%",
//         toggleActions: "play none none reverse",
//       },
//     }
//   );

//   //理念圖塊
//   gsap.fromTo(
//     config.dom.concept_item,
//     {
//       opacity: 0,
//       x: -200,
//       scale: 0,
//     },
//     {
//       stagger: {
//         each: 0.5, // 間隔時間
//         from: "start",
//       },
//       opacity: 1,
//       x: 0,
//       scale: 1,
//       ease: "none",
//       scrollTrigger: {
//         trigger: config.dom.concept_item,
//         // markers: true,
//         start: "top 90%",
//         end: "bottom 30%",
//         toggleActions: "play none none reverse",
//       },
//     }
//   );
// })();

let sections = document.querySelectorAll(".scroll-block");
let currentIndex = 0;
let isScrolling = false; // 防止滾動過快

function left_changeSection() {
  if (isScrolling) return;
  isScrolling = true;

  if (currentIndex >= sections.length - 1) {
    isScrolling = false;
    return;
  }

  gsap.to(sections[currentIndex], { width: 0 });
  currentIndex += 1;

  setTimeout(() => {
    isScrolling = false;
  }, 500);
}

function right_changeSection() {
  if (isScrolling) return;
  isScrolling = true;

  if (currentIndex <= 0) {
    isScrolling = false;
    return;
  }

  currentIndex -= 1;
  gsap.to(sections[currentIndex], { width: "100%" });

  setTimeout(() => {
    isScrolling = false;
  }, 500);
}

window.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    left_changeSection();
  } else {
    right_changeSection();
  }
});

// 監聽手勢滑動 (手機)
let startY = 0;
window.addEventListener("touchstart", (event) => {
  startY = event.touches[0].clientY;
});
window.addEventListener("touchmove", (event) => {
  let deltaY = startY - event.touches[0].clientY;
  if (Math.abs(deltaY) > 50) {
    // 避免誤觸
    changeSection(deltaY);
    startY = event.touches[0].clientY;
  }
});
