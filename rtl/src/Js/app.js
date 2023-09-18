const $ = document;
const signUpNoticeDismissButton = $.querySelector(".signup-dismiss");
const signUpNotice = $.querySelector(".header-notice");
const mobileMenu = $.querySelector(".mobile-menu");
const openMenuBtn = $.querySelector(".open-menu");
const closeMenuBtn = $.querySelector(".close-menu");
const productRow = $.querySelectorAll(".product-row");

const pageLoader = $.querySelector(".main-preloader");
function dismissNotice() {
  let signUpNoticeHeight = signUpNotice.clientHeight;
  signUpNotice.style.marginTop = "-" + signUpNoticeHeight + "px";
}

const toggleMenu = () => mobileMenu.classList.toggle("mobile-menu-active");
const prRowController = (item) => {
  let rowController = item.previousElementSibling;
  let itemCounts = item.childElementCount;
  if (itemCounts <= 4) {
    rowController.classList.add("d-lg-none");
  }
};

function pageLoaded() {
  setTimeout(() => {
    pageLoader.classList.add("preloader-hide");
    setTimeout(() => pageLoader.classList.add("d-none"), 500);
  }, 1000);
}

window.onload = pageLoaded;

signUpNoticeDismissButton.addEventListener("click", dismissNotice);
openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);
if (productRow.length) {
  productRow.forEach((item) => prRowController(item));
}
