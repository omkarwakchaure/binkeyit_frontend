import React from "react";
import { useState } from "react";
import InputField from "../components/InputField";
import SummaryApi from "../common/SummaryApi";
import AxiosToast from "../utils/AxiosToast";
import Axios from "../utils/Axios";
import { Link } from "react-router-dom";
import OtpVerification from "./OtpVerification";
import SetupNewPassword from "./SetupNewPassword";
const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const validateData = Object.values(data).every((el) => el);

  const [formNumber, setFormNumber] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgotPassword,
        data: data,
      });
      console.log("response", response);
      if (response.data.error) {
        AxiosToast(response, "successError");
      } else {
        AxiosToast(response, "success");
        setFormNumber(1);
      }
    } catch (error) {
      AxiosToast(error);
    }
  };
  return (
    <section className=" w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-5 shadow-lg">
        <p className="flex items-center justify-center text-xl font-semibold text-gray-600">
          Forgot Password
        </p>
        {formNumber === 0 && (
          <form action="" className="grid gap-3 mt-6 " onSubmit={handleSubmit}>
            <InputField
              label={"Email :"}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
            />
            <button
              className={`${
                validateData ? "bg-green-800" : "bg-gray-500"
              } text-white font-semibold rounded py-2 my-3 tracking-wider`}
              disabled={!validateData}
              type="submit"
            >
              Get OTP
            </button>
          </form>
        )}
        {formNumber === 1 && (
          <OtpVerification email={data.email} setFormNumber={setFormNumber} />
        )}

        {formNumber === 2 && <SetupNewPassword email={data.email} />}

        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-orange-400">
            {" Login"}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
