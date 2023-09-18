import { slider } from "./utils/slider.js";
const productRow = $.querySelectorAll(".product-row");

const mainPrImage = $.querySelector(".main-product-img");
const imageContainer = $.querySelector(".product-image");
const imageGalleryItem = $.querySelectorAll(".gallery-img");
const col12width = $.querySelector(".col-12");
const prDetailSlider = $.querySelectorAll(".tab-panel-controller");
const prDetailSliderContainer = $.querySelector(".main-pr-details");
const lastProductsBtnControl = $.querySelectorAll(".last-products-control");
const lastPrItem = $.querySelector(".last-pr-item");

const changeImage = (event) => {
  let { target } = event;
  let currentImage = target.getAttribute("src");
  imageContainer.setAttribute("src", currentImage);
  mainPrImage.style.backgroundImage = `url("${currentImage}")`;
  imageGalleryItem.forEach((item) => item.classList.add("opacity-50"));

  target.classList.remove("opacity-50");
  mainPrImage.style.animation = "changeImageAnimation 0.5s ease 1";
  mainPrImage.addEventListener("animationend", () => {
    mainPrImage.style.animation = "";
  });
};

const imageZoom = (event) => {
  let zoom = event.currentTarget;

  let offsetX = 0;
  let offsetY = 0;
  event.offsetX
    ? (offsetX = event.offsetX)
    : (offsetX = event.touches[0].pageX);
  event.offsetY
    ? (offsetY = event.offsetY)
    : (offsetX = event.touches[0].pageX);
  let x = (offsetX / zoom.offsetWidth) * 100;
  let y = (offsetY / zoom.offsetHeight) * 100;
  zoom.style.backgroundPosition = x + "% " + y + "%";
  zoom.style.backgroundSize = `350%`;
};

const scrollInX = (elementHandler, leftSize) => {
  elementHandler.scrollBy({
    left: leftSize,
    behavior: "smooth",
  });
};

const switchPrTab = (event) => {
  let scrollWidth = col12width.clientWidth;
  let currentController = event.currentTarget;
  prDetailSlider.forEach((item) => {
    item.classList =
      "col-4 py-2 text-secondary border-bottom text-center border-3 tab-panel-controller rounded-3 pointer-cursor rounded-bottom-0";
  });
  currentController.classList =
    "col-4 py-2 border-bottom text-center border-3 border-black tab-panel-controller rounded-3 pointer-cursor rounded-bottom-0 pane-active";
  let aimTab = event.currentTarget.dataset.tabController;
  let scrollSize = 0;
  if (aimTab == "pr_detail") {
    scrollSize = 0;
  } else if (aimTab == "pr_rating") {
    scrollSize = -scrollWidth;
  } else {
    scrollSize = -scrollWidth * 2;
  }
  let firstItem = prDetailSliderContainer.children[0];
  firstItem.style.marginLeft = scrollSize + "px";
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

const loadedPage = () => {
  let firstItem = prDetailSliderContainer.children[0];
  let scrollWidth = col12width.clientWidth;
  firstItem.style.marginLeft = -scrollWidth + "px";
};

mainPrImage.addEventListener("mousemove", imageZoom);
imageGalleryItem.forEach((item) => {
  item.addEventListener("click", changeImage);
});
prDetailSlider.forEach((item) => {
  item.addEventListener("click", switchPrTab);
});

lastProductsBtnControl.forEach((btn) => {
  btn.addEventListener("click", scrollProductsRow, { capture: true });
});
window.addEventListener("load", loadedPage);
productRow.forEach((item) => slider(item, -col12width));
