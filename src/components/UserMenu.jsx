import React from "react";
import { selectUser, logout } from "../store/userSlice";
import Divider from "./Divider";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToast from "../utils/AxiosToast";
import { HiOutlineExternalLink } from "react-icons/hi";
import UserMenuLink from "./UserMenuLink";
import isAdmin from "../utils/isAdmin";

const UserMenu = () => {
  const user = selectUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({ ...SummaryApi.logout });
      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        AxiosToast(response, "success");
        navigate("/");
      }
    } catch (error) {
      AxiosToast(error);
    }
  };
  return (
    <div>
      <div className="font-semibold ">My Account</div>
      <div className="text-sm flex gap-2 items-center ">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}
          <span className="text-medium text-red-600">{isAdmin(user.role) ? " (Admin)" : ""}</span>
        </span>
        <Link to={"/dashboard/profile"} className="hover:text-primary-200">
          <HiOutlineExternalLink size={16} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-2 px-2">
        {/* Admin user link */}
        {isAdmin(user.role) && (
          <>
            <UserMenuLink path={"/category"} name={"Category"} />
            <UserMenuLink path={"/sub-category"} name={"Sub-Category"} />
            <UserMenuLink path={"/products"} name={"Products"} />
            <UserMenuLink path={"/upload-product"} name={"Upload Product"} />
          </>
        )}

        {/* User user link */}
        <UserMenuLink path={"/my-orders"} name={"My Orders"} />
        <UserMenuLink path={"/address"} name={"Save Address"} />
        <UserMenuLink onClick={handleLogout} name={"Logout"} />
      </div>
    </div>
  );
};
export default UserMenu;
