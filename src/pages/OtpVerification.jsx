import React, { useRef } from "react";
import { useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToast from "../utils/AxiosToast";
import Axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";
const OtpVerification = ({ email, setFormNumber }) => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const validateData = data.every((el) => el);
  const handleChange = (e, index) => {
    const newData = [...data];
    const value = e.target.value;
    newData[index] = value;
    setData(newData);

    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const otp = data.join("");
      const response = await Axios({
        ...SummaryApi.verifyOTP,
        data: { email, otp },
      });
      console.log("response", response);
      if (response.data.error) {
        AxiosToast(response, "successError");
      } else {
        AxiosToast(response, "success");
        setFormNumber(2);
      }
    } catch (error) {
      AxiosToast(error);
    }
  };
  return (
    <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
      <div className="grid gap-1">
        <label htmlFor={"otp"}>Enter Your OTP:</label>
        <div className=" flex items-center gap-2">
          {data.map((element, index) => (
            <input
              key={"otp" + index}
              type="text"
              name="otp"
              maxLength="1"
              value={element}
              ref={(el) => (inputRef.current[index] = el)}
              onChange={(e) => {
                handleChange(e, index);
              }}
              className="bg-blue-50 p-2 text-center border rounded outline-none focus:border-primary-200"
              style={{ width: "50px" }}
            />
          ))}
        </div>
      </div>
      <button
        className={`${
          validateData ? "bg-green-800" : "bg-gray-500"
        } text-white font-semibold rounded  py-2 my-3 tracking-wider`}
        disabled={!validateData}
        type="submit"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default OtpVerification;
