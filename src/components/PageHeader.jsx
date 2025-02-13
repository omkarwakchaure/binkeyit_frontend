import React from "react";

const PageHeader = ({ heading, children }) => {
  return (
    <div className="p-2 bg-white shadow-md flex justify-between items-center">
      <span className="font-semibold">{heading}</span>
      {children}
    </div>
  );
};

export default PageHeader;
