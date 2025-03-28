import * as get_data from "../get_data.js";

let feedback_list = document.querySelector(".feedback-list");

function stars_number(star) {
  let html = "";
  for (let i = 0; star > i; i++) {
    html += '<i class="fa-solid fa-star"></i>';
  }
  return html;
}

// 輪播
(async function () {
  let feedback_list_buffer_html = await feedback_produce();
  feedback_list.insertAdjacentHTML("beforeend", feedback_list_buffer_html);

  $(document).ready(function () {
    $(".feedback-list").slick({
      centerMode: true,
      centerPadding: "60px",
      slidesToShow: 3,
      arrows: false,
      autoplay: true,
    });
  });
})();

// 回饋卡片
async function feedback_produce() {
  let feedback_url = "./data/feedback.json";
  let data = await get_data.fetch_data(feedback_url);
  let html = "";
  data.forEach(function (data) {
    html += feedback_html(data);
  });

  return html;
}
//人物照片是外部傳來
function feedback_html(data) {
  let item = ` <div class="m_feedback_card">
            <div class="details">
                <div class="user-img">
                    <img src="https://picsum.photos/seed/${data.img_url}/400/400" alt="">
                </div>
                <div class="info">
                    <p class="user-name">${data.name}</p>
                    <p class="user-feedback">${data.evaluate}</p>
                </div>
            </div>
            <div class="star">
                ${stars_number(data.star)}
            </div>
        </div>`;

  return item;
}
