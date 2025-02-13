import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import SummaryApi from "../common/SummaryApi";
import AxiosToast from "../utils/AxiosToast";
import Axios from "../utils/Axios";
const SetupNewPassword = ({ email }) => {
  const [data, setData] = useState({
    newPassword: "",
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

    console.log(data.newPassword);
    console.log(data.confirmPassword);

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: { email, ...data },
      });

      console.log("response", response);
      if (response.data.error) {
        AxiosToast(response, "successError");
      } else {
        AxiosToast(response, "success");
        navigate("/login");
      }
    } catch (error) {
      AxiosToast(error);
    }
  };
  return (
    <form action="" className="grid gap-3 mt-6 " onSubmit={handleSubmit}>
      <InputField
        label={"New Password :"}
        type="password"
        name="newPassword"
        placeholder="Enter your Password"
        value={data.newPassword}
        onChange={handleChange}
        isPasswordField={true}
        showIcon={showPassword}
        onClickIcon={() => setShowPassword((prev) => !prev)}
      />
      <InputField
        label={"Confirm Password :"}
        type="password"
        name="confirmPassword"
        placeholder="Confirm your Password"
        value={data.confirmPassword}
        onChange={handleChange}
        isPasswordField={true}
        showIcon={showConfirmPassword}
        onClickIcon={() => setShowConfirmPassword((prev) => !prev)}
      />
      <button
        className={`${
          validateData ? "bg-green-800" : "bg-gray-500"
        } text-white font-semibold rounded py-2 my-3 tracking-wider`}
        disabled={!validateData}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default SetupNewPassword;
