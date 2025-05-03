import React from "react";

const SubHeading = ({ subtitle }) => {   // Destructure the prop directly
  return (
    <div>
      <p className="text-gray-500 mt-2 mb-9">{subtitle}</p>
    </div>
  );
};

export default SubHeading;