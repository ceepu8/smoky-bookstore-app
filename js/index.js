//  RMIT University Vietnam
//   Course: COSC2430 Web Programming
//   Semester: 2023A
//   Assessment: Assignment 1
//   Author: Cao Ngoc Phuong Uyen
//   ID: s3919659
//   Acknowledgement: in the document

import BOOK_LIST from "../data/book-list.json" assert { type: "json" };
import BUSINESS_BOOKS from "../data/business-books.json" assert { type: "json" };
import DEVELOPMENT_BOOKS from "../data/personal-development.json" assert { type: "json" };
import FICTION_BOOKS from "../data/fiction-books.json" assert { type: "json" };

const BOOK_STORAGE = {
  collections: BOOK_LIST,
  "business-management": BUSINESS_BOOKS,
  "personal-development": DEVELOPMENT_BOOKS,
  fiction: FICTION_BOOKS,
};

window.selectTab = function (sectionElement, value) {
  const tabItems = document.querySelectorAll(`#${sectionElement} .tab-item`);
  tabItems.forEach((tab) => tab.classList.remove("active"));
  document.querySelector(`#${value}`).classList.add("active");
  if (sectionElement === "collections") {
    const filterPayload = BOOK_STORAGE[sectionElement].filter(
      (item) => item.status === value
    );
    renderCollections(filterPayload);
  } else {
    renderEachCategory(BOOK_STORAGE[sectionElement], value);
  }
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
      }" onclick="selectTab('collections','${tab.value}')">
          ${tab.label}
        </button>
      `
  ).join("");

  document.querySelector("#collections .tab-list").innerHTML = html;
}

function renderCollections(payload) {
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
                <h1 class="book-name line-clamp-1">${book.name}</h1>
                <p class="book-price font-medium">$${book.price.toFixed(2)}</p>
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

function renderEachCategory(category, subCategorySelected) {
  function renderSubCategoryTab(subCategory) {
    return Object.values(subCategory)
      .map((item) => {
        const isActive = item.value === subCategorySelected && "active";
        return `
                <button id="${item.value}" class="tab-item ${isActive}"
        " onclick="selectTab('${category.value}', '${item.value}')">
                  ${item.name}
                </button>
              `;
      })
      .join("");
  }

  let html = `
              <h2 class="category-title">${category.name}</h2>
              <div class="tab-list">
                ${renderSubCategoryTab(category.subCategory)}
              </div>
              <div class="product-list">
                ${category.subCategory[subCategorySelected].books
                  .map((book) => {
                    const rating = Array.from(
                      { length: book.rating.toFixed() },
                      () => 1
                    );
                    const leftRating = Array.from(
                      { length: 5 - book.rating.toFixed() },
                      () => 1
                    );
                    const ratingHtml = `
                          ${rating
                            .map(
                              () =>
                                `<i class="fa-solid fa-star" style="color: #e5cd34;"></i>`
                            )
                            .join("")}
                          ${leftRating
                            .map(() => `<i class="fa-solid fa-star"></i>`)
                            .join("")}
                    `;
                    return `
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
                              <h1 class="book-name line-clamp-1">${
                                book.name
                              }</h1>
                              <p class="book-price">$${book.price.toFixed(
                                2
                              )}</p>
                              <div class="rating-stars">
                              ${ratingHtml}
                              </div>
                          </div>       
                        </a>
                    </div>
                  `;
                  })
                  .join("")}
                </div>
          `;

  document.querySelector(`#${category.value}`).innerHTML = html;
}

function renderCategoryRows(payload) {
  const html = payload.reduce((result, category) => {
    return result + `<div id="${category.value}" class="category-item"></div>`;
  }, "");
  document.querySelector("#category .category-rows").innerHTML = html;

  payload.forEach((category) =>
    renderEachCategory(category, Object.values(category.subCategory)[0].value)
  );
}

function init() {
  const filterPayload = BOOK_LIST.filter(
    (item) => item.status === "bestseller"
  );
  renderCollections(filterPayload);
  renderTabs();
  renderCategoryRows([BUSINESS_BOOKS, DEVELOPMENT_BOOKS, FICTION_BOOKS]);
}

init();
