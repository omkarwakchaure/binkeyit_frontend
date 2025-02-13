import React from "react";
import noDataImg from "../assets/nothing here yet.webp";
const NoData = () => {
  return (
    <div className="flex flex-col items-center p-4 justify-center gap-2">
      <img src={noDataImg} alt="no-data Img" className="w-36" />
      <p className="text-neutral-500">No data found</p>
    </div>
  );
};

export default NoData;
