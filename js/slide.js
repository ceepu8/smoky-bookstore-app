//  RMIT University Vietnam
//   Course: COSC2430 Web Programming
//   Semester: 2023A
//   Assessment: Assignment 1
//   Author: Cao Ngoc Phuong Uyen
//   ID: s3919659
//   Acknowledgement: in the document

(function () {
  var carousels = document.querySelectorAll(".js-product-carousel");

  [].forEach.call(carousels, function (carousel) {
    carouselize(carousel);
  });
})();

function carouselize(carousel) {
  var productList = carousel.querySelector(".js-product-list");
  var productListWidth = 0;
  var productListSteps = 0;
  var products = carousel.querySelectorAll(".slider-product");
  var productAmount = 0;
  var productAmountVisible = 5;
  var carouselPrev = carousel.querySelector(".js-carousel-prev");
  var carouselNext = carousel.querySelector(".js-carousel-next");

  //Count all the products
  [].forEach.call(products, function (product) {
    productAmount++;
    productListWidth += 256;
    productList.style.maxWidth = productListWidth + "px";
  });

  carouselNext.onclick = function () {
    if (productListSteps < productAmount - productAmountVisible) {
      productListSteps++;
      moveProductList();
    }
  };
  carouselPrev.onclick = function () {
    if (productListSteps > 0) {
      productListSteps--;
      moveProductList();
    }
  };

  // This is a bit hacky, let me know if you find a better way to do this!
  // Move the carousels product-list
  function moveProductList() {
    productList.style.transform =
      "translateX(-" + 256 * productListSteps + "px)";
  }
}
