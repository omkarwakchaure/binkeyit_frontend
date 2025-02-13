import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { selectUser } from "../store/userSlice";
import Axios from "../utils/Axios";
import AxiosToast from "../utils/AxiosToast";
import SummaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import { updateAvatar } from "../store/userSlice";
const AvatarEdit = ({ close }) => {
  const user = selectUser();
  const [upload, setUpload] = useState(false);

  const dispatch = useDispatch();
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setUpload(true);
      const response = await Axios({
        ...SummaryApi.uploadProfile,
        data: formData,
      });
      dispatch(updateAvatar(response.data.data.avatar));
      console.log(response);
      if (response.data.success) {
        AxiosToast(response, "success");
        setUpload(false);
        close();
      }
    } catch (error) {
      AxiosToast(error);
    }
  };
  return (
    <section
      className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900
     bg-opacity-60 p-4 flex items-center justify-center "
    >
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center gap-4">
        <div className="w-32 h-32  flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avatar ? (
            <img alt={user.name} src={user.avatar} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={60} />
          )}
        </div>
        <form onSubmit={handleUpload}>
          <label>
            <div className="border border-primary-200 hover:bg-primary-200 hover:text-white px-4 py-1 rounded text-sm my-3">
              {upload ? "Uploading..." : "Upload Profile"}
            </div>
            <input
              onChange={handleUpload}
              type="file"
              id="uploadProfile"
              className="hidden"
            />
          </label>
        </form>
      </div>
    </section>
  );
};

export default AvatarEdit;
