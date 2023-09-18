const filterSwitcher = $.querySelectorAll(".filter-control");
const filterMenuToggler = $.querySelectorAll(".toggle-filter-menu");
const filterMenu = $.querySelector(".filter-menu-container");
const closeFilterMenuBtn = $.querySelectorAll(".close-filter-mnu");
const fadeBody = $.querySelector(".shop-bg-filter");
const slider = $.getElementById("slider");
const allProducts = $.querySelectorAll("div[data-item-type='price']");
const noPrError = $.getElementById("noPr");

const toggleFilterMenu = (event) => {
  let { target } = event;
  let filterItem = target.dataset.filterItem;
  let filterMenu = $.querySelector(`.${filterItem}`);
  filterMenu.children[1].classList.toggle("filter-active");
};

const filterProducts = () => {
  noPrError.classList.add("d-none");
  allProducts.forEach((item) => {
    item.parentElement.parentElement.parentElement.parentElement.parentElement.classList.remove(
      "d-none"
    );
  });
  let priceRange = slider.noUiSlider.get();
  let startRange = Number(priceRange[0]);
  let endRange = Number(priceRange[1]);
  let prs = [];
  allProducts.forEach((item) => {
    let prices = Number(item.innerText.replace("$", ""));

    if (prices >= startRange && prices <= endRange) {
      return true;
    } else {
      prs.push(
        item.parentElement.parentElement.parentElement.parentElement
          .parentElement
      );
    }
  });

  if (prs.length == allProducts.length) {
    noPrError.classList.remove("d-none");
  }
  prs.forEach((item) => {
    item.classList.add("d-none");
  });

  prs = [];
};

const toggleFilterMenuMobile = (event) => {
  event.stopPropagation();
  fadeBody.classList.toggle("shop-filter-active");
  filterMenu.classList.toggle("filter-menu-container-active");
};

filterMenuToggler.forEach((item) =>
  item.addEventListener("click", toggleFilterMenuMobile, { capture: true })
);
closeFilterMenuBtn.forEach((item) =>
  item.addEventListener("click", toggleFilterMenuMobile, { capture: true })
);

filterSwitcher.forEach((item) =>
  item.addEventListener("click", toggleFilterMenu)
);

noUiSlider.create(slider, {
  start: [100, 500],
  connect: true,
  tooltips: [
    wNumb({ decimals: 2, thousand: ",", prefix: "$" }),
    wNumb({ decimals: 2, thousand: ",", prefix: "$" }),
  ],

  step: 10,
  margin: 100,
  range: {
    min: [100],
    max: [500],
  },
});

slider.noUiSlider.on("change", filterProducts);
