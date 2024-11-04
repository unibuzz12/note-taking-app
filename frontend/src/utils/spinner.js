import React from "react";

const Spinner = ({ size = "h-12 w-12", color = "border-blue-500" }) => {
  return (
    <div
      className={`${size} border-t-4 border-b-4 border-transparent rounded-full animate-spin ${color}`}
    ></div>
  );
};

export default Spinner;
