import React from "react";
import Image from "./Image";

function PlaceImg({ photos, index = 0, className = null }) {
  console.log(photos);
  if (!className) {
    className = "object-cover rounded-2xl";
  }
  return <Image className={className} src={photos} alt="" />;
}

export default PlaceImg;
