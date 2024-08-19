// 回饋卡片
export { feedback_produce }

let data_url = "./data/feedback.json";
let data_feedback = [];

async function feedback_produce() {
    try {
        const response = await fetch(data_url);
        data_feedback = await response.json();

    } catch (error) {
        console.error('Error:', error);
    }

    let html = "";

    data_feedback.forEach(function (data) {
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




