import BOOK_LIST from "../data/book-list.json" assert { type: "json" };

window.zoom = function (e) {
  var zoomer = e.currentTarget;
  let offsetX = 0;
  let offsetY = 0;
  e.offsetX ? (offsetX = e.offsetX) : (offsetX = e.touches[0].pageX);
  e.offsetY ? (offsetY = e.offsetY) : (offsetX = e.touches[0].pageX);
  let x = (offsetX / zoomer.offsetWidth) * 100;
  let y = (offsetY / zoomer.offsetHeight) * 100;
  zoomer.style.backgroundPosition = x + "% " + y + "%";
};

const findBook = (id) => {
  return BOOK_LIST.find((book) => book.id === Number(id));
};

function renderBook(book) {
  const html = `
   <div class="breadcrumb">
          <span class="breadcrumb-item"><a href="./index.html">Home</a> /</span>
          <span class="breadcrumb-item active"
            ><a href="./category.html">Category /</a></span
          >
           <span class="breadcrumb-item active"
            ><a href="./detail.html?id=${book.id}" class="active">${
    book.name
  }</a></span
          >
    </div>
    <div class="book-cols">
      <div class="book-image">
        <div class="image-wrapper">
          <figure class='zoom' style="background: url(${
            book.image
          })" onmousemove="zoom(event)" ontouchmove="zoom(event)">
              <a data-fancybox href="${book.image[0]}">
                <img src="${book.image[0]}" alt="book image"/>
              </a>
          </figure>
        </div>
        <ul class="related-image">
              ${
                book.image.length > 0 &&
                book.image
                  .map(
                    (img) => `
                        <li class="image-item">
                          <div class="item-wrapper">
                            <img src="${img}" alt="sub-image"/>
                          </div>
                        </li>
                      `
                  )
                  .join("")
              }
        </ul>
      </div>
      <div class="book-details">
        <span class="status-badge">${book.status}</span>
        <h1 class="book-name">${book.name}</h1>
        <h2 class="book-author">Author: ${book.author}</h2>
        <p class="book-price">$${book.price.toFixed(2)}</p>
        <p>Genre: ${book.genre.join(", ")}</p>
        <p>Description: ${book.description}</p>
        <p>Released Date: ${book.released_date}</p>

        <div class="quantity-btns">
          <button><i class="fa-solid fa-plus"></i></button>
          <span>1</span>
          <button><i class="fa-solid fa-minus"></i></button>
        </div>

        <div class="add-to-cart">
              <button class="primary-button size-lg">Add to cart</button>
        </div>


        <div class="sharing-social-media">
          <span>Share:</span>
          <div class="icon-wrapper facebook"><i class="fa-brands fa-facebook-f"></i></div>
          <div class="icon-wrapper twitter"><i class="fa-brands fa-twitter"></i></div>
          <div class="icon-wrapper instagram"><i class="fa-brands fa-instagram"></i></div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("book-infor").innerHTML = html;
}

function renderRelatedProds(payload, genres) {
  const newPayload = [];

  for (let i = 0; i < payload.length; i++) {
    const book = payload[i];
    for (let j = 0; j < book.genre.length; j++) {
      if (book.genre[j] === genres) {
        newPayload.push(book);
        break;
      }
    }
  }

  const html = newPayload.reduce((result, book) => {
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
  document.querySelector("#related-product .product-list").innerHTML = html;
}

window.onload = (event) => {
  let str = window.location.search;
  let id = str.replace("?id=", "");
  const book = findBook(id);
  renderBook(book);
  renderRelatedProds(BOOK_LIST, book.genre[0]);
};
