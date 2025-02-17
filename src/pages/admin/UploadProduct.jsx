import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { MdCategory, MdCloudUpload, MdDelete } from "react-icons/md";
import InputField from "../../components/InputField";
import uploadImage from "../../utils/uploadImage";
import Loading from "../../components/Loading";
import ViewImage from "../../components/ViewImage";
import { selectCategories } from "../../store/categorySlice";
import { IoClose } from "react-icons/io5";
const UploadProduct = () => {
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImageUrl, setViewImageUrl] = useState(null);
  const allCategory = selectCategories();
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: [],
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
    publish: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preval) => {
      return { ...preval, [name]: value };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    try {
      setImageLoading(true);
      const response = await uploadImage(file);
      const imageUrl = response.data.data.url;
      setData((prev) => {
        return {
          ...prev,
          image: [...prev.image, imageUrl],
        };
      });
    } catch (err) {
      console.log(err);
    } finally {
      setImageLoading(false);
    }
  };
  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        image: data.image,
      };
    });
  };

  const handleCategorySelection = (e) => {
    const value = e.target.value;
    const category = allCategory.find((category) => category._id === value);
    if (data.category.find((c) => c._id === category._id)) return;
    setData((preval) => {
      return { ...preval, category: [...preval.category, category] };
    });
  };

  const removeCategory = (category) => {
    setData((preval) => {
      const updatedCategories = preval.category.filter(
        (c) => c._id !== category._id
      );
      return {
        ...preval,
        category: updatedCategories,
      };
    });
  };
  return (
    <section>
      <PageHeader heading="Upload Product" />

      <div className="grid p-3">
        <form className="grid gap-2">
          <InputField
            label={"Product Name"}
            name={"name"}
            type={"text"}
            placeholder={"Enter product name"}
            value={data.name}
            onChange={handleChange}
            required={true}
          />
          <InputField
            label={"Description"}
            type={"textarea"}
            name={"description"}
            placeholder={"Enter product description"}
            value={data.description}
            onChange={handleChange}
            required={true}
          />
          <div>
            <p>Image</p>
            <label className="bg-blue-50 p-2 border-2 border-dashed rounded h-24 flex flex-col justify-center items-center cursor-pointer">
              {imageLoading && (
                <div className="flex flex-row items-center">
                  <Loading />
                  <p className="font-semibold">Uploading...</p>
                </div>
              )}
              {!imageLoading && (
                <>
                  <MdCloudUpload size={30} />
                  <p className="font-semibold">Upload Image</p>
                </>
              )}

              <input
                id="productImage"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
            </label>
            <div className="flex flex-wrap item-center gap-2 mt-4">
              {data.image.map((img, index) => {
                return (
                  <div className="h-20 w-20 bg-blue-50 justify-center items-center flex border relative group">
                    <img
                      key={index}
                      src={img}
                      className="h-20 object-scale-down cursor-pointer"
                      alt=""
                      onClick={() => setViewImageUrl(img)}
                    />
                    <div
                      onClick={() => handleDeleteImage(index)}
                      className="absolute bottom-0 right-0 p-1 hover:bg-red-500 cursor-pointer text-white rounded-md hidden group-hover:block"
                    >
                      <MdDelete size={20} />
                    </div>
                  </div>
                );
              })}
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
        </form>
      </div>
      {viewImageUrl && (
        <ViewImage url={viewImageUrl} close={() => setViewImageUrl(null)} />
      )}
    </section>
  );
};

export default UploadProduct;
