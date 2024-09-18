import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { heroImages } from "../constants.js";

const HeroCarousel = () => {
  return (
    <div>
      {" "}
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <img src={image.imgUrl} alt={image.alt} />
        ))}
      </Carousel>
    </div>
  );
};
export default HeroCarousel;
