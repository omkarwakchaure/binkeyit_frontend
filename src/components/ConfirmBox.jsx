import React from "react";
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ close, confirm}) => {
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-50 p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-4 rounded">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold">Delete Confirmation</h1>
          <button onClick={close} className="w-fit ml-auto block">
            <IoClose size={25} />
          </button>
        </div>
        <p className="my-4">Are you sure you want to delete?</p>
        <div className="flex gap-3 justify-end mt-4 ">
          <button
            onClick={close}
            className="px-3 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-4 py-1 border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmBox;
