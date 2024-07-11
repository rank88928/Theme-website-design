// 回饋卡片生成

let data_url = "./data/feedback.json";
let data_feedback = [];
let feedback_list = document.querySelector(".feedback-list");// 放置位子

async function feedback_produce() {
    try {
        const response = await fetch(data_url);
        data_feedback = await response.json();

    } catch (error) {
        console.error('Error:', error);
    }


    let temp_html = "";

    data_feedback.forEach(function (data) {
        temp_html += feedback_html(data);
    });

    feedback_list.insertAdjacentHTML('beforeend', temp_html);
}
feedback_produce();

function feedback_html(data) {
    let item =
        ` <div class="m_feedback_card">
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
};

// 星星數量
function stars_number(star) {
    temp_html = "";
    for (let i = 0; star > i; i++) {
        temp_html += '<i class="fa-solid fa-star"></i>';
    }
    return temp_html;
}

// 輪播
(async function () {
    await feedback_produce();
    $(document).ready(function () {
        $('.feedback-list').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 3,
            arrows: false,
            autoplay: true
        });
    });
})();


