import BOOK_LIST from "../data/book-list.json" assert { type: "json" };

window.selectTab = function (value) {
  const tabItems = document.querySelectorAll(".tab-item");
  tabItems.forEach((tab) => tab.classList.remove("active"));
  document.querySelector(`#${value}`).classList.add("active");

  const filterPayload = BOOK_LIST.filter((item) => item.status === value);

  renderBooks(filterPayload);
};

function renderTabs() {
  const TABS = [
    {
      id: 1,
      label: "Best Seller",
      value: "bestseller",
    },
    {
      id: 2,
      label: "Feature",
      value: "feature",
    },
    {
      id: 3,
      label: "Latest",
      value: "latest",
    },
  ];

  const html = TABS.map(
    (tab) =>
      ` <button id="${tab.value}" class="tab-item ${
        tab.id === 1 && "active"
      }" onclick="selectTab('${tab.value}')">
          ${tab.label}
        </button>
      `
  ).join("");

  document.querySelector(".collection-tabs").innerHTML = html;
}

function renderBooks(payload) {
  const html = payload.reduce((result, book) => {
    const rating = Array.from({ length: book.rating.toFixed() }, () => 1);
    const leftRating = Array.from(
      { length: 5 - book.rating.toFixed() },
      () => 1
    );
    const ratingHtml = `
        ${rating
          .map(() => `<i class="fa-solid fa-star" style="color: #e5cd34;"></i>`)
          .join("")}
        ${leftRating.map(() => `<i class="fa-solid fa-star"></i>`).join("")}
    `;

    return (
      result +
      `
      <div class="card-item group">
         <a href="./detail.html?id=${book.id}">
            <div class="card-header">
                <img src="${book.image[0]}" alt="book"/>
                <div class="card-settings">
                    <div class="setting-list">
                        <a href="#" class="setting-item"><i class="fas fa-search"></i></a>
                        <a href="#" class="setting-item"><i class="fa-solid fa-heart"></i></a>
                        <a href="#" class="setting-item"><i class="fa-solid fa-cart-shopping"></i></a>
                    </div>
                </div>
            </div>
            <div class="card-content">
                <h1 class="text-xl font-medium line-clamp-1">${book.name}</h1>
                <p class="text-lg text-red-600 font-medium">$${book.price.toFixed(
                  2
                )}</p>
                <div class="rating-stars">
                    ${ratingHtml}
                </div>
            </div>       
          </a>
       </div>
      `
    );
  }, "");
  document.querySelector("#collections .product-list").innerHTML = html;
}

function init() {
  const filterPayload = BOOK_LIST.filter(
    (item) => item.status === "bestseller"
  );
  renderBooks(filterPayload);
  renderTabs();
}

init();
