import { slider } from "./utils/slider.js";
const productRow = $.querySelectorAll(".product-row");
const commentsTestimonial = $.querySelector(".customer-testimonial");
const testimonialBtnControl = $.querySelectorAll(".testimonial-control");
const lastProductsBtnControl = $.querySelectorAll(".last-products-control");
const col4Width = $.querySelector(".col-md-4");
const lastPrItem = $.querySelector(".last-pr-item");

const scrollInX = (elementHandler, leftSize) => {
  elementHandler.scrollBy({
    left: leftSize,
    behavior: "smooth",
  });
};

const scrollTestimonial = (event) => {
  let { target: scrollBtn } = event;
  let scrollDirection = scrollBtn.dataset.scroll;
  let colWidth = col4Width.clientWidth;

  if (scrollDirection == "right") {
    scrollInX(commentsTestimonial, +colWidth);
  } else {
    scrollInX(commentsTestimonial, -colWidth);
  }
};

const scrollProductsRow = (event) => {
  let { target: scrollBtn } = event;
  let scrollDirection = scrollBtn.dataset.scroll;
  let colWidth = lastPrItem.clientWidth;
  let targetRow = scrollBtn.dataset.rowTarget;
  let currentRow = $.querySelector(`.${targetRow}`);

  if (scrollDirection == "right") {
    scrollInX(currentRow, +colWidth);
  } else {
    scrollInX(currentRow, -colWidth);
  }
};

commentsTestimonial.addEventListener("mousewheel", (event) => {
  event.preventDefault();
  scrollInX(commentsTestimonial, -event.wheelDelta);
  commentsTestimonial.style.cursor = "";
});

lastProductsBtnControl.forEach((btn) => {
  btn.addEventListener("click", scrollProductsRow, { capture: true });
});
testimonialBtnControl.forEach((btn) => {
  btn.addEventListener("click", scrollTestimonial, { capture: true });
});
productRow.forEach((item) => slider(item, col4Width));
slider(commentsTestimonial, col4Width);
