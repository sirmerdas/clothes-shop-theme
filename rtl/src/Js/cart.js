const deletePrButton = $.querySelectorAll(".del-btn");

const deleteProduct = (event) => {
  let currentItem =
    event.currentTarget.parentElement.parentElement.parentElement.parentElement
      .parentElement;
  currentItem.style.animation = "deleteCartAnimation 1.5s ease 1";
  setTimeout(() => {
    currentItem.classList.add("d-none");
  }, 1400);
};

deletePrButton.forEach((item) => {
  item.addEventListener("click", deleteProduct);
});
