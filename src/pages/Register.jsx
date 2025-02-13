import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import InputField from "../components/InputField";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import AxiosToast from "../utils/AxiosToast";
import Axios from "../utils/Axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const validateData = Object.values(data).every((el) => el);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password doesn't match");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });
      console.log("response", response);
      if (response.data.success) {
        AxiosToast(response, "success");
        navigate("/login");
      }
    } catch (error) {
      AxiosToast(error);
    }
  };
  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-5 shadow-lg">
        <p className="flex items-center justify-center text-xl font-semibold text-gray-600">
          Welcome to Binkeyit 😀
        </p>
        <form action="" className="grid gap-3 mt-6 " onSubmit={handleSubmit}>
          <InputField
            label={"Name :"}
            type="text"
            name="name"
            placeholder="Enter your name"
            value={data.name}
            onChange={handleChange}
          />
          <InputField
            label={"Email :"}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleChange}
          />
          <InputField
            label={"Password :"}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={data.password}
            onChange={handleChange}
            isPasswordField={true}
            showIcon={showPassword}
            onClickIcon={() => setShowPassword((prev) => !prev)}
            icon={{ show: <FaRegEye />, hide: <FaRegEyeSlash /> }}
          />
          <InputField
            label={"Confirm Password :"}
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={data.confirmPassword}
            onChange={handleChange}
            isPasswordField={true}
            showIcon={showConfirmPassword}
            onClickIcon={() => setShowConfirmPassword((prev) => !prev)}
            icon={{ show: <FaRegEye />, hide: <FaRegEyeSlash /> }}
          />
          <button
            className={`${
              validateData ? "bg-green-800" : "bg-gray-500"
            } text-white font-semibold rounded py-2 my-3 tracking-wider`}
            disabled={!validateData}
            type="submit"
          >
            Register
          </button>
        </form>
        <p>
          Already have an account?
          <Link to="/login" className="font-semibold text-orange-500">
            {" Login"}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
