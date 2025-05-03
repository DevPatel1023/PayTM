// components/Heading.jsx
import React from "react";

const Heading = ({ title,style }) => {
  return (
    <h1 className={style}>{title}</h1>
  );
};

export default Heading;