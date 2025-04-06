let body = document.querySelector("body");
let preload_container = document.querySelector(".preload-container");
body.style.overflow = "hidden";

let preload_dom = `<div class="preload">
                        <div class="loader"></div>
                    </div>`;
preload_container.insertAdjacentHTML("afterbegin", preload_dom);

export function load_finish() {
  setTimeout(() => {
    preload_container.style.display = "none";
    body.style.overflow = "auto";
  }, 500);
}
