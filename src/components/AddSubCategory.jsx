import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import InputField from "./InputField";
import uploadImage from "../utils/uploadImage";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToast from "../utils/AxiosToast";
import { selectCategories } from "../store/categorySlice";

const AddSubCategory = ({ close, fetchData, categoryId }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
    categoryId: categoryId,
    category: [],
  });

  const [loading, setLoading] = useState(false);
  const allCategory = selectCategories();

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
        ...SummaryApi.SUB_CATEGORY.ADD,
        data: data,
      });
      if (response.data.success) {
        AxiosToast(response, "success");
        close();
        // fetchData();
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

  const handleCategorySelection = (e) => {
    const value = e.target.value;
    const selectedCategory = allCategory.find(
      (category) => category._id === value
    );
    if (
      data.category.find((category) => {
        return category._id === selectedCategory._id;
      })
    ) {
      return;
    }

    setData((preval) => {
      return {
        ...preval,
        category: [...preval.category, selectedCategory],
      };
    });
  };

  const removeCategory = (category) => {
    setData((preval) => {
      return {
        ...preval,
        category: preval.category.filter((c) => c._id !== category._id),
      };
    });
  };
  return (
    <section
      className={`fixed top-0 left-0 right-0 bottom-0 p-4 flex items-center justify-center ${
        !categoryId ? "bg-neutral-800 bg-opacity-50" : ""
      }`}
    >
      <div className="max-w-xl w-full rounded bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Add Sub-Category</h1>
          <button onClick={close} className="w-fit ml-auto block">
            <IoClose size={25} />
          </button>
        </div>
        <form action="" className="grid gap-4 my-3" onSubmit={handleSubmit}>
          <InputField
            label="Name"
            name={"name"}
            type="text"
            placeholder="Enter sub-category name"
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

          <div className="grid gap-1">
            <label>Select Category</label>
            <div className="border focus-within:border-primary-200 rounded">
              <select
                className="w-full p-2 bg-transparent outline-none"
                onChange={handleCategorySelection}
              >
                <option value={""} disabled>
                  Select Category
                </option>
                {allCategory.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap">
                {data.category.map((category) => {
                  return (
                    <div
                      key={category._id}
                      className="flex items-center gap-2 border-b m-2 shadow-md bg-white"
                    >
                      <div className="flex items-center gap-2 p-1">
                        <p>{category.name}</p>
                      </div>
                      <IoClose
                        size={20}
                        onClick={() => removeCategory(category)}
                        className="cursor-pointer"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={` ${
              data.name && data.image && data.category[0]
                ? "bg-primary-200 shadow-lg hover:bg-primary-100 cursor-pointer"
                : "bg-gray-300"
            }px-2 py-2 font-semibold rounded`}
          >
            {loading ? "Adding Sub-Category..." : "Add Sub-Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddSubCategory;
