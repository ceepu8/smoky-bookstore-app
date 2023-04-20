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
    <div class="grid grid-cols-2 gap-x-12">
      <div>
        <div class="border border-solid border-gray-200 py-12 mb-4">
          <figure class='zoom mx-auto max-w-[300px]' style="background: url(${
            book.image
          })" onmousemove="zoom(event)" ontouchmove="zoom(event)">
              <a data-fancybox href="${book.image[0]}">
                <img src="${book.image[0]}" alt="book image"/>
              </a>
          </figure>
        </div>
        <div class="grid grid-cols-4 gap-x-4 slide-books">
              ${
                book.image.length > 0 &&
                book.image
                  .map(
                    (img) => `
                        <li class="splide__slide">
                          <div class="p-6 border border-solid border-gray-200">
                            <img src="${img}" alt="sub-image" class="max-h-[100px] m-auto"/>
                          </div>
                        </li>
                      `
                  )
                  .join("")
              }
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <span class="rounded-full py-2 px-4 bg-[#f44244] text-white max-w-fit text-xs leading-1">${
          book.status
        }</span>
        <h1 class="text-3xl font-medium">${book.name}</h1>
        <h2 class="text-2xl">Author: ${book.author}</h2>
        <p class="text-2xl text-red-500">$${book.price.toFixed(2)}</p>
        <p>Genre: ${book.genre.join(", ")}</p>
        <p>Description: ${book.description}</p>
        <p>Released Date: ${book.released_date}</p>

        <div class="flex gap-x-4 items-center border border-solid border-gray-200 max-w-fit px-4 py-2 rounded-full text-gray-600">
          <button><i class="fa-solid fa-plus"></i></button>
          <span>1</span>
          <button><i class="fa-solid fa-minus"></i></button>
        </div>

        <div>
          <button class="uppercase px-6 py-3 bg-[#f44244] text-white font-medium ">Add to cart</button>
        </div> 


        <div class="flex items-center gap-x-4">
          <span>Share:</span>
          <div class="w-8 h-8 flex items-center rounded text-white justify-center bg-blue-600"><i class="fa-brands text-lg fa-facebook-f"></i></div>
          <div class="w-8 h-8 flex items-center rounded text-white justify-center bg-blue-400"><i class="fa-brands text-lg fa-twitter"></i></div>
          <div class="w-8 h-8 flex items-center rounded text-white justify-center bg-pink-500"><i class="fa-brands text-lg fa-instagram"></i></div>
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

    // <section class="slider-wrapper">
    //   <button class="slide-arrow" id="slide-arrow-prev">
    //     &#8249;
    //   </button>

    //   <button class="slide-arrow" id="slide-arrow-next">
    //     &#8250;
    //   </button>

    //   <ul class="slides-container" id="slides-container">
    //     <li class="slide"></li>
    //     <li class="slide"></li>
    //     <li class="slide"></li>
    //     <li class="slide"></li>
    //   </ul>
    // </section>;

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
