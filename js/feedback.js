// 回饋卡片
import * as get_data from './get_data.js';
export { feedback_produce }

async function feedback_produce() {
    let feedback_url = "./data/feedback.json";
    let data = await get_data.fetch_data(feedback_url);
    let html = "";

    data.forEach(function (data) {
        html += feedback_html(data);
    });

    return html
}
//人物照片是外部傳來的
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
    let html = "";
    for (let i = 0; star > i; i++) {
        html += '<i class="fa-solid fa-star"></i>';
    }
    return html;
}




