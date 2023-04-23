import BOOK_LIST from "../data/book-list.json" assert { type: "json" };

function formatGenre(str) {
  return str
    .trim(" ")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/ /g, "-");
}

function renderBookByCategory(categoryName) {
  const books = BOOK_LIST.filter((book) => {
    return formatGenre(book.genre[0]) === categoryName;
  });

  const html = books.reduce((result, book) => {
    const rating = Array.from({ length: book.rating.toFixed() }, () => 1);
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
    return (
      result +
      `
             <div class="card-item">
                <a href="./detail.html?id=${book.id}"></a>
                <div class="card-header">
                  <a href="./detail.html?id=${book.id}">
                    <img
                      src="${book.image}"
                      alt="book"
                    />
                  </a>
                  <div class="card-settings">
                    <div class="setting-list">
                      <a href="./detail.html?id=${book.id}"> </a
                      ><a href="#" class="setting-item"
                        ><i class="fas fa-search"></i
                      ></a>
                      <a href="#" class="setting-item"
                        ><i class="fa-solid fa-heart"></i
                      ></a>
                      <a href="#" class="setting-item"
                        ><i class="fa-solid fa-cart-shopping"></i
                      ></a>
                    </div>
                  </div>
                </div>
                <div class="card-content">
                  <h1 class="book-name line-clamp-1">
                    ${book.name}
                  </h1>
                  <p class="book-price">$${book.price.toFixed(2)}</p>
                  <div class="rating-stars">${ratingHtml}</div>
                </div>
              </div>
              `
    );
  }, "");

  console.log(categoryName.replace(/ /g, " "));
  document.querySelector(".category-title.title").innerHTML =
    categoryName.replace(/-/g, " ");
  document.querySelector(".category-title.title").style.textTransform =
    "capitalize";
  document.querySelector("#products .products-col .product-list").innerHTML =
    html;
}

window.onload = () => {
  renderBookByCategory("economics");
};

window.dropMenu = function (menuName) {
  const toggleButton = document.querySelector(`.sub-category.${menuName}`);
  toggleButton.classList.toggle("active");
  const chevronArrow = document.querySelector(`.${menuName} .fa-chevron-down`);
  chevronArrow.classList.toggle("active");
};

window.selectCategory = function (categoryName) {
  const subItems = document.querySelectorAll(".sub-item");
  const activeSubItem = document.querySelector(`.sub-item.${categoryName}`);
  for (let item of subItems) {
    item.classList.remove("active");
  }
  activeSubItem.classList.add("active");
  renderBookByCategory(categoryName);
};
