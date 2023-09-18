const slider = (elemId, width) => {
  const sliderDiv = elemId;
  let startingPoint = 0;
  const moveSlider = (event) => {
    if (event.offsetX - startingPoint > 0) {
      sliderDiv.scrollBy({ left: -width.clientWidth, behavior: "smooth" });
    } else {
      sliderDiv.scrollBy({ left: width.clientWidth, behavior: "smooth" });
    }
  };
  const activeSlider = (event) => {
    sliderDiv.addEventListener("pointermove", moveSlider);
    startingPoint = event.offsetX;
  };
  const deActiveSlider = () => {
    startingPoint = 0;
    sliderDiv.removeEventListener("pointermove", moveSlider);
  };
  sliderDiv.addEventListener("pointerdown", activeSlider);
  sliderDiv.addEventListener("pointerup", deActiveSlider);
  sliderDiv.addEventListener("pointerleave", deActiveSlider);
  sliderDiv.addEventListener(
    "pointerenter",
    () => (sliderDiv.style.cursor = "grabbing")
  );
};

export { slider };
