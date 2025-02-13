import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import InputField from "./InputField";
import uploadImage from "../utils/uploadImage";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToast from "../utils/AxiosToast";
import AddSubCategory from "./AddSubCategory";
import { useDispatch } from "react-redux";
import { updateCategory } from "../store/categorySlice";

const EditCategory = ({ close, fetchData, categoryData }) => {
  const [data, setData] = useState({
    name: categoryData.name,
    image: categoryData.image,
  });

  const [loading, setLoading] = useState(false);
  const [showAddSubCategory, setShowAddSubCategory] = useState(false);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: {
          categoryId: categoryData._id,
          ...data,
        },
      });
      if (response.data.success) {
        AxiosToast(response, "success");
        close();
        dispatch(updateCategory(response.data.data));
      }
    } catch (e) {
      AxiosToast(e, "error");
    } finally {
      setLoading(false);
    }
  };

  const getName = () => {
    return data.name.trim();
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    try {
      const response = await uploadImage(file);

      setData((prev) => {
        return { ...prev, image: response.data.data.url };
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 bg-opacity-50 p-4 flex items-center justify-center">
      <div className="max-w-xl w-full rounded bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Edit Category</h1>
          <button onClick={close} className="w-fit ml-auto block">
            <IoClose size={25} />
          </button>
        </div>
        <form action="" className="grid gap-4 my-3" onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name={"name"}
            type="text"
            placeholder="Enter category name"
            value={data.name}
            onChange={onChange}
          />
          <div className="grid gap-2">
            <p>Image</p>
            <div className="flex gap-2 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    src={data.image}
                    alt="category"
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadImage">
                <div
                  className={`${
                    !getName()
                      ? "bg-gray-300 cursor-not-allowed"
                      : "border border-primary-200 hover:bg-primary-200 shadow-lg cursor-pointer"
                  } px-4 py-2 rounded`}
                >
                  Upload Image
                </div>
                <input
                  disabled={!getName()}
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </label>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <button
              type="submit"
              className={` ${
                data.name && data.image
                  ? "bg-primary-200 shadow-lg hover:bg-primary-100 cursor-pointer"
                  : "bg-gray-300"
              }px-2 py-2 font-semibold rounded w-[45%]`}
            >
              {loading ? "Saving Category..." : "Save Category"}
            </button>

            <button
              type="button"
              onClick={() => setShowAddSubCategory(true)}
              className={` ${
                data.name && data.image
                  ? "bg-primary-200 shadow-lg hover:bg-primary-100 cursor-pointer"
                  : "bg-gray-300"
              }px-2 py-2 font-semibold rounded w-[45%]`}
            >
              Add Sub-Category
            </button>
          </div>
        </form>
      </div>
      {showAddSubCategory && (
        <AddSubCategory
          close={() => setShowAddSubCategory(false)}
          fetchData={fetchData}
        />
      )}
    </section>
  );
};

export default EditCategory;
