import React from "react";
import { IoClose } from "react-icons/io5";
 
const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-40 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md max-h-[80vh] p-4 bg-white rounded-md shadow-xl">
        <div className="float-right cursor-pointer ">
          <IoClose size={30} onClick={close} />
        </div>
        <img src={url} alt="" className="w-full object-scale-down" />
      </div>
    </div>
  );
};
 
export default ViewImage;