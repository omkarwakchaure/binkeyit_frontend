import React from "react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import InputField from "../components/InputField";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import AxiosToast from "../utils/AxiosToast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import Axios from "../utils/Axios";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const validateData = Object.values(data).every((el) => el);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });
      console.log("response", response);

      if (response.data.error) {
        AxiosToast(response, "successError");
      } else {
        AxiosToast(response, "success");
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data.user));
        navigate("/");
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
          <Link
            to="/forgot-password"
            className="block ml-auto text-gray-700 hover:text-orange-400"
          >
            Forgot Password?
          </Link>
          <button
            className={`${
              validateData ? "bg-green-800" : "bg-gray-500"
            } text-white font-semibold rounded py-2 my-3 tracking-wider`}
            disabled={!validateData}
            type="submit"
          >
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-orange-400">
            {" Register"}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
