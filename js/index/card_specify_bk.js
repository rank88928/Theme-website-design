let product_content = document.querySelector(".product-content");

product_content.addEventListener("mouseover", function (e) {
  let element = e.target.closest("li"); // 指向最近li

  if (element) {
    let img = element.querySelector("img");
    product_content.style.backgroundImage = `url(${img.src})`;
  } else {
    product_content.style.backgroundImage = `url(/img/bk2.JPG)`; // 預設背景
  }
});
