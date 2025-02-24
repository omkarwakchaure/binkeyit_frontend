import React from "react";
import { IoClose } from "react-icons/io5";

const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-40 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md max-h-[80vh] p-4 bg-white rounded-md shadow-xl flex flex-col items-center">
        <div className="w-full flex justify-end">
          <IoClose size={30} onClick={close} className="cursor-pointer" />
        </div>
        <div className="w-full flex justify-center items-center">
          <img
            src={url}
            alt=""
            className="max-w-full max-h-[60vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
