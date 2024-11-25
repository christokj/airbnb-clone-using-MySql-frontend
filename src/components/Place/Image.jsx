import React from "react";

function Image({ src, ...rest }) {
  return <img {...rest} src={src} alt={""} />;
}

export default Image;
