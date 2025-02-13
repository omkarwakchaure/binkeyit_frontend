import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { selectUser } from "../store/userSlice";
import AvatarEdit from "./AvatarEdit";
import { useEffect } from "react";
import InputField from "../components/InputField";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToast from "../utils/AxiosToast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
const Profile = () => {
  const user = selectUser();
  const [openAvatarEdit, setOpenAvatarEdit] = useState(false);
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    setData({
      name: user.name,
      email: user.email,
      mobile: user.mobile || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmit(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: data,
      });
      if (response.data.success) {
        dispatch(setUserDetails(data));
        AxiosToast(response, "success");
      }
    } catch (error) {
      AxiosToast(error, "error");
    } finally {
      setSubmit(false);
    }
  };
  return (
    <div className="w-full grid grid-cols-2 justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <div className="w-32 h-32 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avatar ? (
            <img alt={user.name} src={user.avatar} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={60} />
          )}
        </div>
        <button
          onClick={() => setOpenAvatarEdit(true)}
          className=" px-3 py-1 text-sm min-w-20 border border-primary-100 hover:border-primary-200  hover:bg-primary-200 hover:text-white rounded-full mt-3"
        >
          Edit
        </button>
        {openAvatarEdit && (
          <AvatarEdit close={() => setOpenAvatarEdit(false)} />
        )}
      </div>
      <form className="grid gap-4 w-[500px]" onSubmit={handleSubmit}>
        <InputField
          label={"Name :"}
          type="text"
          name="name"
          placeholder="Enter your Name"
          value={data.name}
          onChange={handleChange}
          required={true}
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
          label={"Mobile:"}
          type="text"
          name="mobile"
          placeholder="Enter your Mobile Number"
          value={data.mobile}
          onChange={handleChange}
        />
        <button
          className="px-3 py-1 text-sm  min-w-20 border border-primary-100 hover:border-primary-200  hover:bg-primary-200 hover:text-white rounded-full"
          type="submit"
        >
          {!submit ? "Submit" : "Submitting"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
