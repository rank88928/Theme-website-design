export { prompt_message, message };

let body = document.querySelector("body");
let div = document.createElement("div");
div.classList.add("m-status-box");
body.appendChild(div);

let box = document.querySelector(".m-status-box");

function create(point, text) {
  let item = document.createElement("div");
  item.classList.add("m-status");
  item.innerHTML = `<div>${point}</div>
                    <p>${text}</p>`;
  box.appendChild(item);

  setTimeout(() => {
    if (item) {
      item.remove();
    }
  }, 3000);
}

let message = {
  success: function (text) {
    let point = `<i class="fa-solid fa-circle-check"></i>操作成功`;
    create(point, text);
  },
};

function prompt_message(state) {
  let point;
  /*    
    狀態碼
    201 = 輸入數量異常
    202 = 庫存數不足
    301 = 操作成功
    302 = 移除成功
    */

  if (state.respond === 201) {
    point = '<i class="fa-solid fa-circle-xmark"></i>輸入數量異常';
  } else if (state.respond === 202) {
    point = '<i class="fa-solid fa-circle-xmark"></i>庫存數不足';
  } else if (state.respond === 301) {
    point = '<i class="fa-solid fa-circle-check"></i>新增成功';
  } else if (state.respond === 302) {
    point = '<i class="fa-solid fa-circle-check"></i>移除成功';
  } else {
    point = '<i class="fa-solid fa-circle-xmark"></i>異常錯誤';
  }

  let item = `<div class="status">
            <div>${point}</div>
            <p>${state.txt}</p>
        </div>`;

  box.insertAdjacentHTML("beforeend", item);

  setTimeout(() => {
    let item = document.querySelector(".status");
    if (item) {
      item.remove();
    }
  }, 3000);
}
