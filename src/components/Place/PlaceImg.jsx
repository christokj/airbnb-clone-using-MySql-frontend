import React, { useEffect } from "react";
import Image from "./Image";

function PlaceImg({ photos, index = 0, className = null }) {
  if (!photos) {
    return "";
  }
  if (!className) {
    className = "object-cover rounded-2xl";
  }
 
    if (index === 1 && photos) {
      let images =
           typeof photos === "string"
             ? JSON.parse(photos)
             : photos;
             return <Image className={className} src={images[0]} alt="" />;
   } else {
 
     return <Image className={className} src={photos} alt="" />;
   }

  

}

export default PlaceImg;
