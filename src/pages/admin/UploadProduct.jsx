import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import { MdCategory } from "react-icons/md";
import InputField from "../../components/InputField";

const UploadProduct = () => {
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
        </form>
      </div>
    </section>
  );
};

export default UploadProduct;
