import React from "react";
import { IoClose } from "react-icons/io5";
import InputField from "./InputField";

const AddField = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-40 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md max-h-[80vh] p-4 bg-white rounded-md shadow-xl">
        <div className="mb-4">
          <div className="float-right cursor-pointer ">
            <IoClose size={28} onClick={close} />
          </div>
          <div>
            <h1 className="font-semibold">Add Field</h1>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <InputField
            placeholder={"Enter Field Name"}
            value={value}
            onChange={onChange}
          />
          <div className="flex justify-center mt-2">
            <button
              disabled={!value}
              onClick={submit}
              type="submit"
              className={
                " w-32 bg-primary-200 shadow-lg hover:bg-primary-100 cursor-pointer py-2 font-semibold rounded"
              }
            >
              Add Field
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddField;
